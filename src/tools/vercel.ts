import axios from 'axios';
import { Tool } from '../utils/types.js';

// Vercel API base URL
const VERCEL_API_BASE = 'https://api.vercel.com';

// Create axios instance with auth
const getVercelClient = () => {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    throw new Error('VERCEL_TOKEN environment variable is not set');
  }

  return axios.create({
    baseURL: VERCEL_API_BASE,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const vercelTools: Tool[] = [
  {
    name: 'vercel_list_projects',
    description: 'List all projects in Vercel account',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID to filter projects (optional)',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of projects to return',
          minimum: 1,
          maximum: 100,
        },
        search: {
          type: 'string',
          description: 'Search query to filter projects by name',
        },
      },
    },
    handler: async (args) => {
      const { teamId, limit = 20, search } = args;
      const client = getVercelClient();

      try {
        const params: any = { limit };
        if (teamId) params.teamId = teamId;
        if (search) params.search = search;

        const response = await client.get('/v9/projects', { params });
        const { projects } = response.data;

        return {
          success: true,
          count: projects.length,
          projects: projects.map((project: any) => ({
            id: project.id,
            name: project.name,
            framework: project.framework,
            lastUpdatedAt: project.updatedAt,
            createdAt: project.createdAt,
            link: project.link,
            latestDeployments: project.latestDeployments?.map((d: any) => ({
              id: d.id,
              url: d.url,
              state: d.state,
              createdAt: d.createdAt,
            })),
          })),
        };
      } catch (error) {
        throw new Error(`Failed to list Vercel projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'vercel_get_project',
    description: 'Get detailed information about a specific Vercel project',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'Project ID or name',
        },
        teamId: {
          type: 'string',
          description: 'Team ID (if project belongs to a team)',
        },
      },
      required: ['projectId'],
    },
    handler: async (args) => {
      const { projectId, teamId } = args;
      const client = getVercelClient();

      try {
        const params: any = {};
        if (teamId) params.teamId = teamId;

        const response = await client.get(`/v9/projects/${projectId}`, { params });
        const project = response.data;

        return {
          success: true,
          project: {
            id: project.id,
            name: project.name,
            framework: project.framework,
            nodeVersion: project.nodeVersion,
            buildCommand: project.buildCommand,
            devCommand: project.devCommand,
            installCommand: project.installCommand,
            outputDirectory: project.outputDirectory,
            rootDirectory: project.rootDirectory,
            environmentVariables: project.env?.map((env: any) => ({
              key: env.key,
              target: env.target,
              type: env.type,
            })),
            domains: project.alias,
            git: project.link ? {
              type: project.link.type,
              repo: project.link.repo,
              repoId: project.link.repoId,
              org: project.link.org,
              gitAccountId: project.link.gitAccountId,
            } : null,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
          },
        };
      } catch (error) {
        throw new Error(`Failed to get Vercel project: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'vercel_list_deployments',
    description: 'List deployments for a Vercel project',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          description: 'Project ID to get deployments for',
        },
        teamId: {
          type: 'string',
          description: 'Team ID (if project belongs to a team)',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of deployments to return',
          minimum: 1,
          maximum: 100,
        },
        state: {
          type: 'string',
          description: 'Filter by deployment state',
          enum: ['BUILDING', 'ERROR', 'INITIALIZING', 'QUEUED', 'READY', 'CANCELED'],
        },
      },
    },
    handler: async (args) => {
      const { projectId, teamId, limit = 20, state } = args;
      const client = getVercelClient();

      try {
        const params: any = { limit };
        if (teamId) params.teamId = teamId;
        if (projectId) params.projectId = projectId;
        if (state) params.state = state;

        const response = await client.get('/v6/deployments', { params });
        const { deployments } = response.data;

        return {
          success: true,
          count: deployments.length,
          deployments: deployments.map((deployment: any) => ({
            id: deployment.uid,
            url: deployment.url,
            state: deployment.state,
            readyState: deployment.readyState,
            name: deployment.name,
            creator: deployment.creator?.username || deployment.creator?.email,
            createdAt: deployment.createdAt,
            buildingAt: deployment.buildingAt,
            ready: deployment.ready,
            source: deployment.source,
            target: deployment.target,
            aliasAssigned: deployment.aliasAssigned,
            inspectorUrl: deployment.inspectorUrl,
          })),
        };
      } catch (error) {
        throw new Error(`Failed to list Vercel deployments: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'vercel_get_deployment',
    description: 'Get detailed information about a specific deployment',
    inputSchema: {
      type: 'object',
      properties: {
        deploymentId: {
          type: 'string',
          description: 'Deployment ID',
        },
        teamId: {
          type: 'string',
          description: 'Team ID (if deployment belongs to a team)',
        },
      },
      required: ['deploymentId'],
    },
    handler: async (args) => {
      const { deploymentId, teamId } = args;
      const client = getVercelClient();

      try {
        const params: any = {};
        if (teamId) params.teamId = teamId;

        const response = await client.get(`/v13/deployments/${deploymentId}`, { params });
        const deployment = response.data;

        return {
          success: true,
          deployment: {
            id: deployment.uid,
            url: deployment.url,
            state: deployment.state,
            readyState: deployment.readyState,
            name: deployment.name,
            version: deployment.version,
            regions: deployment.regions,
            routes: deployment.routes,
            functions: deployment.functions,
            creator: deployment.creator,
            team: deployment.team,
            project: deployment.project,
            target: deployment.target,
            alias: deployment.alias,
            aliasAssigned: deployment.aliasAssigned,
            createdAt: deployment.createdAt,
            buildingAt: deployment.buildingAt,
            ready: deployment.ready,
            inspectorUrl: deployment.inspectorUrl,
            lambdas: deployment.lambdas,
          },
        };
      } catch (error) {
        throw new Error(`Failed to get Vercel deployment: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'vercel_get_domains',
    description: 'List all domains in Vercel account',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID to filter domains',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of domains to return',
          minimum: 1,
          maximum: 100,
        },
      },
    },
    handler: async (args) => {
      const { teamId, limit = 20 } = args;
      const client = getVercelClient();

      try {
        const params: any = { limit };
        if (teamId) params.teamId = teamId;

        const response = await client.get('/v5/domains', { params });
        const { domains } = response.data;

        return {
          success: true,
          count: domains.length,
          domains: domains.map((domain: any) => ({
            name: domain.name,
            apexName: domain.apexName,
            projectId: domain.projectId,
            redirect: domain.redirect,
            redirectStatusCode: domain.redirectStatusCode,
            gitBranch: domain.gitBranch,
            verified: domain.verified,
            verification: domain.verification,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
          })),
        };
      } catch (error) {
        throw new Error(`Failed to list Vercel domains: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
]; 