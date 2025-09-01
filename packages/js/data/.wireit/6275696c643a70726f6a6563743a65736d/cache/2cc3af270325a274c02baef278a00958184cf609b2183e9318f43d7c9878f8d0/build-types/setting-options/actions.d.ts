import type { createRegistry } from '@wordpress/data';
import type { CurriedSelectorsOf } from '@wordpress/data/build-types/types';
import type CreateLocksActions from '@wordpress/core-data/build-types/locks/actions';
import type { Setting, SettingValue, SettingsGroup, APIError, SettingEdit, SettingsEditObject, SettingsState } from './types';
import { store } from './';
type WPDataRegistry = ReturnType<typeof createRegistry>;
type CurriedState<F> = F extends (state: SettingsState, ...args: infer P) => infer R ? (...args: P) => R : F;
type Resolvers = typeof import('./resolvers');
export type ThunkArgs = {
    select: CurriedSelectorsOf<typeof store>;
    resolveSelect: CurriedState<Resolvers>;
    dispatch: ActionDispatchersForThunk;
    registry: WPDataRegistry;
};
/**
 * Action creator for receiving groups.
 *
 * @param groups - The groups to receive.
 * @return The action object.
 */
export declare const receiveGroups: (groups: SettingsGroup[]) => {
    type: "RECEIVE_GROUPS";
    groups: SettingsGroup[];
};
/**
 * Action creator for receiving settings.
 *
 * @param groupId  - The group ID.
 * @param settings - The settings to receive.
 * @return The action object.
 */
export declare const receiveSettings: (groupId: string, settings: Setting[]) => {
    type: "RECEIVE_SETTINGS";
    groupId: string;
    settings: Setting[];
};
/**
 * Action creator for editing a setting.
 *
 * @param groupId   - The settings group ID
 * @param settingId - The setting ID
 * @param value     - The new setting value
 */
declare const createEditSettingAction: (groupId: string, settingId: string, value: SettingValue) => {
    type: "EDIT_SETTING";
    groupId: string;
    settingId: string;
    value: unknown;
};
/**
 * Updates a single setting value.
 *
 * @param groupId   - The settings group ID
 * @param settingId - The setting ID
 * @param value     - The new setting value
 */
export declare const editSetting: (groupId: string, settingId: string, value: SettingValue) => ({ resolveSelect, dispatch }: ThunkArgs) => Promise<void>;
/**
 * Action creator for editing multiple settings.
 *
 * @param groupId - The settings group ID
 * @param updates - Array of setting updates or object with setting IDs as keys and values as values
 */
declare const createEditSettingsAction: (groupId: string, updates: SettingEdit[]) => {
    type: "EDIT_SETTINGS";
    groupId: string;
    updates: SettingEdit[];
};
/**
 * Updates multiple settings at once.
 *
 * @param groupId - The settings group ID
 * @param updates - Array of setting updates or object with setting IDs as keys and values as values
 */
export declare const editSettings: (groupId: string, updates: SettingEdit[] | SettingsEditObject) => ({ resolveSelect, dispatch }: ThunkArgs) => Promise<void>;
/**
 * Action creator for setting the saving state.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @param isSaving  - Whether the setting is saving.
 * @return The action object.
 */
export declare const setSaving: (groupId: string, settingId: string | null, isSaving: boolean) => {
    type: "SET_SAVING";
    groupId: string;
    settingId: string | null;
    isSaving: boolean;
};
/**
 * Action creator for setting the error state.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @param error     - The error to set.
 * @return The action object.
 */
export declare const setError: (groupId: string, settingId: string | null, error: unknown) => {
    type: "SET_ERROR";
    groupId: string;
    settingId: string | null;
    error: unknown;
};
/**
 * Action creator for reverting a setting.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @return The action object.
 */
export declare const revertEditedSetting: (groupId: string, settingId: string) => {
    type: "REVERT_EDITED_SETTING";
    groupId: string;
    settingId: string;
};
/**
 * Action creator for reverting a group.
 *
 * @param groupId - The group ID.
 * @return The action object.
 */
export declare const revertEditedSettingsGroup: (groupId: string) => {
    type: "REVERT_EDITED_SETTINGS_GROUP";
    groupId: string;
};
/**
 * Saves multiple settings at once for a group.
 *
 * @param groupId - The settings group ID
 * @param updates - Array of setting updates or object with setting IDs as keys and values as values
 * @return The action object.
 */
export declare const saveSettingsGroup: (groupId: string, updates: SettingEdit[] | SettingsEditObject) => ({ dispatch }: ThunkArgs) => Promise<{
    update: (Setting | {
        id: string;
        error: APIError;
    })[];
}>;
/**
 * Saves a single setting.
 *
 * @param groupId   - The group ID
 * @param settingId - The setting ID
 * @param value     - The value to save
 * @return The action object
 */
export declare const saveSetting: (groupId: string, settingId: string, value: SettingValue) => ({ dispatch }: ThunkArgs) => Promise<Setting>;
/**
 * Action creator for saving edited settings in a group.
 *
 * @param groupId - The group ID.
 * @return The action object.
 */
export declare const saveEditedSettingsGroup: (groupId: string) => ({ select, dispatch }: ThunkArgs) => Promise<{
    update: (Setting | {
        id: string;
        error: APIError;
    })[];
} | undefined>;
/**
 * Action creator for saving an edited setting.
 *
 * @param groupId   - The group ID.
 * @param settingId - The setting ID.
 * @return The action object.
 */
export declare const saveEditedSetting: (groupId: string, settingId: string) => ({ select, dispatch }: ThunkArgs) => Promise<Setting | undefined>;
export declare const __unstableAcquireStoreLock: (store: any, path: any, { exclusive }: {
    exclusive: any;
}) => () => Promise<any>;
export declare const __unstableReleaseStoreLock: (lock: any) => () => void;
export type Actions = ReturnType<typeof receiveGroups | typeof receiveSettings | typeof setSaving | typeof setError | typeof revertEditedSetting | typeof revertEditedSettingsGroup | typeof createEditSettingAction | typeof createEditSettingsAction>;
export type ActionDispatchersForThunk = {
    receiveGroups: typeof receiveGroups;
    receiveSettings: typeof receiveSettings;
    setSaving: typeof setSaving;
    setError: typeof setError;
    revertEditedSetting: typeof revertEditedSetting;
    revertEditedSettingsGroup: typeof revertEditedSettingsGroup;
    editSetting: typeof editSetting;
    editSettings: typeof editSettings;
    saveEditedSetting: typeof saveEditedSetting;
    saveEditedSettingsGroup: typeof saveEditedSettingsGroup;
    saveSetting: typeof saveSetting;
    saveSettingsGroup: typeof saveSettingsGroup;
    <T = Record<string, unknown>>(args: T): void;
} & ReturnType<typeof CreateLocksActions>;
export {};
//# sourceMappingURL=actions.d.ts.map