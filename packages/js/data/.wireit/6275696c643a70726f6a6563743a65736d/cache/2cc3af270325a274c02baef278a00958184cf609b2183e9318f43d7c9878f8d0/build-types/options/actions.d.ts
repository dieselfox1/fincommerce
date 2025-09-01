import { Options } from './types';
export declare function receiveOptions(options: Options): {
    type: "RECEIVE_OPTIONS";
    options: Options;
};
export declare function setRequestingError(error: unknown, name: string): {
    type: "SET_REQUESTING_ERROR";
    error: unknown;
    name: string;
};
export declare function setUpdatingError(error: unknown): {
    type: "SET_UPDATING_ERROR";
    error: unknown;
};
export declare function setIsUpdating(isUpdating: boolean): {
    type: "SET_IS_UPDATING";
    isUpdating: boolean;
};
export declare function updateOptions(data: Options): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "RECEIVE_OPTIONS";
    options: Options;
} | {
    type: "SET_UPDATING_ERROR";
    error: unknown;
} | {
    type: "SET_IS_UPDATING";
    isUpdating: boolean;
}, {
    success: boolean;
}, unknown>;
export type Action = ReturnType<typeof receiveOptions | typeof setRequestingError | typeof setUpdatingError | typeof setIsUpdating>;
//# sourceMappingURL=actions.d.ts.map