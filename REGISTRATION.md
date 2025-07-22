# Registering Scopey MCP Server

## 1. NPM Registration (Primary Distribution)

### Create NPM Account

1. Go to [npmjs.com](https://www.npmjs.com/signup)
2. Create an account (free)
3. Verify your email address

### Claim Your Package Name

Since you're using a scoped package (`@jpdesign/scopey`), you need to:

1. **Create or claim the scope**:
   ```bash
   # Login to npm
   npm login
   
   # Create an organization (if @jpdesign isn't taken)
   # Go to npmjs.com → Create Organization → Name it "jpdesign"
   ```

2. **Publish your package**:
   ```bash
   # First time publish
   npm publish --access public
   
   # Or if you want to test first
   npm publish --dry-run
   ```

### Alternative: Use Personal Scope

If `@jpdesign` is taken, use your personal npm username:
```bash
# Update package.json
"name": "@yourusername/scopey-mcp-server"

# Then publish
npm publish --access public
```

## 2. Register with MCP Directories

### MCP Server Registry (Official)

1. **Submit to MCP Server Directory**:
   - Repository: https://github.com/modelcontextprotocol/servers
   - Create a PR adding your server to their registry
   
2. **Required information**:
   ```yaml
   - name: Scopey
     description: Streamline workflows across Linear, Supabase, Vercel, and development scaffolding
     author: Your Name
     repository: https://github.com/yourusername/scopey-mcp-server
     npm: "@jpdesign/scopey"
     categories:
       - productivity
       - development
       - integration
   ```

### Awesome MCP Servers

Submit to community lists:
- https://github.com/punkpeye/awesome-mcp-servers
- Create a PR with your server details

## 3. Make Your Server Discoverable

### GitHub Topics

Add these topics to your GitHub repository:
```
mcp
mcp-server
model-context-protocol
claude
cursor
linear
supabase
vercel
ai-tools
developer-tools
```

### Package Keywords

Ensure your `package.json` has good keywords:
```json
"keywords": [
  "mcp",
  "mcp-server",
  "model-context-protocol",
  "claude",
  "cursor",
  "linear",
  "supabase",
  "vercel",
  "scaffolding",
  "ai",
  "automation",
  "developer-tools",
  "productivity"
]
```

### README Badges

Add these badges to your README:
```markdown
[![npm version](https://badge.fury.io/js/@jpdesign%2Fscopey.svg)](https://www.npmjs.com/package/@jpdesign/scopey)
[![Downloads](https://img.shields.io/npm/dm/@jpdesign/scopey.svg)](https://www.npmjs.com/package/@jpdesign/scopey)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://modelcontextprotocol.org)
```

## 4. Documentation Sites

### MCP.run Registry

Submit to mcp.run (when available):
- Website: https://mcp.run
- They aggregate MCP servers for easy discovery

### Dev.to / Medium Articles

Write announcement articles:
1. "Introducing Scopey: An MCP Server for Linear, Supabase & Vercel"
2. "How to Build Your Own MCP Server: Lessons from Scopey"

## 5. Community Promotion

### Discord/Slack

Share in relevant channels:
- Anthropic Discord (MCP channels)
- Cursor Community
- AI Developer communities

### Twitter/X

Tweet announcement with hashtags:
```
🚀 Just released Scopey - an MCP server that integrates Linear, Supabase, and Vercel into your AI workflow!

✅ Create Linear tickets
✅ Query Supabase data  
✅ Monitor Vercel deployments
✅ Scaffold new projects

Install: npx @jpdesign/scopey

#MCP #Claude #Cursor #AI #DevTools
```

### Reddit

Post in relevant subreddits:
- r/LocalLLaMA
- r/ClaudeAI
- r/artificial
- r/programming

## 6. SEO Optimization

### GitHub Repository

1. **Description**: Clear, keyword-rich description
2. **Topics**: Add all relevant topics
3. **Website**: Link to documentation
4. **Social preview**: Add a banner image

### NPM Package Page

1. **Description**: Compelling, clear description
2. **README**: Well-formatted with examples
3. **Homepage**: Link to GitHub
4. **Keywords**: Comprehensive list

## 7. Quick Registration Checklist

- [ ] Create NPM account and verify email
- [ ] Choose package name (check availability)
- [ ] Build and test package locally
- [ ] Publish to NPM with `--access public`
- [ ] Add GitHub topics
- [ ] Submit to MCP server registry
- [ ] Submit to awesome-mcp-servers
- [ ] Write announcement blog post
- [ ] Share in communities
- [ ] Monitor npm downloads

## 8. Post-Registration

### Monitor Performance

- NPM weekly downloads
- GitHub stars and issues
- Community feedback
- Bug reports

### Maintain Visibility

- Regular updates
- Respond to issues
- Add new features
- Write tutorials

## Example Registration Commands

```bash
# 1. Login to npm
npm login

# 2. Check name availability
npm view @jpdesign/scopey

# 3. First publish
npm publish --access public

# 4. Tag as latest
npm dist-tag add @jpdesign/scopey@1.0.0 latest

# 5. View your package
npm info @jpdesign/scopey
```

## Troubleshooting

### Name Conflicts

If `@jpdesign/scopey` is taken:
- Try `@jpdesign/mcp`
- Try `@yourname/scopey-mcp`
- Try `scopey-mcp-server` (unscoped)

### Access Denied

If you get 403 errors:
- Ensure `"publishConfig": {"access": "public"}`
- Check npm login status: `npm whoami`
- Verify email on npm account

### Scope Issues

To create an organization scope:
1. Go to npmjs.com
2. Click your avatar → "Add Organization"
3. Create organization with desired name
4. Use `@orgname/package-name` format 