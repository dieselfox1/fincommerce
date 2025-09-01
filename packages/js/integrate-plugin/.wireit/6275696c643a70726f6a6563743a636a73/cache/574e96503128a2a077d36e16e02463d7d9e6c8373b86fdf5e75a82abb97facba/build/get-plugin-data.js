"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginData = getPluginData;
/**
 * External dependencies
 */
const fs_1 = require("fs");
const cli_error_1 = __importDefault(require("@wordpress/create-block/lib/cli-error"));
const path_1 = __importDefault(require("path"));
/**
 * Get the plugin data.
 *
 * @return {Object} - Plugin data as key value pairs.
 */
function getPluginData() {
    const files = (0, fs_1.readdirSync)(process.cwd());
    for (let i = 0; i < files.length; i++) {
        const file = path_1.default.join(process.cwd(), files[i]);
        if (path_1.default.extname(file) !== '.php') {
            continue;
        }
        const content = (0, fs_1.readFileSync)(file, 'utf8');
        const name = content.match(/^\s+\*\s*Plugin Name:\s*(.*)/m);
        if (name && name.length > 1) {
            const description = content.match(/^\s+\*\s+Description:\s*(.*)/m);
            const textdomain = content.match(/^\s+\*\s*Text Domain:\s*(.*)/m);
            const version = content.match(/^\s+\*\s*Version:\s*(.*)/m);
            return {
                description: description && description[1].trim(),
                name: name[1].trim(),
                textdomain: textdomain && textdomain[1].trim(),
                version: version && version[1].trim(),
                namespace: textdomain && textdomain[1].trim(),
            };
        }
    }
    throw new cli_error_1.default('Plugin file not found.');
}
