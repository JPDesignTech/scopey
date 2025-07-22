# Scopey MCP Server Installation Guide

## Quick Installation Methods

### Method 1: Install via NPX (Recommended for Claude/Cursor)

This is the easiest way to use Scopey without installing it globally:

```bash
npx @jpdesign/scopey
```

### Method 2: Install via NPM (Global Installation)

Install Scopey globally on your system:

```bash
npm install -g @jpdesign/scopey
```

After installation, you can run:
```bash
scopey-mcp
```

### Method 3: Install from Source

Clone and build from source:

```bash
git clone https://github.com/yourusername/scopey-mcp-server.git
cd scopey-mcp-server
npm install
npm run build
npm link
```

## Configuration

### 1. Set Up Environment Variables

Create a `.env` file in your home directory or project root:

```bash
# Create .env file
touch ~/.scopey.env
```

Add your API keys:
```env
LINEAR_API_KEY=your_linear_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_vercel_team_id  # Optional
```

### 2. Configure for Claude Desktop

Add to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "scopey": {
      "command": "npx",
      "args": ["-y", "@jpdesign/scopey"],
      "env": {
        "LINEAR_API_KEY": "your_linear_api_key",
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_ANON_KEY": "your_supabase_anon_key",
        "VERCEL_TOKEN": "your_vercel_token"
      }
    }
  }
}
```

### 3. Configure for Cursor

Add to your Cursor settings or create `.vscode/mcp.json` in your workspace:

```json
{
  "mcp": {
    "servers": {
      "scopey": {
        "command": "npx",
        "args": ["-y", "@jpdesign/scopey"],
        "env": {
          "LINEAR_API_KEY": "${env:LINEAR_API_KEY}",
          "SUPABASE_URL": "${env:SUPABASE_URL}",
          "SUPABASE_ANON_KEY": "${env:SUPABASE_ANON_KEY}",
          "VERCEL_TOKEN": "${env:VERCEL_TOKEN}"
        }
      }
    }
  }
}
```

## Platform-Specific Instructions

### macOS

1. Ensure Node.js 18+ is installed:
   ```bash
   brew install node
   ```

2. Install Scopey:
   ```bash
   npm install -g @jpdesign/scopey
   ```

3. Configure Claude Desktop (see above)

### Windows

1. Install Node.js 18+ from [nodejs.org](https://nodejs.org)

2. Open PowerShell as Administrator and install:
   ```powershell
   npm install -g @jpdesign/scopey
   ```

3. Configure Claude Desktop (see above)

### Linux

1. Install Node.js 18+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. Install Scopey:
   ```bash
   sudo npm install -g @jpdesign/scopey
   ```

3. Configure Claude Desktop (see above)

## Docker Installation (Alternative)

For containerized deployment:

```dockerfile
FROM node:20-alpine
RUN npm install -g @jpdesign/scopey
ENV NODE_ENV=production
ENTRYPOINT ["scopey-mcp"]
```

Build and run:
```bash
docker build -t scopey-mcp .
docker run -e LINEAR_API_KEY=your_key -e SUPABASE_URL=your_url scopey-mcp
```

## Troubleshooting

### Command not found

If you get "command not found" after global installation:
- Check your npm global bin path: `npm bin -g`
- Add it to your PATH if needed

### Permission errors

On macOS/Linux, you might need to use sudo:
```bash
sudo npm install -g @jpdesign/scopey
```

Or configure npm to use a different directory:
```bash
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### API Key issues

Ensure your API keys are correctly set:
- Linear: Check at https://linear.app/settings/api
- Supabase: Check your project settings
- Vercel: Check at https://vercel.com/account/tokens

## Updating Scopey

To update to the latest version:

```bash
# If installed globally
npm update -g @jpdesign/scopey

# Or use npx (always uses latest)
npx @jpdesign/scopey@latest
```

## Uninstalling

To remove Scopey:

```bash
npm uninstall -g @jpdesign/scopey
```

## Getting Help

- GitHub Issues: https://github.com/JPDesignTech/scopey/issues
- Documentation: https://github.com/JPDesignTech/scopey#readme 