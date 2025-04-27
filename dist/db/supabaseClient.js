"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const config_1 = require("../config");
// Create a single supabase client for interacting with the database
const supabaseUrl = config_1.config.supabase.url;
const supabaseKey = config_1.config.supabase.anonKey;
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Export default for easier imports
exports.default = exports.supabase;
//# sourceMappingURL=supabaseClient.js.map