"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const apiService_1 = require("./apiService");
exports.AgentService = {
    /**
     * Create a new agent
     * @param agentData - Agent data to create
     */
    async createAgent(agentData) {
        return await apiService_1.ApiService.createAgent(agentData);
    },
    /**
     * Get all agents
     */
    async getAllAgents() {
        return await apiService_1.ApiService.getAllAgents();
    },
    /**
     * Get an agent by name
     * @param name - Agent name
     */
    async getAgentByName(name) {
        return await apiService_1.ApiService.getAgentByName(name);
    },
    /**
     * Check if a model string is valid
     * @param model - Model name to validate
     */
    isValidModel(model) {
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
        return validModels.includes(model);
    },
    /**
     * Chat with an agent
     * @param agentName - Name of the agent to chat with
     * @param userMessage - User's message
     * @param chatHistory - Conversation history
     */
    async chatWithAgent(agentName, userMessage, chatHistory = []) {
        // Add user message to chat history locally
        chatHistory.push({
            role: 'user',
            content: userMessage,
        });
        // Send message to the API
        const response = await apiService_1.ApiService.chatWithAgent(agentName, userMessage);
        // Add assistant response to chat history locally
        chatHistory.push({
            role: 'assistant',
            content: response,
        });
        return response;
    },
};
//# sourceMappingURL=agentService.js.map