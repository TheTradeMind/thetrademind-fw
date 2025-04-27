/**
 * Agent Type Definitions
 */

export interface Agent {
  id?: string; // UUID
  name: string; // Required
  personality: string; // Required
  description: string; // Required
  model: string; // Required
  logo_url?: string; // Optional URL string
  created_at?: string;
}

/**
 * Valid agent model types
 * These should match the models accepted by the API
 */
export type AgentModel = 
  | 'gpt-4'
  | 'claude-3.7-sonnet'
  | 'mistral-7b-instruct'
  | 'llama-3-70b-chat'
  | 'gpt-4o'
  | 'claude-3-opus'
  | 'gemini-2.5-pro'
  | 'anthropic-claude-3-haiku'
  | 'llama-3-8b-instruct'; 