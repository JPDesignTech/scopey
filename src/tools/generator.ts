import { Tool } from '../utils/types.js';

// PRD Template
const generatePRD = (context: string, prompt: string): string => {
  return `# Product Requirements Document (PRD)

## Overview
${prompt}

## Context
${context}

## Problem Statement
[Define the specific problem this product/feature aims to solve based on the context and requirements]

## Target Users
- Primary: [Define primary user group]
- Secondary: [Define secondary user groups if applicable]

## Goals & Objectives
### Business Goals
- [Goal 1]
- [Goal 2]
- [Goal 3]

### User Goals
- [User Goal 1]
- [User Goal 2]
- [User Goal 3]

## Functional Requirements
### Core Features
1. **[Feature Name]**
   - Description: [Detailed description]
   - User Story: As a [user type], I want to [action] so that [benefit]
   - Acceptance Criteria:
     - [ ] [Criterion 1]
     - [ ] [Criterion 2]

2. **[Feature Name]**
   - Description: [Detailed description]
   - User Story: As a [user type], I want to [action] so that [benefit]
   - Acceptance Criteria:
     - [ ] [Criterion 1]
     - [ ] [Criterion 2]

### API Requirements
- **Endpoint 1**: [Method] /api/[endpoint]
  - Purpose: [Description]
  - Request: [Schema]
  - Response: [Schema]

## Non-Functional Requirements
### Performance
- [Requirement 1: e.g., Response time < 200ms]
- [Requirement 2: e.g., Support 10k concurrent users]

### Security
- [Security requirement 1]
- [Security requirement 2]

### Scalability
- [Scalability requirement 1]
- [Scalability requirement 2]

## Technical Architecture
### Technology Stack
- Frontend: [Technologies]
- Backend: [Technologies]
- Database: [Technologies]
- Infrastructure: [Technologies]

### System Architecture
[High-level architecture description]

## Success Metrics
- **Metric 1**: [Definition and target]
- **Metric 2**: [Definition and target]
- **Metric 3**: [Definition and target]

## Timeline & Milestones
- **Phase 1**: [Description] - [Timeline]
- **Phase 2**: [Description] - [Timeline]
- **Phase 3**: [Description] - [Timeline]

## Risks & Mitigation
| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|-------------------|
| [Risk 1] | High/Medium/Low | High/Medium/Low | [Strategy] |
| [Risk 2] | High/Medium/Low | High/Medium/Low | [Strategy] |

## Open Questions
- [ ] [Question 1]
- [ ] [Question 2]
- [ ] [Question 3]

## Appendix
### Glossary
- **Term 1**: Definition
- **Term 2**: Definition

### References
- [Reference 1]
- [Reference 2]
`;
};

