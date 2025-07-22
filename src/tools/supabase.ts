import { createClient } from '@supabase/supabase-js';
import { Tool } from '../utils/types.js';

// Initialize Supabase client
const getSupabaseClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables must be set');
  }
  
  return createClient(url, key);
};

export const supabaseTools: Tool[] = [
  {
    name: 'supabase_read_table',
    description: 'Read data from a Supabase table (read-only)',
    inputSchema: {
      type: 'object',
      properties: {
        tableName: {
          type: 'string',
          description: 'Name of the table to read from',
        },
        select: {
          type: 'string',
          description: 'Columns to select (comma-separated, defaults to all)',
        },
        filter: {
          type: 'object',
          description: 'Filter conditions as key-value pairs',
          additionalProperties: true,
        },
        limit: {
          type: 'number',
          description: 'Maximum number of rows to return',
          minimum: 1,
          maximum: 1000,
        },
        offset: {
          type: 'number',
          description: 'Number of rows to skip',
          minimum: 0,
        },
        orderBy: {
          type: 'string',
          description: 'Column to order by',
        },
        ascending: {
          type: 'boolean',
          description: 'Sort in ascending order (default: true)',
        },
      },
      required: ['tableName'],
    },
    handler: async (args) => {
      const { tableName, select, filter, limit = 100, offset = 0, orderBy, ascending = true } = args;
      const supabase = getSupabaseClient();

      try {
        let query = supabase.from(tableName).select(select || '*');

        // Apply filters
        if (filter) {
          Object.entries(filter).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              // Handle advanced filters like { gt: 5, lt: 10 }
              Object.entries(value).forEach(([operator, operand]) => {
                query = (query as any)[operator](key, operand);
              });
            } else {
              // Simple equality filter
              query = query.eq(key, value);
            }
          });
        }

        // Apply ordering
        if (orderBy) {
          query = query.order(orderBy, { ascending });
        }

        // Apply pagination
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) {
          throw error;
        }

        return {
          success: true,
          data,
          count: data?.length || 0,
          totalCount: count,
        };
      } catch (error) {
        throw new Error(`Failed to read from Supabase: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'supabase_execute_query',
    description: 'Execute a custom Supabase query using the JavaScript client syntax',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'PostgREST query string (e.g., "users?select=*&age=gte.18")',
        },
      },
      required: ['query'],
    },
    handler: async (args) => {
      const { query } = args;
      const supabase = getSupabaseClient();

      try {
        // Parse the query string to extract table and parameters
        const [tablePart, ...queryParts] = query.split('?');
        const queryString = queryParts.join('?');
        const params = new URLSearchParams(queryString);

        let supabaseQuery = supabase.from(tablePart);
        let selectQuery: any = null;

        // Handle select
        const selectParam = params.get('select');
        if (selectParam) {
          selectQuery = supabaseQuery.select(selectParam);
        } else {
          selectQuery = supabaseQuery.select('*');
        }

        // Handle filters
        params.forEach((value, key) => {
          if (key !== 'select' && key !== 'order' && key !== 'limit' && key !== 'offset') {
            // Parse filter operators (e.g., age=gte.18)
            const match = value.match(/^(eq|neq|gt|gte|lt|lte|like|ilike|in|is)\.(.*)/);
            if (match) {
              const [, operator, operand] = match;
              selectQuery = (selectQuery as any)[operator](key, operand);
            } else {
              selectQuery = selectQuery.eq(key, value);
            }
          }
        });

        // Handle ordering
        const orderParam = params.get('order');
        if (orderParam) {
          const [column, direction] = orderParam.split('.');
          selectQuery = selectQuery.order(column, { ascending: direction !== 'desc' });
        }

        // Handle limit and offset
        const limit = params.get('limit');
        const offset = params.get('offset');
        if (limit || offset) {
          const startIndex = parseInt(offset || '0');
          const endIndex = startIndex + parseInt(limit || '100') - 1;
          selectQuery = selectQuery.range(startIndex, endIndex);
        }

        const { data, error } = await selectQuery;

        if (error) {
          throw error;
        }

        return {
          success: true,
          data,
          count: data?.length || 0,
        };
      } catch (error) {
        throw new Error(`Failed to execute Supabase query: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'supabase_list_tables',
    description: 'List all tables in the Supabase database',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    handler: async () => {
      const supabase = getSupabaseClient();

      try {
        // Query the information schema to get table names
        const { data, error } = await supabase
          .from('information_schema.tables')
          .select('table_name, table_type')
          .eq('table_schema', 'public')
          .order('table_name');

        if (error) {
          // Fallback: try a different approach
          // Note: This requires appropriate permissions
          throw new Error('Unable to list tables. Ensure the Supabase role has appropriate permissions.');
        }

        return {
          success: true,
          tables: data?.map(table => ({
            name: table.table_name,
            type: table.table_type,
          })) || [],
        };
      } catch (error) {
        throw new Error(`Failed to list Supabase tables: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'supabase_get_table_schema',
    description: 'Get the schema/structure of a Supabase table',
    inputSchema: {
      type: 'object',
      properties: {
        tableName: {
          type: 'string',
          description: 'Name of the table to inspect',
        },
      },
      required: ['tableName'],
    },
    handler: async (args) => {
      const { tableName } = args;
      const supabase = getSupabaseClient();

      try {
        // Query the information schema to get column information
        const { data, error } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable, column_default')
          .eq('table_schema', 'public')
          .eq('table_name', tableName)
          .order('ordinal_position');

        if (error) {
          throw error;
        }

        return {
          success: true,
          tableName,
          columns: data?.map(col => ({
            name: col.column_name,
            type: col.data_type,
            nullable: col.is_nullable === 'YES',
            default: col.column_default,
          })) || [],
        };
      } catch (error) {
        throw new Error(`Failed to get table schema: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
]; 