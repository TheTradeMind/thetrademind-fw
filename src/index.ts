#!/usr/bin/env node

import { Command } from 'commander';
import * as readline from 'readline-sync';
import { validateConfig } from './config';
import createAgentCommand, { createAgent } from './commands/createAgent';
import listAgentsCommand, { listAgents } from './commands/listAgents';
import interactAgentCommand, { interactAgent } from './commands/interactAgent';
import { ApiService } from './services/apiService';

// Create the main program
const program = new Command();

// Setup CLI metadata
program
  .name('trade-mind')
  .description('TradeMindAI Framework - Create, list, and interact with AI agents via CLI')
  .version('1.0.0');

// Register commands
program.addCommand(createAgentCommand);
program.addCommand(listAgentsCommand);
program.addCommand(interactAgentCommand);

// Display welcome message and help
function displayWelcome() {
  console.log('\n┌─────────────────────────────────────────────────┐');
  console.log('│            Welcome to TradeMind AI              │');
  console.log('│                Agent Network                    │');
  console.log('└─────────────────────────────────────────────────┘\n');
  console.log('✨ Create, manage and interact with AI agents through this CLI.');
  console.log('📝 Type a command to get started, "help" for available commands, or "quit" to exit.\n');
}

// Display available commands
function displayHelp() {
  console.log('\n📚 Available commands:');
  console.log('  🔸 create                - Create a new AI agent');
  console.log('  🔸 list                  - List all AI agents');
  console.log('  🔸 interact <agent-name> - Interact with an AI agent');
  console.log('  🔸 help                  - Display this help message');
  console.log('  🔸 quit                  - Exit the program');
  console.log('\n⚠️  Press Ctrl+C at any time to exit the program.\n');
}

// Show specific command help
function showCommandHelp(command: string) {
  switch(command) {
    case 'create':
      console.log('\n📝 Usage: create');
      console.log('This command starts the agent creation wizard.');
      console.log('You will be prompted to enter:');
      console.log('  - A unique agent name');
      console.log('  - Personality traits');
      console.log('  - Description of what the agent does');
      console.log('  - AI model to power the agent');
      console.log('  - Optional logo URL (must be a valid http/https URL)\n');
      break;
    case 'list':
      console.log('\n📝 Usage: list');
      console.log('This command lists all available agents in the TradeMind Network.');
      console.log('It will show each agent\'s name, description, personality, and model.\n');
      break;
    case 'interact':
      console.log('\n📝 Usage: interact <agent-name>');
      console.log('This command starts a conversation with the specified agent.');
      console.log('Examples:');
      console.log('  interact SalesBot');
      console.log('  interact TechSupport');
      console.log('\nThe agent-name argument is required and must match an existing agent.\n');
      break;
    default:
      console.log(`\n❌ Unknown command: "${command}"`);
      displayHelp();
      break;
  }
}

// Execute a command with error handling
async function executeCommand(commandArgs: string[]) {
  const command = commandArgs[0].toLowerCase();
  
  try {
    switch(command) {
      case 'create':
        if (commandArgs.length > 1) {
          console.error('Error: Too many arguments for "create". No arguments expected.');
          showCommandHelp('create');
          return;
        }
        await createAgent();
        break;
      
      case 'list':
        if (commandArgs.length > 1) {
          console.error('Error: Too many arguments for "list". No arguments expected.');
          showCommandHelp('list');
          return;
        }
        await listAgents();
        break;
      
      case 'interact':
        if (commandArgs.length < 2) {
          console.error('Error: Missing agent name. Usage: interact <agent-name>');
          showCommandHelp('interact');
          return;
        }
        await interactAgent(commandArgs[1]);
        break;
      
      default:
        console.error(`Unknown command: "${command}"`);
        console.log('Type "help" to see available commands.');
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unexpected error occurred.');
    }
  }
}

// Main interactive CLI function
async function interactiveCLI() {
  displayWelcome();
  displayHelp();

  while (true) {
    const input = readline.question('\n> ').trim();
    
    // Skip empty inputs
    if (!input) continue;
    
    // Check for quit command
    if (input.toLowerCase() === 'quit' || input.toLowerCase() === 'exit') {
      console.log('Goodbye! 👋');
      process.exit(0);
    }

    // Handle help command
    if (input.toLowerCase() === 'help') {
      displayHelp();
      continue;
    }

    // Parse command and arguments
    const args = input.split(' ').filter(arg => arg.trim() !== '');
    
    // Execute the command
    if (args.length > 0) {
      await executeCommand(args);
    }
  }
}

// Main function
async function main() {
  try {
    // Validate environment variables
    validateConfig();

    // Check API connectivity
    console.log('Connecting to TradeMind API...');
    const isConnected = await ApiService.checkApiConnectivity();
    
    if (!isConnected) {
      console.error('\n❌ Cannot connect to the TradeMind API.');
      console.error('Please check:');
      console.error('  - Your internet connection');
      console.error(`  - If the TradeMind API server is running`);
      console.error('\nRetrying in 5 seconds...');
      
      // Wait 5 seconds and try again
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const retryConnection = await ApiService.checkApiConnectivity();
      if (!retryConnection) {
        console.error('\n❌ Still unable to connect to the TradeMind API.');
        console.error('The application will continue, but some features may not work.');
        console.error('You can try again later or contact the system administrator.\n');
      } else {
        console.log('\n✅ Connected to TradeMind API successfully!\n');
      }
    } else {
      console.log('✅ Connected to TradeMind API successfully!\n');
    }

    // Start interactive CLI
    await interactiveCLI();
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);

      // If the error is related to environment variables, provide more helpful information
      if (error.message.includes('required but not set in environment variables')) {
        console.error('\nPlease make sure you have set the following environment variables in your .env file:');
        console.error('API_BASE_URL=https://trademind-api.vercel.app');
      }
    } else {
      console.error('An unexpected error occurred.');
    }
    process.exit(1);
  }
}

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\nGoodbye! 👋');
  process.exit(0);
});

// Run the program
main(); 