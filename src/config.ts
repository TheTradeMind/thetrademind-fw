import dotenv from 'dotenv';
import { existsSync } from 'fs';
import path from 'path';

// Load environment variables from .env file
const envPath = path.join(process.cwd(), '.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Configuration object
export const config = {
  // TradeMind API Configuration
  api: {
    baseUrl: 'https://trademind-api.vercel.app',
  },
};

// Validate required environment variables
export const validateConfig = (): void => {
}; 