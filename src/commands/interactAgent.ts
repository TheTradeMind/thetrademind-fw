import { Command } from 'commander';
import * as readline from 'readline-sync';
import { AgentService } from '../services/agentService';
import { ChatMessage } from '../services/chatService';

// Standalone function to interact with an agent
export async function interactAgent(agentName: string): Promise<void> {
  try {
    // Check if the agent exists
    console.log(`\n🔍 Connecting to agent "${agentName}" on the TradeMind Network...`);
    
    // Try to get the agent
    const agent = await AgentService.getAgentByName(agentName);
    
    console.log(`\n✅ Connected to ${agent.name}!`);
    console.log(`📊 Model: ${agent.model}`);
    console.log(`📝 Description: ${agent.description}`);
    console.log(`🧠 Personality: ${agent.personality}`);
    console.log('\n💬 Type your messages below. Type "exit", "back", or press Ctrl+C to return to the main menu.\n');
    
    // Display TradeMind Network banner
    console.log('┌─────────────────────────────────────────────────┐');
    console.log('│           TradeMind Network Session              │');
    console.log(`│ Agent: ${agent.name.padEnd(40, ' ')} │`);
    console.log('└─────────────────────────────────────────────────┘\n');
    
    // Initialize chat history
    const chatHistory: ChatMessage[] = [];
    
    // Start conversation loop
    while (true) {
      // Get user input
      const userMessage = readline.question(`👤 You (to ${agent.name}): `);
      
      // Check if user wants to exit
      if (userMessage.toLowerCase() === 'exit' || userMessage.toLowerCase() === 'back') {
        console.log('\n👋 Ending TradeMind Network session...');
        console.log('⏪ Returning to main menu...');
        break;
      }
      
      // Send message to agent
      console.log('\n⏳ Agent is thinking...');
      const response = await AgentService.chatWithAgent(agentName, userMessage, chatHistory);
      
      // Display response with some nice formatting
      console.log(`\n🤖 ${agent.name} (${agent.model}):`);
      console.log(`   ${response.replace(/\n/g, '\n   ')}\n`); // Indent multi-line responses
    }
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Cannot connect to the TradeMind API')) {
        console.error(`\n❌ Connection error: ${error.message}`);
        console.error('ℹ️ Please check your internet connection and try again later.');
      } else if (error.message.includes('not found')) {
        console.error(`❌ Agent "${agentName}" not found in the TradeMind Network.`);
        console.error('ℹ️ Use the "list" command to see all available agents.');
      } else {
        console.error(`❌ Error: ${error.message}`);
      }
    } else {
      console.error('❌ An unexpected error occurred.');
    }
    console.log('⏪ Returning to main menu...');
  }
}

export const interactAgentCommand = new Command('interact')
  .description('Interact with an AI agent')
  .argument('<agent-name>', 'Name of the agent to interact with')
  .action(interactAgent);

export default interactAgentCommand; 