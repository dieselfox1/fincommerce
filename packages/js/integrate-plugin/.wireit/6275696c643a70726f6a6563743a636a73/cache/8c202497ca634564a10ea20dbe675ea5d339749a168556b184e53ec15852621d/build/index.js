#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const commander_1 = require("commander");
const cli_error_1 = __importDefault(require("@wordpress/create-block/lib/cli-error"));
/**
 * Internal dependencies
 */
const log = __importStar(require("./log"));
const get_plugin_data_1 = require("./get-plugin-data");
const get_plugin_config_1 = require("./get-plugin-config");
//add the following line
const program = new commander_1.Command();
const commandName = `woo-integrate-plugin`;
program
    .name(commandName)
    .description('Integrates a plugin with FinCommerce build scripts and dependencies.\n\n' +
    'The provided build scripts provide an easy way to build in a modern ' +
    'JS environment and automatically assist in building block assets. ')
    .version('0.1.0')
    .option('--wp-scripts', 'enable integration with `@wordpress/scripts` package')
    .option('--no-wp-scripts', 'disable integration with `@wordpress/scripts` package')
    .option('-t, --template <name>', 'project template type name; allowed values: "standard", "es5", the name of an external npm package, or the path to a local directory', 'standard')
    .option('--variant <variant>', 'the variant of the template to use')
    .option('--wp-env', 'enable integration with `@wordpress/env` package')
    .option('--includes-dir <dir>', 'the path to the includes directory with backend logic')
    .option('--src-dir <dir>', 'the path to the src directory with client-side logic')
    .option('--namespace <value>', 'internal namespace for the plugin')
    .action(async () => {
    try {
        const pluginData = (0, get_plugin_data_1.getPluginData)();
        const pluginConfig = (0, get_plugin_config_1.getPluginConfig)();
        log.info(JSON.stringify(pluginData));
        log.info(JSON.stringify(pluginConfig));
    }
    catch (error) {
        if (error instanceof cli_error_1.default) {
            log.error(error.message);
            process.exit(1);
        }
        else {
            throw error;
        }
    }
})
    .on('--help', () => {
    log.info('');
    log.info('Examples:');
    log.info(`  $ ${commandName}`);
    log.info(`  $ ${commandName} todo-list`);
    log.info(`  $ ${commandName} todo-list --template es5 --title "TODO List"`);
})
    .parse(process.argv);
