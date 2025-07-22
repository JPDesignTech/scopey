import { z } from 'zod';

export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
  handler: (args: any) => Promise<any>;
}

export const LinearTicketSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  teamId: z.string().optional(),
  priority: z.number().min(0).max(4).optional(),
  labels: z.array(z.string()).optional(),
  assigneeId: z.string().optional(),
});

export const SupabaseQuerySchema = z.object({
  tableName: z.string(),
  query: z.string().optional(),
  limit: z.number().positive().optional(),
  offset: z.number().min(0).optional(),
});

export const VercelProjectSchema = z.object({
  projectId: z.string().optional(),
  teamId: z.string().optional(),
  limit: z.number().positive().optional(),
});

export const ScaffoldingSchema = z.object({
  projectName: z.string(),
  projectType: z.enum(['nextjs', 'vite']),
  template: z.string().optional(),
  typescript: z.boolean().optional(),
  directory: z.string().optional(),
});

export const GeneratorSchema = z.object({
  type: z.enum(['prd', 'cursor-rules']),
  context: z.string(),
  prompt: z.string(),
  format: z.string().optional(),
}); 