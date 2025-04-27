"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const supabaseClient_1 = __importDefault(require("../db/supabaseClient"));
/**
 * Service for Supabase database operations
 */
exports.SupabaseService = {
    /**
     * Create a new agent
     * @param agent - Agent data to create
     */
    async createAgent(agent) {
        const { data, error } = await supabaseClient_1.default
            .from('agents')
            .insert([agent])
            .select()
            .single();
        if (error) {
            throw new Error(`Failed to create agent: ${error.message}`);
        }
        return data;
    },
    /**
     * Check if an agent with the given name already exists
     * @param name - Agent name to check
     */
    async agentExists(name) {
        const { data, error } = await supabaseClient_1.default
            .from('agents')
            .select('name')
            .eq('name', name)
            .maybeSingle();
        if (error) {
            throw new Error(`Failed to check if agent exists: ${error.message}`);
        }
        return !!data;
    },
    /**
     * Get all agents
     */
    async getAllAgents() {
        const { data, error } = await supabaseClient_1.default
            .from('agents')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(`Failed to fetch agents: ${error.message}`);
        }
        return data;
    },
    /**
     * Get an agent by name
     * @param name - Agent name
     */
    async getAgentByName(name) {
        const { data, error } = await supabaseClient_1.default
            .from('agents')
            .select('*')
            .eq('name', name)
            .maybeSingle();
        if (error) {
            throw new Error(`Failed to fetch agent by name: ${error.message}`);
        }
        return data;
    },
};
//# sourceMappingURL=supabaseService.js.map