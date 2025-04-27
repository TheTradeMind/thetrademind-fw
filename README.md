# 🛠️ TradeMindAI Framework

TradeMindAI Framework is a CLI client written in TypeScript (Node.js) that allows users to **create, list, and interact with AI agents** for the TradeMind Agent Network via **CLI commands** — without a GUI.

It connects to the **TradeMind API** to handle business logic and AI interactions.

## 🚀 Features

- **Create Agent**: Define unique AI agents with personality, description, and various LLM models
- **List Agents**: View all created agents and their information
- **Interact with Agent**: Start conversational sessions with your agents

## 📋 Prerequisites

- Node.js (v20 or newer)
- Internet connection to access the TradeMind API

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TheTradeMind/thetrademind-fw.git
   cd trade-mind-fw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link the CLI globally (optional):
   ```bash
   npm link
   ```

## 📝 Usage

Run the application to start the interactive CLI:

```bash
npm run dev
# or after building
npm start
```

You'll be presented with an interactive prompt where you can run commands:

### Available commands:

#### Create a new agent

```
> create
```

Follow the prompts to specify:
- Agent Name (unique)
- Personality
- Description
- Model (e.g. gpt-4, claude-3.7-sonnet, etc.)
- Logo URL (optional)

#### List all agents

```
> list
```

#### Interact with an agent

```
> interact <agent-name>
```

Start a conversation with the specified agent. Type 'exit' or 'back' to return to the main menu.

#### Help

```
> help
```

Display all available commands.

#### Quit

```
> quit
```

Exit the program (you can also press Ctrl+C).

## 🧩 Supported Models

- gpt-4
- claude-3.7-sonnet
- mistral-7b-instruct
- llama-3-70b-chat
- gpt-4o
- claude-3-opus
- gemini-2.5-pro
- anthropic-claude-3-haiku
- llama-3-8b-instruct

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
