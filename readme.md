# Scopey MCP Server

[![npm version](https://badge.fury.io/js/@jpdesign%2Fscopey.svg)](https://www.npmjs.com/package/@jpdesign/scopey)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Scopey is a personal MCP (Model Context Protocol) server designed to streamline workflows and context management across your common technology stack. It acts as a centralized integration hub and scaffolding assistant for personal development projects.
![Scopey MCP Server Banner](https://replicate.delivery/xezq/ucKE0KSIuX6TLlxwqYU4fvIBKtYr7gAj4kWkVBUMqotoKrhKA/tmprrpnspnk.png)

## Features

- **Linear Integration**: Create and read tickets/issues
- **Supabase Integration**: Read-only access to databases
- **Vercel Integration**: Read access to project info and deployments
- **Project Scaffolding**: Vite and Next.js project setup commands
- **PRD Generation**: Generate PRDs based on provided code contexts and prompts
- **Cursor Rule Generation**: Create Cursor rules from prompts

## Quick Start

### Option 1: Use with NPX (Recommended)

No installation required! Just add to your MCP client configuration:

```json
{
  "mcpServers": {
    "scopey": {
      "command": "npx",
      "args": ["-y", "@jpdesign/scopey"],
      "env": {
        "LINEAR_API_KEY": "your_key",
        "SUPABASE_URL": "your_url",
        "SUPABASE_ANON_KEY": "your_key",
        "VERCEL_TOKEN": "your_token"
      }
    }
  }
}
```

### Option 2: Global Installation

```bash
npm install -g @jpdesign/scopey
```

Then use `scopey-mcp` command in your configuration:

```json
{
  "mcpServers": {
    "scopey": {
      "command": "scopey-mcp",
      "env": {
        "LINEAR_API_KEY": "your_key",
        "SUPABASE_URL": "your_url",
        "SUPABASE_ANON_KEY": "your_key",
        "VERCEL_TOKEN": "your_token"
      }
    }
  }
}
```

### Option 3: Install from Source

```bash
git clone https://github.com/yourusername/scopey-mcp-server.git
cd scopey-mcp-server
npm install
npm run build
npm link
```

## Configuration

### Environment Variables

Create a `.env` file with your API keys:

```env
LINEAR_API_KEY=your_linear_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_vercel_team_id  # Optional
```

### Claude Desktop Configuration

Add Scopey to your Claude Desktop configuration:

**Location by platform:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/claude/claude_desktop_config.json`

### Cursor Configuration

Add to your Cursor settings or create `.vscode/mcp.json` in your workspace.

## Available Tools

### Linear Tools

- **linear_create_ticket**: Create a new ticket/issue in Linear
- **linear_read_tickets**: Read/search tickets from Linear
- **linear_get_teams**: Get list of teams in Linear workspace
- **linear_get_users**: Get list of users in Linear workspace

### Supabase Tools

- **supabase_read_table**: Read data from a Supabase table
- **supabase_execute_query**: Execute a custom Supabase query
- **supabase_list_tables**: List all tables in the database
- **supabase_get_table_schema**: Get the schema of a specific table

### Vercel Tools

- **vercel_list_projects**: List all projects in Vercel account
- **vercel_get_project**: Get detailed information about a project
- **vercel_list_deployments**: List deployments for a project
- **vercel_get_deployment**: Get detailed deployment information
- **vercel_get_domains**: List all domains in account

### Scaffolding Tools

- **scaffold_nextjs**: Create a new Next.js project
- **scaffold_vite**: Create a new Vite project
- **add_common_dependencies**: Add common dependencies to a project

### Generator Tools

- **generate_prd**: Generate a Product Requirements Document
- **generate_cursor_rules**: Generate Cursor rules configuration
- **generate_context_doc**: Generate a context document for reuse

## Examples

### Creating a Linear Ticket

```json
{
  "tool": "linear_create_ticket",
  "arguments": {
    "title": "Implement new authentication flow",
    "description": "Add OAuth2 support for Google and GitHub",
    "priority": 2,
    "labels": ["feature", "authentication"]
  }
}
```

### Reading from Supabase

```json
{
  "tool": "supabase_read_table",
  "arguments": {
    "tableName": "users",
    "filter": {
      "active": true
    },
    "limit": 10
  }
}
```

### Scaffolding a Next.js Project

```json
{
  "tool": "scaffold_nextjs",
  "arguments": {
    "projectName": "my-app",
    "typescript": true,
    "tailwind": true,
    "app": true
  }
}
```

### Generating a PRD

```json
{
  "tool": "generate_prd",
  "arguments": {
    "context": "Existing e-commerce platform built with Next.js and Supabase",
    "prompt": "Add a recommendation engine that suggests products based on user behavior"
  }
}
```

## Development

### Project Structure

```
scopey-mcp-server/
├── src/
│   ├── index.ts          # Main server entry point
│   ├── tools/            # Tool implementations
│   │   ├── linear.ts     # Linear integration
│   │   ├── supabase.ts   # Supabase integration
│   │   ├── vercel.ts     # Vercel integration
│   │   ├── scaffolding.ts # Project scaffolding
│   │   └── generator.ts  # PRD and rules generation
│   └── utils/            # Utility functions
│       └── types.ts      # TypeScript types
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## API Keys

### Linear
1. Go to [Linear Settings](https://linear.app/settings/api)
2. Create a new personal API key
3. Add to `.env` as `LINEAR_API_KEY`

### Supabase
1. Go to your Supabase project settings
2. Find the API section
3. Copy the URL and anon key
4. Add to `.env` as `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### Vercel
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token
3. Add to `.env` as `VERCEL_TOKEN`
4. Optionally add your team ID as `VERCEL_TEAM_ID`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/yourusername/scopey-mcp-server).
