"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__unstableReleaseStoreLock = exports.__unstableAcquireStoreLock = exports.saveEditedSetting = exports.saveEditedSettingsGroup = exports.saveSetting = exports.saveSettingsGroup = exports.revertEditedSettingsGroup = exports.revertEditedSetting = exports.setError = exports.setSaving = exports.editSettings = exports.editSetting = exports.receiveSettings = exports.receiveGroups = void 0;
/**
 * External dependencies
 */
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
// @ts-expect-error WP core data doesn't explicitly export the actions
// eslint-disable-next-line @fincommerce/dependency-group
const actions_1 = __importDefault(require("@wordpress/core-data/build/locks/actions"));
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
const constants_1 = require("../constants");
const _1 = require("./");
/**
 * Action creator for receiving groups.
 *
 * @param groups - The groups to receive.
 * @return The action object.
 */
const receiveGroups = (groups) => ({
    type: action_types_1.TYPES.RECEIVE_GROUPS,
    groups,
});
exports.receiveGroups = receiveGroups;
/**
 * Action creator for receiving settings.
 *
 * @param groupId  - The group ID.
 * @param settings - The settings to receive.
 * @return The action object.
 */
const receiveSettings = (groupId, settings) => ({
    type: action_types_1.TYPES.RECEIVE_SETTINGS,
    groupId,
    settings,
});
exports.receiveSettings = receiveSettings;
/**
 * Action creator for editing a setting.
 *
 * @param groupId   - The settings group ID
 * @param settingId - The setting ID
 * @param value     - The new setting value
 */
const createEditSettingAction = (groupId, settingId, value) => ({
    type: action_types_1.TYPES.EDIT_SETTING,
    groupId,
    settingId,
    value,
});
/**
 * Updates a single setting value.
 *
 * @param groupId   - The settings group ID
 * @param settingId - The setting ID
 * @param value     - The new setting value
 */
const editSetting = (groupId, settingId, value) => async ({ resolveSelect, dispatch }) => {
    // Ensure setting is fetched before editing
    await resolveSelect.getSettingValue(groupId, settingId);
    dispatch(createEditSettingAction(groupId, settingId, value));
};
exports.editSetting = editSetting;
/**
 * Action creator for editing multiple settings.
 *
 * @param groupId - The settings group ID
 * @param updates - Array of setting updates or object with setting IDs as keys and values as values
 */
const createEditSettingsAction = (groupId, updates) => ({
    type: action_types_1.TYPES.EDIT_SETTINGS,
    groupId,
    updates,
});
/**
 * Validates a setting edit.
 *
 * @param edit - The setting edit to validate.
 * @return Whether the setting edit is valid.
 */
const validateSettingEdit = (edit) => {
    return (typeof edit.id === 'string' &&
        edit.id.length > 0 &&
        edit.value !== undefined);
};
/**
 * Updates multiple settings at once.
 *
 * @param groupId - The settings group ID
 * @param updates - Array of setting updates or object with setting IDs as keys and values as values
 */
const editSettings = (groupId, updates) => async ({ resolveSelect, dispatch }) => {
    // Ensure settings are fetched before editing
    await resolveSelect.getSettings(groupId);
    // Convert object format to array format if needed
    const updatesArray = Array.isArray(updates)
        ? updates
        : Object.entries(updates).map(([id, value]) => ({
            id,
            value,
        }));
    if (!updatesArray.every(validateSettingEdit)) {
        throw new Error('Invalid setting edit payload');
    }
    dispatch(createEditSettingsAction(groupId, updatesArray));
};
exports.editSettings = editSettings;
/**
 * Action creator for setting the saving state.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @param isSaving  - Whether the setting is saving.
 * @return The action object.
 */
const setSaving = (groupId, settingId, isSaving) => ({
    type: action_types_1.TYPES.SET_SAVING,
    groupId,
    settingId,
    isSaving,
});
exports.setSaving = setSaving;
/**
 * Action creator for setting the error state.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @param error     - The error to set.
 * @return The action object.
 */
const setError = (groupId, settingId, error) => ({
    type: action_types_1.TYPES.SET_ERROR,
    groupId,
    settingId,
    error,
});
exports.setError = setError;
/**
 * Action creator for reverting a setting.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @return The action object.
 */
const revertEditedSetting = (groupId, settingId) => ({
    type: action_types_1.TYPES.REVERT_EDITED_SETTING,
    groupId,
    settingId,
});
exports.revertEditedSetting = revertEditedSetting;
/**
 * Action creator for reverting a group.
 *
 * @param groupId - The group ID.
 * @return The action object.
 */
const revertEditedSettingsGroup = (groupId) => ({
    type: action_types_1.TYPES.REVERT_EDITED_SETTINGS_GROUP,
    groupId,
});
exports.revertEditedSettingsGroup = revertEditedSettingsGroup;
/**
 * Internal helper to save a single setting.
 */
