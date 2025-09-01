import { SettingsState, Settings } from './types';
export declare const getSettingsGroupNames: (state: SettingsState) => string[];
export declare const getSettings: (state: SettingsState, group: string) => Settings;
export declare const getDirtyKeys: (state: SettingsState, group: string) => string[];
export declare const getIsDirty: (state: SettingsState, group: string, keys?: string[]) => boolean;
export declare const getSettingsForGroup: (state: SettingsState, group: string, keys: string[]) => Settings;
export declare const isUpdateSettingsRequesting: (state: SettingsState, group: string) => boolean;
/**
 * Retrieves a setting value from the setting store.
 *
 * @param {Object}   state                   State param added by wp.data.
 * @param {string}   group                   The settings group.
 * @param {string}   name                    The identifier for the setting.
 * @param {*}        [fallback=false]        The value to use as a fallback
 *                                           if the setting is not in the
 *                                           state.
 * @param {Function} [filter=( val ) => val] A callback for filtering the
 *                                           value before it's returned.
 *                                           Receives both the found value
 *                                           (if it exists for the key) and
 *                                           the provided fallback arg.
 *
 * @return {*}  The value present in the settings state for the given
 *                   name.
 */
export declare function getSetting(state: SettingsState, group: string, name: string, fallback?: boolean, filter?: (val: unknown, _fallback: unknown | boolean) => unknown): unknown;
export declare const getLastSettingsErrorForGroup: (state: SettingsState, group: string) => any;
export declare const getSettingsError: (state: SettingsState, group: string, id: string) => {};
//# sourceMappingURL=selectors.d.ts.map