import type { Setting, SettingsGroup } from './types';
import type { ThunkArgs } from './actions';
/**
 * Resolver for the getGroups selector. Fetches all available settings groups.
 */
export declare const getGroups: () => ({ dispatch }: ThunkArgs) => Promise<SettingsGroup[]>;
/**
 * Resolver for the getSettings selector. Fetches settings for a specific group.
 */
export declare const getSettings: (groupId: string) => ({ dispatch }: ThunkArgs) => Promise<Setting[]>;
/**
 * Resolver for the getSetting selector. Fetches a specific setting.
 */
export declare const getSetting: (groupId: string, settingId: string) => ({ dispatch }: ThunkArgs) => Promise<Setting>;
/**
 * Resolver for the getSettingValue selector. Triggers getSetting resolver.
 *
 * @param groupId   - The settings group ID
 * @param settingId - The setting ID
 */
export declare const getSettingValue: (groupId: string, settingId: string) => (args: ThunkArgs) => Promise<unknown>;
//# sourceMappingURL=resolvers.d.ts.map