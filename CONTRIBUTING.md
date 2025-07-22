# Contributing to Scopey MCP Server

Thank you for your interest in contributing to Scopey! This guide will help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and add your API keys
4. Build the project: `npm run build`
5. Test locally: `npm run test:server`

## Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Add tests if applicable
4. Run tests: `npm test`
5. Build: `npm run build`
6. Test the server: `npm run test:server`

## Pull Request Process

1. Update the version in `package.json` following [semantic versioning](https://semver.org/):
   - `patch` (1.0.x) for bug fixes
   - `minor` (1.x.0) for new features
   - `major` (x.0.0) for breaking changes

2. Update `CHANGELOG.md` with your changes

3. Create a pull request with:
   - Clear description of changes
   - Any breaking changes noted
   - Tests passing
   - Version bumped

## Release Process

After your PR is merged:

1. A maintainer will create a version tag
2. GitHub Actions will automatically:
   - Run tests
   - Build the project
   - Publish to npm
   - Create a GitHub release

## Code Style

- Use TypeScript strict mode
- Follow the existing code patterns
- Add JSDoc comments for public APIs
- Keep functions focused and testable

## Adding New Tools

When adding a new tool:

1. Create a new file in `src/tools/`
2. Export an array of tool definitions
3. Add the export to `src/tools/index.ts`
4. Update README.md with usage examples
5. Add tests 