// Cursor Rules Template
const generateCursorRules = (prompt: string): string => {
  return `// Cursor Rules Configuration
// Generated based on: ${prompt}

// Project-specific coding standards and patterns
const projectRules = {
  // Language and Framework Preferences
  languages: {
    primary: ["TypeScript", "JavaScript"],
    markup: ["JSX", "TSX"],
    styling: ["CSS", "SCSS", "Tailwind CSS"],
    config: ["JSON", "YAML", "TOML"]
  },

  // Code Style Guidelines
  codeStyle: {
    // Naming Conventions
    naming: {
      components: "PascalCase",        // MyComponent
      functions: "camelCase",          // myFunction
      constants: "UPPER_SNAKE_CASE",   // MY_CONSTANT
      interfaces: "PascalCase",        // IMyInterface or MyInterface
      types: "PascalCase",            // MyType
      enums: "PascalCase",            // MyEnum
      files: {
        components: "PascalCase",      // MyComponent.tsx
        utils: "camelCase",           // myUtil.ts
        hooks: "camelCase",           // useMyHook.ts
        constants: "camelCase",       // constants.ts
      }
    },

    // TypeScript Configuration
    typescript: {
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      exactOptionalPropertyTypes: true,
      noUncheckedIndexedAccess: true,
      preferConst: true,
      preferInterface: false,  // Use type aliases over interfaces
      functionReturnTypes: "explicit", // Always define return types
    },

    // Import Organization
    imports: {
      order: [
        "react",                     // React imports first
        "third-party",               // External packages
        "absolute",                  // Absolute imports (@/...)
        "relative",                  // Relative imports (../, ./)
        "styles",                    // Style imports
        "types",                     // Type imports
      ],
      grouping: true,
      alphabetize: true,
      removeUnused: true,
    }
  },

  // Component Patterns
  componentPatterns: {
    // React Component Structure
    structure: {
      order: [
        "imports",
        "types/interfaces",
        "constants",
        "component-definition",
        "hooks",
        "event-handlers",
        "render-helpers",
        "main-render",
        "exports"
      ],
      defaultExport: false,          // Prefer named exports
      propsInterface: true,          // Always define props interface
      children: "React.ReactNode",   // Type for children prop
    },

    // State Management
    stateManagement: {
      localState: "useState",
      complexState: "useReducer",
      globalState: "zustand",        // or context, redux, etc.
      asyncState: "react-query",     // or swr
    },

    // Styling Approach
    styling: {
      approach: "tailwind",          // tailwind, css-modules, styled-components
      classNameUtil: "clsx",         // Utility for conditional classes
      responsiveFirst: true,
      darkMode: "class",            // or media
    }
  },

  // Code Organization
  projectStructure: {
    folders: {
      "/components": "Reusable UI components",
      "/features": "Feature-specific components and logic",
      "/hooks": "Custom React hooks",
      "/utils": "Utility functions",
      "/lib": "Third-party library configurations",
      "/types": "TypeScript type definitions",
      "/constants": "Application constants",
      "/contexts": "React context providers",
      "/services": "API and external service integrations",
    },
    
    fileNaming: {
      tests: "{name}.test.{ext}",
      stories: "{name}.stories.{ext}",
      types: "{name}.types.ts",
      constants: "{name}.constants.ts",
    }
  },

  // Best Practices
  bestPractices: {
    // Error Handling
    errorHandling: {
      useErrorBoundaries: true,
      logErrors: true,
      userFriendlyMessages: true,
      fallbackUI: true,
    },

    // Performance
    performance: {
      memoization: {
        useMemo: "expensive-calculations",
        useCallback: "stable-references",
        React.memo: "expensive-renders",
      },
      lazyLoading: true,
      codeSpitting: true,
      imageOptimization: true,
    },

    // Security
    security: {
      sanitizeInput: true,
      validateData: true,
      useHTTPS: true,
      secureStorage: true,
      envVariables: "never-commit",
    },

    // Accessibility
    accessibility: {
      semanticHTML: true,
      ariaLabels: true,
      keyboardNavigation: true,
      screenReaderSupport: true,
      colorContrast: "WCAG-AA",
    }
  },

  // Testing Strategy
  testing: {
    framework: "jest",
    components: "react-testing-library",
    e2e: "cypress",
    coverage: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    patterns: {
      unitTests: "test-behavior-not-implementation",
      integrationTests: "test-user-flows",
      mockStrategy: "mock-external-dependencies",
    }
  },

  // Development Workflow
  workflow: {
    git: {
      commitConvention: "conventional-commits",
      branchNaming: "feature|fix|chore/description",
      pullRequests: "require-reviews",
    },
    codeReview: {
      required: true,
      checkList: [
        "Code follows style guide",
        "Tests are included",
        "Documentation is updated",
        "No console.logs",
        "Error handling is implemented",
      ]
    },
    preCommit: {
      prettier: true,
      eslint: true,
      typecheck: true,
      tests: "related-only",
    }
  },

  // Documentation
  documentation: {
    required: [
      "Complex functions",
      "Public APIs",
      "Component props",
      "Non-obvious logic",
    ],
    format: "JSDoc",
    examples: true,
    updateWithCode: true,
  }
};

// Export configuration for Cursor
module.exports = projectRules;

// Additional context-specific rules based on prompt
const contextRules = {
  // Add specific rules based on the prompt context
  // These would be dynamically generated based on the input
};

// Example usage comments
/**
 * How to use these rules in your project:
 * 
 * 1. Save this file as .cursorrules in your project root
 * 2. Cursor will automatically pick up these rules
 * 3. The AI assistant will follow these patterns
 * 4. Customize further based on your specific needs
 * 
 * These rules help maintain consistency across your codebase
 * and ensure that AI-generated code follows your standards.
 */
`;
};

