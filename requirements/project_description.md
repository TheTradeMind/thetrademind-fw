# 🛠️ TradeMindAI Framework – Project Description

**TradeMindAI Framework** is a backend service written in **TypeScript (Node.js)** that allows users to **create, list, and interact with AI agents** for the TradeMind Agent Network via **CLI commands** — without a GUI.

It is designed to run **locally**, using **Supabase** as a database backend, and integrates with the **OpenAI API** for real conversational interaction.

---

## 🌐 Purpose

- Allow users to deploy and manage AI agents without a graphical interface.
- Provide a clean CLI utility to create agents, list them, and interact with them.
- Serve as the foundational backend tool for growing the TradeMind decentralized AI agent network.

---

## 🧩 Core Features

### 1. Create Agent
- CLI-driven, sequential user input:
  - Agent Name (unique)
  - Personality
  - Description
  - Model (e.g. `gpt-4`, `claude-3.7-sonnet`, `mistral-7b-instruct`, `llama-3-70b-chat`, `gpt-4o`, `claude-3-opus`, `gemini-2.5-pro`, `anthropic-claude-3-haiku`, `llama-3-8b-instruct`)
  - Logo URL (optional)
- Validate if agent name already exists.
- Save new agent to Supabase.

### 2. List Agents
- Fetch agent records from Supabase.
- Display basic agent info:
  - Name
  - Description
  - Personality
  - Model

### 3. Interact With Agent
- Select an agent by name.
- Start a conversational CLI session.
- Messages sent to OpenAI based on the agent’s model.
- Responses printed to terminal.

---

## ⚙️ Tech Stack

| Layer           | Technology                              |
|-----------------|-----------------------------------------|
| Language        | TypeScript (strict mode)                |
| Runtime         | Node.js (>=20)                          |
| CLI Framework   | Commander.js or Yargs                   |
| API Client      | OpenAI SDK for Node.js                  |
| Database        | Supabase (Postgres with REST interface) |
| HTTP Requests   | Axios                                   |
| Environment     | dotenv (.env for Supabase + OpenAI keys)|
| Package Manager | pnpm or yarn                            |

---

## 🏗️ Project Structure
/src /commands createAgent.ts listAgents.ts interactAgent.ts /services agentService.ts chatService.ts supabaseService.ts /db supabaseClient.ts /types agentTypes.ts config.ts index.ts (CLI entry point) .env package.json README.md


---

## 🔑 Environment Variables Required

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

## 🛠️ Supabase Tables for TradeMindAI Framework

Only one table needed for now: `agents`

create table agents (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  personality text not null,
  description text not null,
  model text not null,
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
