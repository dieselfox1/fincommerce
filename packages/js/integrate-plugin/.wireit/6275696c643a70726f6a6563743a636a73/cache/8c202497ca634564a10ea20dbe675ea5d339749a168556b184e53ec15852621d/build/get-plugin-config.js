"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = exports.getPluginConfig = void 0;
exports.getUniqueItems = getUniqueItems;
/**
 * External dependencies
 */
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Internal dependencies
 */
const log_1 = require("./log");
const { writeFile } = fs_1.promises;
function getUniqueItems(arr) {
    const uniqueObject = arr.reduce((unique, item) => {
        unique[item] = true;
        return unique;
    }, {});
    return Object.keys(uniqueObject);
}
const getPluginConfig = () => {
    const cwd = (0, path_1.join)(process.cwd());
    if (!(0, fs_1.existsSync)((0, path_1.join)(cwd, '.woo-plugin.json'))) {
        return {};
    }
    return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(cwd, '.woo-plugin.json'), 'utf8'));
};
exports.getPluginConfig = getPluginConfig;
const updateConfig = async ({ modules }) => {
    const cwd = (0, path_1.join)(process.cwd());
    const config = getPluginConfig();
    const uniqueModules = modules.reduce((unique, module) => {
        unique[module] = true;
        return unique;
    }, {});
    config.modules = Object.keys(uniqueModules);
    (0, log_1.info)('');
    (0, log_1.info)('Updating plugin config file.');
    await writeFile((0, path_1.join)(cwd, '.woo-plugin.json'), JSON.stringify(config, null, 4));
};
exports.updateConfig = updateConfig;
