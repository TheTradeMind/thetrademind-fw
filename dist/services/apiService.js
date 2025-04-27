"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
// Create axios instance for the TradeMind API
const apiClient = axios_1.default.create({
    baseURL: config_1.config.api.baseUrl,
    timeout: 15000, // Increase timeout to 15 seconds to handle slower connections
    headers: {
        'Content-Type': 'application/json',
    }
});
/**
 * Handles API errors and returns user-friendly error messages
 */
function handleApiError(error, operation) {
    if (axios_1.default.isAxiosError(error)) {
        // Connection errors (network-related)
        if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET' || error.code === 'ECONNABORTED' || !error.response) {
            return new Error(`Cannot connect to the TradeMind API. Please check your internet connection and try again later.`);
        }
        // Server returned an error response
        if (error.response) {
            // Log detailed errors only in development
            if (process.env.NODE_ENV === 'development') {
                console.error('API Error Response:', {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                });
            }
            // Return specific error messages for common HTTP status codes
            if (error.response.status === 404) {
                if (operation === 'getAgent') {
                    const agentName = error.config?.url?.split('/').pop();
                    return new Error(`Agent "${agentName}" not found.`);
                }
                return new Error(`The requested resource was not found.`);
            }
            else if (error.response.status === 401 || error.response.status === 403) {
                return new Error(`Authorization error. Please check your API credentials.`);
            }
            else if (error.response.status === 429) {
                return new Error(`Too many requests. Please try again later.`);
            }
            else if (error.response.status >= 500) {
                return new Error(`The TradeMind API server is currently experiencing issues. Please try again later.`);
            }
            // Use the error message from the API if available
            const errorMessage = error.response.data?.message || error.message;
            return new Error(`${operation} failed: ${errorMessage}`);
        }
    }
    // Generic error handling
    if (error instanceof Error) {
        return new Error(`${operation} failed: ${error.message}`);
    }
    return new Error(`${operation} failed due to an unknown error.`);
}
/**
 * Service for communicating with the TradeMind API
 */
exports.ApiService = {
    /**
     * Create a new agent via the API
     * @param agent - Agent data to create
     */
    async createAgent(agent) {
        try {
            // Prepare data according to API validation schema
            const requestData = {
                name: agent.name,
                personality: agent.personality,
                description: agent.description,
                model: agent.model,
                // Only include logo_url if it's a valid URL string
                ...(agent.logo_url && agent.logo_url.trim() !== ''
                    ? { logo_url: agent.logo_url.startsWith('http') ? agent.logo_url : undefined }
                    : {})
            };
            const response = await apiClient.post('/api/agents', requestData);
            return response.data;
        }
        catch (error) {
            throw handleApiError(error, 'Creating agent');
        }
    },
    /**
     * Get all agents from the API
     */
    async getAllAgents() {
        try {
            const response = await apiClient.get('/api/agents');
            return response.data;
        }
        catch (error) {
            throw handleApiError(error, 'Fetching agents');
        }
    },
    /**
     * Get an agent by name from the API
     * @param name - Agent name
     */
    async getAgentByName(name) {
        try {
            const response = await apiClient.get(`/api/agents/${name}`);
            return response.data;
        }
        catch (error) {
            throw handleApiError(error, 'getAgent');
        }
    },
    /**
     * Send a chat message to an agent via the API
     * @param agentName - Name of the agent to chat with
     * @param message - User's message
     */
    async chatWithAgent(agentName, message) {
        try {
            const response = await apiClient.post(`/api/agents/${agentName}/chat`, { message });
            return response.data.response;
        }
        catch (error) {
            throw handleApiError(error, 'Chat with agent');
        }
    },
    /**
     * Check API connectivity
     * @returns true if API is reachable, false otherwise
     */
    async checkApiConnectivity() {
        try {
            await apiClient.get('/', { timeout: 5000 });
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
//# sourceMappingURL=apiService.js.map