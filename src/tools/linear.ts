import { LinearClient } from '@linear/sdk';
import { Tool, LinearTicketSchema } from '../utils/types.js';
import { z } from 'zod';

// Initialize Linear client
const getLinearClient = () => {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    throw new Error('LINEAR_API_KEY environment variable is not set');
  }
  return new LinearClient({ apiKey });
};

export const linearTools: Tool[] = [
  {
    name: 'linear_create_ticket',
    description: 'Create a new ticket/issue in Linear',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the ticket',
        },
        description: {
          type: 'string',
          description: 'Description of the ticket (supports Markdown)',
        },
        teamId: {
          type: 'string',
          description: 'ID of the team to create the ticket in',
        },
        priority: {
          type: 'number',
          description: 'Priority level (0-4, where 0 is no priority)',
          minimum: 0,
          maximum: 4,
        },
        labels: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of label names to apply',
        },
        assigneeId: {
          type: 'string',
          description: 'ID of the user to assign the ticket to',
        },
      },
      required: ['title'],
    },
    handler: async (args) => {
      const input = LinearTicketSchema.parse(args);
      const linear = getLinearClient();

      try {
        // If no teamId provided, get the first team
        let teamId = input.teamId;
        if (!teamId) {
          const teams = await linear.teams();
          if (teams.nodes.length === 0) {
            throw new Error('No teams found in Linear workspace');
          }
          teamId = teams.nodes[0].id;
        }

        // Create the issue
        const issuePayload = await linear.createIssue({
          title: input.title,
          description: input.description,
          teamId,
          priority: input.priority,
          assigneeId: input.assigneeId,
        });

        const issue = await issuePayload.issue;
        if (!issue) {
          throw new Error('Failed to create issue');
        }

        // Add labels if provided
        if (input.labels && input.labels.length > 0) {
          const allLabels = await linear.issueLabels();
          const labelIds = allLabels.nodes
            .filter(label => input.labels?.includes(label.name))
            .map(label => label.id);

          if (labelIds.length > 0) {
            await issue.update({ labelIds });
          }
        }

        return {
          success: true,
          ticketId: issue.identifier,
          url: issue.url,
          title: issue.title,
          team: (await issue.team)?.name,
        };
      } catch (error) {
        throw new Error(`Failed to create Linear ticket: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'linear_read_tickets',
    description: 'Read/search tickets from Linear',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query to filter tickets',
        },
        teamId: {
          type: 'string',
          description: 'Filter by team ID',
        },
        assigneeId: {
          type: 'string',
          description: 'Filter by assignee ID',
        },
        state: {
          type: 'string',
          description: 'Filter by state (e.g., "todo", "in_progress", "done")',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of tickets to return',
          minimum: 1,
          maximum: 100,
        },
      },
    },
    handler: async (args) => {
      const { query, teamId, assigneeId, state, limit = 10 } = args;
      const linear = getLinearClient();

      try {
        // Build filter
        const filter: any = {};
        if (teamId) filter.team = { id: { eq: teamId } };
        if (assigneeId) filter.assignee = { id: { eq: assigneeId } };
        if (state) filter.state = { name: { eq: state } };
        
        // Search with query if provided
        const issues = query
          ? await linear.issueSearch(query, { filter, first: limit })
          : await linear.issues({ filter, first: limit });

        const tickets = await Promise.all(
          issues.nodes.map(async (issue) => ({
            id: issue.id,
            identifier: issue.identifier,
            title: issue.title,
            description: issue.description,
            url: issue.url,
            state: (await issue.state)?.name,
            priority: issue.priority,
            assignee: (await issue.assignee)?.name,
            team: (await issue.team)?.name,
            labels: (await issue.labels()).nodes.map(l => l.name),
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
          }))
        );

        return {
          success: true,
          count: tickets.length,
          tickets,
        };
      } catch (error) {
        throw new Error(`Failed to read Linear tickets: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'linear_get_teams',
    description: 'Get list of teams in Linear workspace',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    handler: async () => {
      const linear = getLinearClient();

      try {
        const teams = await linear.teams();
        
        return {
          success: true,
          teams: teams.nodes.map(team => ({
            id: team.id,
            name: team.name,
            key: team.key,
            description: team.description,
          })),
        };
      } catch (error) {
        throw new Error(`Failed to get Linear teams: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'linear_get_users',
    description: 'Get list of users in Linear workspace',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    handler: async () => {
      const linear = getLinearClient();

      try {
        const users = await linear.users();
        
        return {
          success: true,
          users: users.nodes.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            displayName: user.displayName,
          })),
        };
      } catch (error) {
        throw new Error(`Failed to get Linear users: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
]; 