"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettingValue = exports.getSetting = exports.getSettings = exports.getGroups = void 0;
/**
 * External dependencies
 */
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
/**
 * Internal dependencies
 */
const actions_1 = require("./actions");
const constants_1 = require("../constants");
const _1 = require("./");
/**
 * Resolver for the getGroups selector. Fetches all available settings groups.
 */
const getGroups = () => async ({ dispatch }) => {
    try {
        const groups = await (0, api_fetch_1.default)({
            path: '/wc/v3/settings',
        });
        dispatch((0, actions_1.receiveGroups)(groups));
        return groups;
    }
    catch (error) {
        throw error;
    }
};
exports.getGroups = getGroups;
/**
 * Resolver for the getSettings selector. Fetches settings for a specific group.
 */
const getSettings = (groupId) => async ({ dispatch }) => {
    const lock = await dispatch.__unstableAcquireStoreLock(_1.STORE_NAME, ['settings', groupId], { exclusive: false });
    try {
        const settings = await (0, api_fetch_1.default)({
            path: `${constants_1.NAMESPACE}/settings/${groupId}`,
        });
        dispatch((0, actions_1.receiveSettings)(groupId, settings));
        return settings;
    }
    catch (error) {
        dispatch((0, actions_1.setError)(groupId, null, error instanceof Error
            ? error
            : new Error(String(error))));
        throw error;
    }
    finally {
        dispatch.__unstableReleaseStoreLock(lock);
    }
};
exports.getSettings = getSettings;
/**
 * Resolver for the getSetting selector. Fetches a specific setting.
 */
const getSetting = (groupId, settingId) => async ({ dispatch }) => {
    const lock = await dispatch.__unstableAcquireStoreLock(_1.STORE_NAME, ['settings', groupId, settingId], { exclusive: false });
    try {
        const setting = await (0, api_fetch_1.default)({
            path: `${constants_1.NAMESPACE}/settings/${groupId}/${settingId}`,
        });
        dispatch((0, actions_1.receiveSettings)(groupId, [setting]));
        return setting;
    }
    catch (error) {
        dispatch((0, actions_1.setError)(groupId, settingId, error instanceof Error
            ? error
            : new Error(String(error))));
        throw error;
    }
    finally {
        dispatch.__unstableReleaseStoreLock(lock);
    }
};
exports.getSetting = getSetting;
/**
 * Resolver for the getSettingValue selector. Triggers getSetting resolver.
 *
 * @param groupId   - The settings group ID
 * @param settingId - The setting ID
 */
const getSettingValue = (groupId, settingId) => async (args) => {
    const setting = await (0, exports.getSetting)(groupId, settingId)(args);
    return setting?.value;
};
exports.getSettingValue = getSettingValue;
