/**
 * Internal dependencies
 */
import type { SettingsState, SettingsGroup, Setting, SettingValue } from './types';
type SelectorOptions = {
    /**
     * Whether to include edits in the returned value.
     *
     * @default false
     */
    includeEdits?: boolean;
};
/**
 * Get all groups.
 *
 * @param {SettingsState} state - The current state of the settings.
 * @return {SettingsGroup[]} The list of all groups.
 */
export declare const getGroups: (state: SettingsState) => SettingsGroup[];
/**
 * Get a specific group by ID.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to get.
 * @return {SettingsGroup | undefined} The group if found, otherwise undefined.
 */
export declare const getGroup: (state: SettingsState, groupId: string) => SettingsGroup | undefined;
/**
 * Get all settings for a specific group.
 *
 * @param {SettingsState}   state   - The current state of the settings.
 * @param {string}          groupId - The ID of the group to get settings for.
 * @param {SelectorOptions} options - Options for the selector.
 * @return {Record<string, Setting>} The settings for the specified group.
 */
export declare const getSettings: ((state: SettingsState, groupId: string, options?: SelectorOptions) => Record<string, Setting>) & import("rememo").EnhancedSelector;
/**
 * Get a specific setting by ID.
 *
 * @param {SettingsState}   state     - The current state of the settings.
 * @param {string}          groupId   - The ID of the group to get settings for.
 * @param {string}          settingId - The ID of the setting to get.
 * @param {SelectorOptions} options   - Options for the selector.
 * @return {Setting | undefined} The setting if found, otherwise undefined.
 */
export declare const getSetting: ((state: SettingsState, groupId: string, settingId: string, options?: SelectorOptions) => Setting | undefined) & import("rememo").EnhancedSelector;
/**
 * Get the value of a specific setting.
 *
 * @param {SettingsState}   state     - The current state of the settings.
 * @param {string}          groupId   - The ID of the group to get settings for.
 * @param {string}          settingId - The ID of the setting to get.
 * @param {SelectorOptions} options   - Options for the selector.
 * @return {SettingValue | undefined} The value of the setting if found, otherwise undefined.
 */
export declare const getSettingValue: (state: SettingsState, groupId: string, settingId: string, options?: SelectorOptions) => SettingValue | undefined;
/**
 * Check if a specific setting has been edited.
 *
 * @param {SettingsState} state     - The current state of the settings.
 * @param {string}        groupId   - The ID of the group to get settings for.
 * @param {string}        settingId - The ID of the setting to check.
 */
export declare const isSettingEdited: (state: SettingsState, groupId: string, settingId: string) => boolean;
/**
 * Get all edited setting IDs for a specific group.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to get settings for.
 */
export declare const getEditedSettingIds: ((state: SettingsState, groupId: string) => string[]) & import("rememo").EnhancedSelector;
/**
 * Check if a specific group is currently being saved.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to check.
 */
export declare const isGroupSaving: (state: SettingsState, groupId: string) => boolean;
/**
 * Check if a specific setting is currently being saved.
 *
 * @param {SettingsState} state     - The current state of the settings.
 * @param {string}        groupId   - The ID of the group to check.
 * @param {string}        settingId - The ID of the setting to check.
 */
export declare const isSettingSaving: (state: SettingsState, groupId: string, settingId: string) => boolean;
/**
 * Get the error for a specific group.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to get the error for.
 */
export declare const getGroupError: (state: SettingsState, groupId: string) => Record<string, unknown> | undefined;
/**
 * Get the error for a specific setting.
 *
 * @param {SettingsState} state     - The current state of the settings.
 * @param {string}        groupId   - The ID of the group to get the error for.
 * @param {string}        settingId - The ID of the setting to get the error for.
 */
export declare const getSettingError: (state: SettingsState, groupId: string, settingId: string) => unknown;
/**
 * Check if a specific group has any edits.
 *
 * @param {SettingsState} state   - The current state of the settings.
 * @param {string}        groupId - The ID of the group to check.
 */
export declare const hasEditsForGroup: (state: SettingsState, groupId: string) => boolean;
export {};
//# sourceMappingURL=selectors.d.ts.map