const saveSettingRequest = async (groupId, settingId, value, dispatch) => {
    const lock = await dispatch.__unstableAcquireStoreLock(_1.STORE_NAME, ['settings', groupId, settingId], { exclusive: true });
    dispatch((0, exports.setSaving)(groupId, settingId, true));
    try {
        const result = await (0, api_fetch_1.default)({
            path: `${constants_1.NAMESPACE}/settings/${groupId}/${settingId}`,
            method: 'PUT',
            data: { value },
        });
        dispatch((0, exports.receiveSettings)(groupId, [result]));
        return result;
    }
    catch (error) {
        dispatch((0, exports.setError)(groupId, settingId, error));
        throw error;
    }
    finally {
        dispatch((0, exports.setSaving)(groupId, settingId, false));
        dispatch.__unstableReleaseStoreLock(lock);
    }
};
/**
 * Internal helper to save multiple settings.
 */
const saveSettingsGroupRequest = async (groupId, updates, dispatch) => {
    const lock = await dispatch.__unstableAcquireStoreLock(_1.STORE_NAME, ['settings', groupId], { exclusive: true });
    dispatch((0, exports.setSaving)(groupId, null, true));
    try {
        const results = await (0, api_fetch_1.default)({
            path: `${constants_1.NAMESPACE}/settings/${groupId}/batch`,
            method: 'POST',
            data: { update: updates },
        });
        // Handle individual setting errors in a 200 response
        const successfulUpdates = [];
        const errors = [];
        results.update.forEach((result) => {
            if ('error' in result &&
                result.error &&
                typeof result.error === 'object') {
                // If the result has an error, collect it
                errors.push({
                    id: result.id,
                    error: result.error,
                });
                dispatch((0, exports.setError)(groupId, result.id, result.error));
            }
            else {
                // If no error, add to successful updates
                successfulUpdates.push(result);
            }
        });
        // Only update settings that were successfully changed
        if (successfulUpdates.length > 0) {
            dispatch((0, exports.receiveSettings)(groupId, successfulUpdates));
        }
        // If there were any errors, throw an error with details
        if (errors.length > 0) {
            const error = new Error('Failed to update some settings');
            error.settingErrors = errors;
            throw error;
        }
        return results;
    }
    catch (error) {
        const partialError = error instanceof Error && 'settingErrors' in error;
        // All settings failed to update, set the error for the entire group
        if (!partialError) {
            dispatch((0, exports.setError)(groupId, null, error));
        }
        throw error;
    }
    finally {
        dispatch((0, exports.setSaving)(groupId, null, false));
        dispatch.__unstableReleaseStoreLock(lock);
    }
};
/**
 * Saves multiple settings at once for a group.
 *
 * @param groupId - The settings group ID
 * @param updates - Array of setting updates or object with setting IDs as keys and values as values
 * @return The action object.
 */
const saveSettingsGroup = (groupId, updates) => async ({ dispatch }) => {
    const updatesArray = Array.isArray(updates)
        ? updates
        : Object.entries(updates).map(([id, value]) => ({
            id,
            value,
        }));
    return saveSettingsGroupRequest(groupId, updatesArray, dispatch);
};
exports.saveSettingsGroup = saveSettingsGroup;
/**
 * Saves a single setting.
 *
 * @param groupId   - The group ID
 * @param settingId - The setting ID
 * @param value     - The value to save
 * @return The action object
 */
const saveSetting = (groupId, settingId, value) => async ({ dispatch }) => {
    return saveSettingRequest(groupId, settingId, value, dispatch);
};
exports.saveSetting = saveSetting;
/**
 * Action creator for saving edited settings in a group.
 *
 * @param groupId - The group ID.
 * @return The action object.
 */
const saveEditedSettingsGroup = (groupId) => async ({ select, dispatch }) => {
    const editedSettings = select
        .getEditedSettingIds(groupId)
        .map((settingId) => ({
        id: settingId,
        value: select.getSettingValue(groupId, settingId, {
            includeEdits: true,
        }),
    }));
    if (editedSettings.length === 0) {
        // If there are no edited settings, don't make an API call.
        return;
    }
    return saveSettingsGroupRequest(groupId, editedSettings, dispatch);
};
exports.saveEditedSettingsGroup = saveEditedSettingsGroup;
/**
 * Action creator for saving an edited setting.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @return The action object.
 */
const saveEditedSetting = (groupId, settingId) => async ({ select, dispatch }) => {
    // Check if this setting has any edits
    const editedSettingIds = select.getEditedSettingIds(groupId);
    if (!editedSettingIds.includes(settingId)) {
        return;
    }
    const value = select.getSettingValue(groupId, settingId, {
        includeEdits: true,
    });
    return saveSettingRequest(groupId, settingId, value, dispatch);
};
exports.saveEditedSetting = saveEditedSetting;
const lockActions = (0, actions_1.default)();
exports.__unstableAcquireStoreLock = lockActions.__unstableAcquireStoreLock;
exports.__unstableReleaseStoreLock = lockActions.__unstableReleaseStoreLock;
