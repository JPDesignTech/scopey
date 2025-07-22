# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-07-22

### Changed
- Updated package name from `@scopey/mcp-server` to `@jpdesign/scopey`
- Fixed TypeScript ES module imports configuration
- Improved installation documentation

### Fixed
- Resolved `ERR_UNSUPPORTED_DIR_IMPORT` error by updating TypeScript config
- Fixed module resolution for ES modules

## [1.0.0] - 2025-07-22

### Added
- Initial release
- Linear integration (create/read tickets, get teams/users)
- Supabase integration (read-only database access)
- Vercel integration (project and deployment information)
- Project scaffolding tools (Next.js, Vite)
- PRD and Cursor rules generation
- Docker support
- Comprehensive documentation 