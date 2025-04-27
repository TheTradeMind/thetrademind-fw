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
exports.createAgentCommand = void 0;
exports.createAgent = createAgent;
const commander_1 = require("commander");
const readline = __importStar(require("readline-sync"));
const agentService_1 = require("../services/agentService");
const apiService_1 = require("../services/apiService");
// Helper function to validate URL
function isValidUrl(urlString) {
    if (!urlString || urlString.trim() === '')
        return true; // Empty URL is valid (it's optional)
    try {
        const url = new URL(urlString);
        return url.protocol === 'http:' || url.protocol === 'https:';
    }
    catch {
        return false;
    }
}
// Standalone function to create an agent
async function createAgent() {
    try {
        console.log('\n┌─────────────────────────────────────────────────┐');
        console.log('│            TradeMind Agent Creation             │');
        console.log('└─────────────────────────────────────────────────┘\n');
        console.log('Create a new AI agent for the TradeMind Network\n');
        // Agent Name (with validation)
        let agentName = '';
        let nameIsAvailable = false;
        while (!nameIsAvailable) {
            // Get agent name input
            agentName = readline.question('Agent Name (must be unique): ').trim();
            // Check if name is empty
            if (!agentName) {
                console.log('❌ Agent name cannot be empty. Please try again.');
                continue;
            }
            // Show "checking" message to improve UX
            console.log(`🔍 Checking if "${agentName}" is available...`);
            try {
                // Try to get the agent by name from the API
                await apiService_1.ApiService.getAgentByName(agentName);
                // If we get here, the agent exists
                console.log(`❌ Sorry, the name "${agentName}" is already taken. Please choose a different name.`);
            }
            catch (error) {
                // If we get a "not found" error, that's good - it means the name is available
                if (error instanceof Error && error.message.includes('not found')) {
                    console.log(`✅ Great! The name "${agentName}" is available.`);
                    nameIsAvailable = true;
                }
                else {
                    // If it's some other error, report it
                    console.error(`❌ Error checking name availability: ${error instanceof Error ? error.message : 'Unknown error'}`);
                }
            }
        }
        // Personality
        let personality = '';
        while (!personality) {
            personality = readline.question('\n👤 Personality (describe the agent\'s personality traits): ').trim();
            if (!personality) {
                console.log('❌ Personality cannot be empty. Please try again.');
            }
        }
        // Description
        let description = '';
        while (!description) {
            description = readline.question('\n📝 Description (what does this agent do?): ').trim();
            if (!description) {
                console.log('❌ Description cannot be empty. Please try again.');
            }
        }
        // Model (with validation)
        const validModels = [
            'gpt-4',
            'claude-3.7-sonnet',
            'mistral-7b-instruct',
            'llama-3-70b-chat',
            'gpt-4o',
            'claude-3-opus',
            'gemini-2.5-pro',
            'anthropic-claude-3-haiku',
            'llama-3-8b-instruct'
        ];
        console.log('\n📊 Available models:');
        validModels.forEach((model, index) => {
            console.log(`  ${index + 1}. ${model}`);
        });
        let model = '';
        while (!model) {
            const modelInput = readline.question('\n🤖 Choose a model (enter number or name): ').trim();
            // Check if input is a number (index)
            const modelIndex = parseInt(modelInput, 10);
            if (!isNaN(modelIndex) && modelIndex >= 1 && modelIndex <= validModels.length) {
                model = validModels[modelIndex - 1];
            }
            // Check if input is a valid model name
            else if (validModels.includes(modelInput)) {
                model = modelInput;
            }
            // Invalid input
            else {
                console.log('❌ Invalid model selection. Please try again.');
            }
        }
        // Logo URL (optional) with URL validation
        let logoUrl = '';
        let validUrl = false;
        while (!validUrl) {
            logoUrl = readline.question('\n🖼️ Logo URL (optional, must be a valid URL or empty): ').trim();
            // If empty, that's fine (it's optional)
            if (!logoUrl) {
                validUrl = true;
                logoUrl = ''; // Empty string instead of null
                continue;
            }
            // If not empty, validate as URL
            if (isValidUrl(logoUrl)) {
                validUrl = true;
            }
            else {
                console.log('❌ Invalid URL format. Please enter a valid URL starting with http:// or https:// or leave empty.');
            }
        }
        // Create agent data object
        const agentData = {
            name: agentName,
            personality,
            description,
            model,
            logo_url: logoUrl || undefined, // Use undefined for optional property
        };
        // Create the agent
        console.log('\n⏳ Creating agent on the TradeMind Network...');
        const agent = await agentService_1.AgentService.createAgent(agentData);
        console.log('\n✅ Agent created successfully and deployed to the TradeMind Network:');
        console.log(`🤖 Name: ${agent.name}`);
        console.log(`🧠 Personality: ${agent.personality}`);
        console.log(`📝 Description: ${agent.description}`);
        console.log(`📊 Model: ${agent.model}`);
        if (agent.logo_url) {
            console.log(`🖼️ Logo URL: ${agent.logo_url}`);
        }
        console.log('\nReturning to main menu...');
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
exports.createAgentCommand = new commander_1.Command('create')
    .description('Create a new AI agent')
    .action(createAgent);
exports.default = exports.createAgentCommand;
//# sourceMappingURL=createAgent.js.map