"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STATE = void 0;
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
/**
 * The default state for the settings options store.
 */
exports.DEFAULT_STATE = {
    groups: [],
    settings: {},
    edits: {},
    isSaving: {
        groups: {},
        settings: {},
    },
    errors: {},
};
/**
 * Ensures a group exists in the given object. If the group doesn't exist,
 * it creates an empty object for that group.
 *
 * @param obj     - The object to ensure the group exists in (e.g., settings, edits, errors)
 * @param groupId - The group ID to ensure exists
 * @return The group object, either existing or newly created
 */
const ensureGroupExists = (obj, groupId) => {
    if (!obj[groupId]) {
        obj[groupId] = {};
    }
    return obj[groupId];
};
/**
 * Removes empty group objects to keep the state clean.
 * A group is considered empty when it has no properties.
 *
 * @param obj     - The object to clean up (e.g., edits, errors)
 * @param groupId - The group ID to check and potentially remove
 */
const cleanupEmptyGroups = (obj, groupId) => {
    const group = obj[groupId];
    if (group && Object.keys(group).length === 0) {
        delete obj[groupId];
    }
};
const reducer = (state = exports.DEFAULT_STATE, action) => {
    switch (action.type) {
        case action_types_1.TYPES.RECEIVE_GROUPS:
            return {
                ...state,
                groups: action.groups,
            };
        case action_types_1.TYPES.RECEIVE_SETTINGS: {
            const settings = { ...state.settings };
            const edits = { ...state.edits };
            const errors = { ...state.errors };
            const groupSettings = ensureGroupExists(settings, action.groupId);
            action.settings.forEach((setting) => {
                // Store the setting in its group
                groupSettings[setting.id] = setting;
                // Clean up any pending edits or errors for this setting
                [edits, errors].forEach((obj) => {
                    if (obj[action.groupId]) {
                        const groupObj = obj[action.groupId];
                        if (groupObj && setting.id in groupObj) {
                            delete groupObj[setting.id];
                        }
                    }
                });
            });
            // Remove empty groups from edits and errors
            [edits, errors].forEach((obj) => {
                cleanupEmptyGroups(obj, action.groupId);
            });
            return {
                ...state,
                settings,
                edits,
                errors,
            };
        }
        case action_types_1.TYPES.EDIT_SETTING: {
            const edits = { ...state.edits };
            const groupSettings = state.settings[action.groupId] || {};
            const currentValue = groupSettings[action.settingId]?.value;
            // Only store edit if the new value is different from the current value
            if (action.value !== currentValue) {
                // Create or update the edit
                const groupEdits = ensureGroupExists(edits, action.groupId);
                groupEdits[action.settingId] = action.value;
            }
            else if (edits[action.groupId]?.[action.settingId] !== undefined) {
                // Remove the edit if the value matches the original
                const groupEdits = edits[action.groupId];
                if (groupEdits) {
                    delete groupEdits[action.settingId];
                    cleanupEmptyGroups(edits, action.groupId);
                }
            }
            return {
                ...state,
                edits,
            };
        }
        case action_types_1.TYPES.EDIT_SETTINGS: {
            const edits = { ...state.edits };
            const groupSettings = state.settings[action.groupId] || {};
            const groupEdits = ensureGroupExists(edits, action.groupId);
            // Process each setting update in the batch
            action.updates.forEach((update) => {
                const currentValue = groupSettings[update.id]?.value;
                if (update.value !== currentValue) {
                    // Store edit if value changed
                    groupEdits[update.id] = update.value;
                }
                else {
                    // Remove edit if value matches original
                    delete groupEdits[update.id];
                }
            });
            cleanupEmptyGroups(edits, action.groupId);
            return {
                ...state,
                edits,
            };
        }
        case action_types_1.TYPES.SET_SAVING: {
            const isSaving = { ...state.isSaving };
            if (action.settingId === null) {
                // Set saving state for an entire group
                isSaving.groups[action.groupId] = action.isSaving;
            }
            else {
                // Set saving state for a specific setting
                const groupSavingState = ensureGroupExists(isSaving.settings, action.groupId);
                groupSavingState[action.settingId] = action.isSaving;
            }
            return {
                ...state,
                isSaving,
            };
        }
        case action_types_1.TYPES.SET_ERROR: {
            const errors = { ...state.errors };
            const groupErrors = ensureGroupExists(errors, action.groupId);
            if (action.settingId === null) {
                // Handle group-level errors
                if (action.error === null) {
                    delete errors[action.groupId];
                }
                else {
                    groupErrors.all = action.error;
                }
            }
            else if (action.error === null) {
                // Handle setting-level errors
                delete groupErrors[action.settingId];
                cleanupEmptyGroups(errors, action.groupId);
            }
            else {
                groupErrors[action.settingId] = action.error;
            }
            return {
                ...state,
                errors,
            };
        }
        case action_types_1.TYPES.REVERT_EDITED_SETTING: {
            const edits = { ...state.edits };
            const errors = { ...state.errors };
            // Remove the edit for the specified setting
            if (edits[action.groupId]) {
                const groupEdits = edits[action.groupId];
                if (groupEdits) {
                    delete groupEdits[action.settingId];
                    cleanupEmptyGroups(edits, action.groupId);
                }
            }
            // Clear any errors for the setting
            if (errors[action.groupId]) {
                const groupErrors = errors[action.groupId];
                if (groupErrors) {
                    delete groupErrors[action.settingId];
                    cleanupEmptyGroups(errors, action.groupId);
                }
            }
            return {
                ...state,
                edits,
                errors,
            };
        }
        case action_types_1.TYPES.REVERT_EDITED_SETTINGS_GROUP: {
            const edits = { ...state.edits };
            const errors = { ...state.errors };
            // Remove all edits and errors for the entire group
            delete edits[action.groupId];
            delete errors[action.groupId];
            return {
                ...state,
                edits,
                errors,
            };
        }
        default:
            return state;
    }
};
exports.default = reducer;
