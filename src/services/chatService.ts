/**
 * Chat Service - Utility functions for chat interaction
 * Note: Actual AI interaction is now handled by the API
 */

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const ChatService = {
  /**
   * Format a conversation for display in the terminal
   * @param messages - Array of chat messages
   */
  formatConversation(messages: ChatMessage[]): string {
    return messages
      .filter(msg => msg.role !== 'system')
      .map(msg => `${msg.role === 'user' ? 'You' : 'Agent'}: ${msg.content}`)
      .join('\n\n');
  },

  /**
   * Create a new chat session
   */
  createChatSession(): ChatMessage[] {
    return [];
  }
}; 