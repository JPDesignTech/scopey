import { execa } from 'execa';
import { Tool, ScaffoldingSchema } from '../utils/types.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export const scaffoldingTools: Tool[] = [
  {
    name: 'scaffold_nextjs',
    description: 'Create a new Next.js project with TypeScript and common configurations',
    inputSchema: {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          description: 'Name of the project',
        },
        directory: {
          type: 'string',
          description: 'Directory to create project in (defaults to current directory)',
        },
        typescript: {
          type: 'boolean',
          description: 'Use TypeScript (default: true)',
        },
        eslint: {
          type: 'boolean',
          description: 'Include ESLint (default: true)',
        },
        tailwind: {
          type: 'boolean',
          description: 'Include Tailwind CSS (default: true)',
        },
        app: {
          type: 'boolean',
          description: 'Use App Router (default: true)',
        },
        srcDir: {
          type: 'boolean',
          description: 'Use src directory (default: true)',
        },
        importAlias: {
          type: 'string',
          description: 'Import alias (default: "@/*")',
        },
      },
      required: ['projectName'],
    },
    handler: async (args) => {
      const {
        projectName,
        directory = process.cwd(),
        typescript = true,
        eslint = true,
        tailwind = true,
        app = true,
        srcDir = true,
        importAlias = '@/*',
      } = args;

      try {
        const projectPath = path.join(directory, projectName);

        // Check if directory already exists
        if (await fs.pathExists(projectPath)) {
          throw new Error(`Directory ${projectPath} already exists`);
        }

        // Build create-next-app command
        const commandArgs = [
          'create-next-app@latest',
          projectName,
          '--yes', // Skip prompts
          typescript && '--typescript',
          !typescript && '--javascript',
          eslint && '--eslint',
          !eslint && '--no-eslint',
          tailwind && '--tailwind',
          !tailwind && '--no-tailwind',
          app && '--app',
          !app && '--no-app',
          srcDir && '--src-dir',
          !srcDir && '--no-src-dir',
          `--import-alias=${importAlias}`,
        ].filter(Boolean) as string[];

        // Execute create-next-app
        const { stdout, stderr } = await execa('npx', commandArgs, {
          cwd: directory,
          env: {
            ...process.env,
            FORCE_COLOR: '0',
          },
        });

        // Add additional configuration files
        const additionalConfigs = {
          // Add .env.example
          '.env.example': `# Environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=
`,
          // Add additional TypeScript config if using TypeScript
          ...(typescript && {
            'tsconfig.json': JSON.stringify({
              compilerOptions: {
                target: 'ES2022',
                lib: ['dom', 'dom.iterable', 'esnext'],
                allowJs: true,
                skipLibCheck: true,
                strict: true,
                forceConsistentCasingInFileNames: true,
                noEmit: true,
                esModuleInterop: true,
                module: 'esnext',
                moduleResolution: 'node',
                resolveJsonModule: true,
                isolatedModules: true,
                jsx: 'preserve',
                incremental: true,
                plugins: [
                  {
                    name: 'next',
                  },
                ],
                paths: {
                  [importAlias.replace('/*', '/*')]: [`./${srcDir ? 'src' : '.'}/*`],
                },
              },
              include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
              exclude: ['node_modules'],
            }, null, 2),
          }),
        };

        // Write additional config files
        for (const [filename, content] of Object.entries(additionalConfigs)) {
          await fs.writeFile(path.join(projectPath, filename), content);
        }

        return {
          success: true,
          message: 'Next.js project created successfully',
          projectPath,
          commands: {
            navigate: `cd ${projectName}`,
            install: 'npm install',
            dev: 'npm run dev',
            build: 'npm run build',
            start: 'npm start',
          },
          configuration: {
            typescript,
            eslint,
            tailwind,
            appRouter: app,
            srcDirectory: srcDir,
            importAlias,
          },
        };
      } catch (error) {
        throw new Error(`Failed to scaffold Next.js project: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'scaffold_vite',
    description: 'Create a new Vite project with React and TypeScript',
    inputSchema: {
      type: 'object',
      properties: {
        projectName: {
          type: 'string',
          description: 'Name of the project',
        },
        directory: {
          type: 'string',
          description: 'Directory to create project in (defaults to current directory)',
        },
        template: {
          type: 'string',
          description: 'Vite template to use',
          enum: ['vanilla', 'vanilla-ts', 'react', 'react-ts', 'react-swc', 'react-swc-ts', 'vue', 'vue-ts', 'svelte', 'svelte-ts'],
        },
      },
      required: ['projectName'],
    },
    handler: async (args) => {
      const {
        projectName,
        directory = process.cwd(),
        template = 'react-swc-ts',
      } = args;

      try {
        const projectPath = path.join(directory, projectName);

        // Check if directory already exists
        if (await fs.pathExists(projectPath)) {
          throw new Error(`Directory ${projectPath} already exists`);
        }

        // Create Vite project
        const { stdout, stderr } = await execa('npm', [
          'create',
          'vite@latest',
          projectName,
          '--',
          '--template',
          template,
        ], {
          cwd: directory,
          env: {
            ...process.env,
            FORCE_COLOR: '0',
          },
        });

        // Add additional configuration for React projects
        if (template.includes('react')) {
          const additionalConfigs = {
            // Add .env.example
            '.env.example': `# Environment variables
VITE_API_URL=http://localhost:3000/api
`,
            // Update vite.config.ts for better defaults
            'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
`,
            // Add prettier config
            '.prettierrc': JSON.stringify({
              semi: true,
              trailingComma: 'es5',
              singleQuote: true,
              printWidth: 100,
              tabWidth: 2,
              useTabs: false,
            }, null, 2),
            // Update tsconfig if TypeScript
            ...(template.includes('ts') && {
              'tsconfig.json': JSON.stringify({
                compilerOptions: {
                  target: 'ES2022',
                  useDefineForClassFields: true,
                  lib: ['ES2022', 'DOM', 'DOM.Iterable'],
                  module: 'ESNext',
                  skipLibCheck: true,
                  moduleResolution: 'bundler',
                  allowImportingTsExtensions: true,
                  resolveJsonModule: true,
                  isolatedModules: true,
                  noEmit: true,
                  jsx: 'react-jsx',
                  strict: true,
                  noUnusedLocals: true,
                  noUnusedParameters: true,
                  noFallthroughCasesInSwitch: true,
                  paths: {
                    '@/*': ['./src/*'],
                  },
                },
                include: ['src'],
                references: [{ path: './tsconfig.node.json' }],
              }, null, 2),
            }),
          };

          // Write additional config files
          for (const [filename, content] of Object.entries(additionalConfigs)) {
            await fs.writeFile(path.join(projectPath, filename), content);
          }
        }

        return {
          success: true,
          message: 'Vite project created successfully',
          projectPath,
          template,
          commands: {
            navigate: `cd ${projectName}`,
            install: 'npm install',
            dev: 'npm run dev',
            build: 'npm run build',
            preview: 'npm run preview',
          },
        };
      } catch (error) {
        throw new Error(`Failed to scaffold Vite project: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  {
    name: 'add_common_dependencies',
    description: 'Add common dependencies to an existing project',
    inputSchema: {
      type: 'object',
      properties: {
        projectPath: {
          type: 'string',
          description: 'Path to the project (defaults to current directory)',
        },
        dependencies: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'zustand',
              'react-query',
              'axios',
              'zod',
              'react-hook-form',
              'framer-motion',
              'clsx',
              'tailwind-merge',
              'lucide-react',
              'date-fns',
              'react-hot-toast',
            ],
          },
          description: 'List of common dependencies to add',
        },
        dev: {
          type: 'boolean',
          description: 'Install as dev dependencies',
        },
      },
      required: ['dependencies'],
    },
    handler: async (args) => {
      const { projectPath = process.cwd(), dependencies, dev = false } = args;

      try {
        // Check if package.json exists
        const packageJsonPath = path.join(projectPath, 'package.json');
        if (!await fs.pathExists(packageJsonPath)) {
          throw new Error('No package.json found in the specified directory');
        }

        // Install dependencies
        const installCommand = dev ? 'install' : 'install';
        const installArgs = [installCommand, ...(dev ? ['--save-dev'] : []), ...dependencies];

        const { stdout, stderr } = await execa('npm', installArgs, {
          cwd: projectPath,
        });

        // Read updated package.json
        const packageJson = await fs.readJson(packageJsonPath);

        return {
          success: true,
          message: `Successfully installed ${dependencies.length} dependencies`,
          installedDependencies: dependencies,
          devDependencies: dev,
          packageJson: {
            dependencies: packageJson.dependencies,
            devDependencies: packageJson.devDependencies,
          },
        };
      } catch (error) {
        throw new Error(`Failed to add dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
]; 