"use strict";
/**
 * Chat Service - Utility functions for chat interaction
 * Note: Actual AI interaction is now handled by the API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
exports.ChatService = {
    /**
     * Format a conversation for display in the terminal
     * @param messages - Array of chat messages
     */
    formatConversation(messages) {
        return messages
            .filter(msg => msg.role !== 'system')
            .map(msg => `${msg.role === 'user' ? 'You' : 'Agent'}: ${msg.content}`)
            .join('\n\n');
    },
    /**
     * Create a new chat session
     */
    createChatSession() {
        return [];
    }
};
//# sourceMappingURL=chatService.js.map