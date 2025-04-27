"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAgentsCommand = void 0;
exports.listAgents = listAgents;
const commander_1 = require("commander");
const agentService_1 = require("../services/agentService");
// Standalone function to list agents
async function listAgents() {
    try {
        console.log('\n┌─────────────────────────────────────────────────┐');
        console.log('│            TradeMind Agent Directory            │');
        console.log('└─────────────────────────────────────────────────┘\n');
        console.log('🔍 Fetching agents from TradeMind Network...\n');
        // Get all agents
        const agents = await agentService_1.AgentService.getAllAgents();
        if (agents.length === 0) {
            console.log('❌ No agents found in the TradeMind Network.');
            console.log('ℹ️ Use the "create" command to add your first agent.');
            return;
        }
        console.log(`✅ Found ${agents.length} agent${agents.length === 1 ? '' : 's'} in the TradeMind Network:\n`);
        // Display each agent
        agents.forEach((agent, index) => {
            console.log(`🤖 ${index + 1}. ${agent.name}`);
            console.log(`   📝 Description: ${agent.description.length > 100 ? agent.description.substring(0, 97) + '...' : agent.description}`);
            console.log(`   🧠 Personality: ${agent.personality.length > 100 ? agent.personality.substring(0, 97) + '...' : agent.personality}`);
            console.log(`   📊 Model: ${agent.model}`);
            console.log(''); // Empty line for better readability
        });
        console.log('ℹ️ To interact with an agent, use the command:');
        console.log('   interact <agent-name>');
        console.log('⏪ Returning to main menu...');
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Cannot connect to the TradeMind API')) {
                console.error(`\n❌ Connection error: ${error.message}`);
                console.error('ℹ️ Please check your internet connection and try again later.');
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
exports.listAgentsCommand = new commander_1.Command('list')
    .description('List all AI agents')
    .action(listAgents);
exports.default = exports.listAgentsCommand;
//# sourceMappingURL=listAgents.js.map