"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasEditsForGroup = exports.getSettingError = exports.getGroupError = exports.isSettingSaving = exports.isGroupSaving = exports.getEditedSettingIds = exports.isSettingEdited = exports.getSettingValue = exports.getSetting = exports.getSettings = exports.getGroup = exports.getGroups = void 0;
/**
 * External dependencies
 */
const rememo_1 = __importDefault(require("rememo"));
/**
 * Get all groups.
 *
 * @param {SettingsState} state - The current state of the settings.
 * @return {SettingsGroup[]} The list of all groups.
 */
const getGroups = (state) => state.groups;
exports.getGroups = getGroups;
/**
 * Get a specific group by ID.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to get.
 * @return {SettingsGroup | undefined} The group if found, otherwise undefined.
 */
const getGroup = (state, groupId) => state.groups.find((group) => group.id === groupId);
exports.getGroup = getGroup;
// Ensure we have a consistent empty object to return when there are no settings.
const EMPTY_OBJECT = {};
/**
 * Get all settings for a specific group.
 *
 * @param {SettingsState}   state   - The current state of the settings.
 * @param {string}          groupId - The ID of the group to get settings for.
 * @param {SelectorOptions} options - Options for the selector.
 * @return {Record<string, Setting>} The settings for the specified group.
 */
exports.getSettings = (0, rememo_1.default)((state, groupId, options = { includeEdits: false }) => {
    const groupSettings = state.settings[groupId];
    if (!groupSettings) {
        return EMPTY_OBJECT;
    }
    // If we don't want edits, return original settings
    if (options.includeEdits === false) {
        return groupSettings;
    }
    const groupEdits = state.edits[groupId];
    if (!groupEdits) {
        return groupSettings;
    }
    // Create a new object with all settings, applying edits where they exist
    return Object.keys(groupSettings).reduce((result, settingId) => {
        const setting = groupSettings[settingId];
        // If this setting has an edit, apply it
        if (settingId in groupEdits) {
            result[settingId] = {
                ...setting,
                value: groupEdits[settingId],
            };
        }
        else {
            result[settingId] = setting;
        }
        return result;
    }, {});
}, (state, groupId, options = { includeEdits: false }) => [
    state.settings[groupId],
    state.edits[groupId],
    options.includeEdits,
]);
/**
 * Get a specific setting by ID.
 *
 * @param {SettingsState}   state     - The current state of the settings.
 * @param {string}          groupId   - The ID of the group to get settings for.
 * @param {string}          settingId - The ID of the setting to get.
 * @param {SelectorOptions} options   - Options for the selector.
 * @return {Setting | undefined} The setting if found, otherwise undefined.
 */
exports.getSetting = (0, rememo_1.default)((state, groupId, settingId, options = { includeEdits: false }) => {
    const groupSettings = state.settings[groupId];
    if (!groupSettings) {
        return undefined;
    }
    const setting = groupSettings[settingId];
    if (!setting) {
        return undefined;
    }
    // If we don't want edits, return original setting
    if (options.includeEdits === false) {
        return setting;
    }
    // If the setting is being edited, return the setting with the edited value
    const groupEdits = state.edits[groupId];
    if (groupEdits && settingId in groupEdits) {
        return {
            ...setting,
            value: groupEdits[settingId],
        };
    }
    return setting;
}, (state, groupId, settingId, options = { includeEdits: false }) => [
    state.settings[groupId]?.[settingId],
    state.edits[groupId]?.[settingId],
    options.includeEdits,
]);
/**
 * Get the value of a specific setting.
 *
 * @param {SettingsState}   state     - The current state of the settings.
 * @param {string}          groupId   - The ID of the group to get settings for.
 * @param {string}          settingId - The ID of the setting to get.
 * @param {SelectorOptions} options   - Options for the selector.
 * @return {SettingValue | undefined} The value of the setting if found, otherwise undefined.
 */
const getSettingValue = (state, groupId, settingId, options = { includeEdits: false }) => {
    // If we want edits and they exist, return the edited value
    if (options.includeEdits !== false) {
        const groupEdits = state.edits[groupId];
        if (groupEdits && settingId in groupEdits) {
            return groupEdits[settingId];
        }
    }
    // Otherwise return the original value
    const groupSettings = state.settings[groupId];
    if (!groupSettings) {
        return undefined;
    }
    return groupSettings[settingId]?.value;
};
exports.getSettingValue = getSettingValue;
/**
 * Check if a specific setting has been edited.
 *
 * @param {SettingsState} state     - The current state of the settings.
 * @param {string}        groupId   - The ID of the group to get settings for.
 * @param {string}        settingId - The ID of the setting to check.
 */
const isSettingEdited = (state, groupId, settingId) => {
    const groupEdits = state.edits[groupId];
    return !!groupEdits && settingId in groupEdits;
};
exports.isSettingEdited = isSettingEdited;
/**
 * Get all edited setting IDs for a specific group.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to get settings for.
 */
exports.getEditedSettingIds = (0, rememo_1.default)((state, groupId) => {
    const groupEdits = state.edits[groupId];
    if (!groupEdits) {
        return [];
    }
    return Object.keys(groupEdits);
}, (state, groupId) => [state.edits[groupId]]);
/**
 * Check if a specific group is currently being saved.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to check.
 */
const isGroupSaving = (state, groupId) => !!state.isSaving.groups?.[groupId];
exports.isGroupSaving = isGroupSaving;
/**
 * Check if a specific setting is currently being saved.
 *
 * @param {SettingsState} state     - The current state of the settings.
 * @param {string}        groupId   - The ID of the group to check.
 * @param {string}        settingId - The ID of the setting to check.
 */
const isSettingSaving = (state, groupId, settingId) => {
    const groupSaving = state.isSaving.settings?.[groupId];
    return !!groupSaving && !!groupSaving[settingId];
};
exports.isSettingSaving = isSettingSaving;
/**
 * Get the error for a specific group.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to get the error for.
 */
const getGroupError = (state, groupId) => state.errors[groupId];
exports.getGroupError = getGroupError;
/**
 * Get the error for a specific setting.
 *
 * @param {SettingsState} state     - The current state of the settings.
 * @param {string}        groupId   - The ID of the group to get the error for.
 * @param {string}        settingId - The ID of the setting to get the error for.
 */
const getSettingError = (state, groupId, settingId) => {
    const groupErrors = state.errors[groupId];
    if (!groupErrors) {
        return undefined;
    }
    return groupErrors[settingId];
};
exports.getSettingError = getSettingError;
/**
 * Check if a specific group has any edits.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to check.
 */
const hasEditsForGroup = (state, groupId) => {
    const groupEdits = state.edits[groupId];
    return !!groupEdits && Object.keys(groupEdits).length > 0;
};
exports.hasEditsForGroup = hasEditsForGroup;
