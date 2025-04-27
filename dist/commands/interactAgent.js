"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactAgentCommand = void 0;
exports.interactAgent = interactAgent;
const commander_1 = require("commander");
const readline = __importStar(require("readline-sync"));
const agentService_1 = require("../services/agentService");
// Standalone function to interact with an agent
async function interactAgent(agentName) {
    try {
        // Check if the agent exists
        console.log(`\n🔍 Connecting to agent "${agentName}" on the TradeMind Network...`);
        // Try to get the agent
        const agent = await agentService_1.AgentService.getAgentByName(agentName);
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
        const chatHistory = [];
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
            const response = await agentService_1.AgentService.chatWithAgent(agentName, userMessage, chatHistory);
            // Display response with some nice formatting
            console.log(`\n🤖 ${agent.name} (${agent.model}):`);
            console.log(`   ${response.replace(/\n/g, '\n   ')}\n`); // Indent multi-line responses
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Cannot connect to the TradeMind API')) {
                console.error(`\n❌ Connection error: ${error.message}`);
                console.error('ℹ️ Please check your internet connection and try again later.');
            }
            else if (error.message.includes('not found')) {
                console.error(`❌ Agent "${agentName}" not found in the TradeMind Network.`);
                console.error('ℹ️ Use the "list" command to see all available agents.');
            }
            else {
                console.error(`❌ Error: ${error.message}`);
            }
        }
        else {
            console.error('❌ An unexpected error occurred.');
        }
        console.log('⏪ Returning to main menu...');
    }
}
exports.interactAgentCommand = new commander_1.Command('interact')
    .description('Interact with an AI agent')
    .argument('<agent-name>', 'Name of the agent to interact with')
    .action(interactAgent);
exports.default = exports.interactAgentCommand;
//# sourceMappingURL=interactAgent.js.map