export const generatorTools: Tool[] = [
  {
    name: 'generate_prd',
    description: 'Generate a Product Requirements Document (PRD) based on code context and requirements',
    inputSchema: {
      type: 'object',
      properties: {
        context: {
          type: 'string',
          description: 'Code context or existing implementation details',
        },
        prompt: {
          type: 'string',
          description: 'Requirements and goals for the PRD',
        },
        format: {
          type: 'string',
          description: 'Output format (markdown, json)',
          enum: ['markdown', 'json'],
        },
      },
      required: ['context', 'prompt'],
    },
    handler: async (args) => {
      const { context, prompt, format = 'markdown' } = args;

      try {
        const prdContent = generatePRD(context, prompt);

        if (format === 'json') {
          // Convert markdown to structured JSON
          const sections = prdContent.split(/^## /gm).filter(Boolean);
          const jsonPRD: any = {
            title: 'Product Requirements Document',
            sections: {},
          };

          sections.forEach(section => {
            const lines = section.trim().split('\n');
            const title = lines[0].replace(/^#*\s*/, '');
            const content = lines.slice(1).join('\n').trim();
            jsonPRD.sections[title.toLowerCase().replace(/\s+/g, '_')] = content;
          });

          return {
            success: true,
            format: 'json',
            content: jsonPRD,
          };
        }

        return {
          success: true,
          format: 'markdown',
          content: prdContent,
        };
      } catch (error) {
        throw new Error(`Failed to generate PRD: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'generate_cursor_rules',
    description: 'Generate Cursor rules configuration based on project requirements',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Project requirements and coding standards to base the rules on',
        },
        includeFramework: {
          type: 'string',
          description: 'Primary framework to optimize rules for',
          enum: ['react', 'nextjs', 'vue', 'angular', 'svelte'],
        },
        includePatterns: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'typescript-strict',
              'functional-programming',
              'accessibility-first',
              'performance-optimized',
              'security-focused',
              'test-driven',
            ],
          },
          description: 'Specific patterns to emphasize in the rules',
        },
      },
      required: ['prompt'],
    },
    handler: async (args) => {
      const { prompt, includeFramework, includePatterns = [] } = args;

      try {
        let rulesContent = generateCursorRules(prompt);

        // Add framework-specific rules
        if (includeFramework) {
          const frameworkRules = `
// ${includeFramework.toUpperCase()}-specific Rules
const ${includeFramework}Rules = {
  // Framework-specific patterns and best practices
  patterns: {
    ${includeFramework === 'react' ? `
    hooks: {
      customHookPrefix: "use",
      rulesOfHooks: true,
      exhaustiveDeps: true,
    },
    components: {
      functionalOnly: true,
      propsDestructuring: true,
      defaultProps: "avoid",
    },` : ''}
    ${includeFramework === 'nextjs' ? `
    routing: {
      appDirectory: true,
      dynamicImports: true,
      apiRoutes: "/app/api",
    },
    optimization: {
      imageComponent: true,
      fontOptimization: true,
      scriptStrategy: "afterInteractive",
    },` : ''}
    ${includeFramework === 'vue' ? `
    components: {
      scriptSetup: true,
      singleFileComponents: true,
      compositionAPI: true,
    },
    reactivity: {
      refSugar: false,
      computedGetterOnly: true,
    },` : ''}
  }
};
`;
          rulesContent = rulesContent.replace('// Additional context-specific rules', frameworkRules);
        }

        // Add pattern-specific emphasis
        if (includePatterns.length > 0) {
          const patternEmphasis = `
// Emphasized Patterns
const emphasizedPatterns = ${JSON.stringify(includePatterns, null, 2)};

// Apply additional strict rules based on patterns
${includePatterns.includes('typescript-strict') ? 'projectRules.typescript.strict = true;' : ''}
${includePatterns.includes('accessibility-first') ? 'projectRules.bestPractices.accessibility.colorContrast = "WCAG-AAA";' : ''}
${includePatterns.includes('test-driven') ? 'projectRules.testing.coverage.statements = 90;' : ''}
`;
          rulesContent += '\n' + patternEmphasis;
        }

        return {
          success: true,
          content: rulesContent,
          filename: '.cursorrules',
          includedFramework: includeFramework,
          includedPatterns: includePatterns,
        };
      } catch (error) {
        throw new Error(`Failed to generate Cursor rules: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'generate_context_doc',
    description: 'Generate a context document for reuse across projects',
    inputSchema: {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          description: 'Name of the project',
        },
        techStack: {
          type: 'array',
          items: { type: 'string' },
          description: 'Technologies used in the project',
        },
        description: {
          type: 'string',
          description: 'Project description and goals',
        },
        apis: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              endpoint: { type: 'string' },
              methods: { type: 'array', items: { type: 'string' } },
            },
          },
          description: 'API endpoints and methods',
        },
      },
      required: ['projectName', 'techStack', 'description'],
    },
    handler: async (args) => {
      const { projectName, techStack, description, apis = [] } = args;

      try {
        const contextDoc = `# ${projectName} - Context Document

## Overview
${description}

## Technology Stack
${techStack.map((tech: string) => `- ${tech}`).join('\n')}

## Architecture Overview
This project follows a modern architecture pattern with clear separation of concerns:

### Frontend
- **Framework**: ${techStack.find((t: string) => ['React', 'Vue', 'Angular', 'Svelte'].some(f => t.includes(f))) || 'Not specified'}
- **State Management**: ${techStack.find((t: string) => ['Redux', 'Zustand', 'MobX', 'Pinia'].some(s => t.includes(s))) || 'Local state'}
- **Styling**: ${techStack.find((t: string) => ['Tailwind', 'CSS', 'Styled Components', 'Emotion'].some(s => t.includes(s))) || 'CSS Modules'}

### Backend
- **Runtime**: ${techStack.find((t: string) => ['Node.js', 'Deno', 'Bun'].some(r => t.includes(r))) || 'Not specified'}
- **Framework**: ${techStack.find((t: string) => ['Express', 'Fastify', 'Hapi', 'Koa'].some(f => t.includes(f))) || 'Not specified'}
- **Database**: ${techStack.find((t: string) => ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'].some(db => t.includes(db))) || 'Not specified'}

## API Reference
${apis.length > 0 ? apis.map((api: any) => `
### ${api.name}
- **Endpoint**: ${api.endpoint}
- **Methods**: ${api.methods?.join(', ') || 'GET'}
`).join('\n') : 'No APIs documented yet.'}

## Development Workflow
1. **Setup**: Clone repository and install dependencies
2. **Development**: Run development server with hot reloading
3. **Testing**: Run unit and integration tests
4. **Build**: Create production build
5. **Deploy**: Deploy to production environment

## Key Patterns & Conventions
- **Code Style**: Follows project-specific ESLint and Prettier configurations
- **Git Workflow**: Feature branch workflow with PR reviews
- **Testing**: Jest for unit tests, Cypress/Playwright for E2E
- **Documentation**: Inline JSDoc comments and README files

## Environment Variables
\`\`\`env
# Add your environment variables here
NODE_ENV=development
API_URL=http://localhost:3000/api
DATABASE_URL=
\`\`\`

## Common Commands
\`\`\`bash
# Development
npm run dev

# Testing
npm test
npm run test:watch
npm run test:coverage

# Building
npm run build
npm run preview

# Linting
npm run lint
npm run lint:fix
\`\`\`

## Troubleshooting
### Common Issues
1. **Dependencies**: Run \`npm install\` if you encounter module errors
2. **Environment**: Ensure all required environment variables are set
3. **Ports**: Check if required ports are available

## Additional Resources
- [Project Documentation](./docs)
- [API Documentation](./docs/api)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Architecture Decision Records](./docs/adr)

---
*This context document is automatically generated and should be kept up to date with project changes.*
`;

        return {
          success: true,
          content: contextDoc,
          filename: 'CONTEXT.md',
          projectName,
          techStack,
        };
      } catch (error) {
        throw new Error(`Failed to generate context document: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
]; 