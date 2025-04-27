"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
const envPath = path_1.default.join(process.cwd(), '.env');
if ((0, fs_1.existsSync)(envPath)) {
    dotenv_1.default.config({ path: envPath });
}
// Configuration object
exports.config = {
    // TradeMind API Configuration
    api: {
        baseUrl: 'https://trademind-api.vercel.app',
    },
};
// Validate required environment variables
const validateConfig = () => {
    // Note: We no longer validate Supabase and OpenAI keys as they've been moved to the API
};
exports.validateConfig = validateConfig;
//# sourceMappingURL=config.js.map