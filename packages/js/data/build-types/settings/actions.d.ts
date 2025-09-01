/**
 * External dependencies
 */
import { DispatchFromMap } from '@automattic/data-stores';
import { Settings } from './types';
export declare function updateSettingsForGroup(group: string, data: Settings, time?: Date): {
    type: "UPDATE_SETTINGS_FOR_GROUP";
    group: string;
    data: Settings;
    time: Date;
};
export declare function updateErrorForGroup(group: string, data: Settings | null, error: unknown, time?: Date): {
    type: "UPDATE_ERROR_FOR_GROUP";
    group: string;
    data: Settings | null;
    error: unknown;
    time: Date;
};
export declare function setIsRequesting(group: string, isRequesting: boolean): {
    type: "SET_IS_REQUESTING";
    group: string;
    isRequesting: boolean;
};
export declare function clearIsDirty(group: string): {
    type: "CLEAR_IS_DIRTY";
    group: string;
};
export declare function persistSettingsForGroup(group: string): Generator<Object, void, string[] & {
    [key: string]: Record<string, unknown>;
}>;
export declare function updateAndPersistSettingsForGroup(group: string, data: Settings): Generator<Object, void, string[] & {
    [key: string]: Record<string, unknown>;
}>;
export declare function clearSettings(): {
    type: "CLEAR_SETTINGS";
};
export type Actions = ReturnType<typeof updateSettingsForGroup | typeof updateErrorForGroup | typeof setIsRequesting | typeof clearIsDirty | typeof clearSettings>;
export type ActionDispatchers = DispatchFromMap<{
    createProduct: typeof persistSettingsForGroup;
    updateProduct: typeof updateAndPersistSettingsForGroup;
}>;
//# sourceMappingURL=actions.d.ts.map