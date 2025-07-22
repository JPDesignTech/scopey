# Scopey MCP Server PRD

## Overview

**Scopey** is a personal MCP (Model Context Protocol) server designed to streamline workflows and context management across your common technology stack (Next.js, Supabase, Drizzle ORM, Zustand, React, tRPC, Redis, Stripe, Trigger.dev, etc.). It acts as a centralized integration hub and scaffolding assistant for personal development projects.

## Problem Statement

Managing repetitive tasks across multiple platforms (Linear, Supabase, Vercel) and consistently setting up boilerplate code for similar projects leads to inefficient workflows and scattered contexts. Scopey centralizes these processes, improving efficiency and clarity.

## Target User

- Solo developers or small teams consistently using a defined technology stack.

## Product Vision & Goals

- **Vision:** Simplify and centralize repetitive tasks and scaffolding for developers.
- **Goals:**
  - Accelerate project setup.
  - Simplify access to common workflows (Linear, Supabase, Vercel).
  - Improve consistency and reusability through context engineering.

## Scope

### In-Scope

- **Linear Integration:** Create and read tickets.
- **Supabase Integration:** Read-only access to databases.
- **Vercel Integration:** Read access to project info and deployments.
- **Project Scaffolding:** Vite and Next.js project setup commands.
- **PRD Generation:** Generate PRDs based on provided code contexts and prompts.
- **Cursor Rule Generation:** Create Cursor rules from prompts.

### Out-of-Scope

- Modifying or writing data to Supabase.
- Modifying configurations or deployments directly on Vercel.
- OAuth or complex authentication flows.

## Assumptions & Dependencies

- Existing authenticated API keys/tokens for Linear, Supabase, Vercel.
- Node.js and related CLI tools pre-installed for scaffolding commands.

## User Stories

- **As a developer**, I want to quickly create Linear tickets and retrieve them easily through a simple API.
- **As a developer**, I need read-only data access from Supabase and Vercel to manage projects without complexity.
- **As a developer**, I require fast scaffolding for my Next.js/Vite projects to start development quicker.
- **As a developer**, I want Scopey to automatically generate a clear, structured PRD from my given code contexts and prompts.
- **As a developer**, I want to effortlessly generate Cursor rules based on my input prompts to streamline my coding environment.

## Functional Requirements

- **MCP Endpoint:** Single API endpoint handling structured JSON requests.
- **Tool Integration APIs:** Clearly defined and documented interfaces for each tool integration (Linear, Supabase, Vercel).
- **Scaffolding Command API:** Execute CLI commands safely and return structured results.
- **PRD and Cursor Rule Generator:** Leverage Context Engineering to generate structured, high-quality outputs from user prompts.

**Example API Request:**

```json
{
  "action": "create_linear_ticket",
  "payload": { "title": "Bug fix needed", "description": "Details here..." }
}
```

**Example API Response:**

```json
{
  "linear": { "ticketId": "LIN-123", "status": "created" }
}
```

## Non-functional Requirements

- **Performance:** <2 second average response.
- **Reliability:** 99% uptime.
- **Usability:** Easy integration, clear and concise documentation.

## Success Metrics

- Reduction in setup and task management time.
- Increased reuse of contexts, PRDs, and Cursor rules across projects.

## Context Engineering Workflow Demo

1. **Define Context:** Extract clear, reusable contexts from project descriptions.
2. **Structured Prompt Creation:** Use PRD and RFC to inform structured, precise prompts.
3. **LLM Interaction:** Provide structured contexts to LLM for generating outputs (PRDs, Cursor rules, etc.).
4. **Validation:** Check outputs against clearly defined acceptance criteria.
5. **Reuse:** Demonstrate how contexts are efficiently reused across multiple projects.

## Why Context Engineering Matters

- Provides clarity, reduces ambiguity, and ensures relevance.
- Ensures consistent, accurate outputs from LLM integrations.
- Dramatically increases efficiency through context reuse, saving valuable developer time.

