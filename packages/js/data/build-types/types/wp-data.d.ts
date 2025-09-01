export type WPDataSelectors = {
    getIsResolving: (selector: string, args?: unknown[]) => boolean;
    hasStartedResolution: (selector: string, args?: unknown[]) => boolean;
    hasFinishedResolution: (selector: string, args?: unknown[]) => boolean;
    isResolving: (selector: string, args?: unknown[]) => boolean;
    getCachedResolvers: () => unknown;
};
export type WPDataActions = {
    startResolution: (selector: string, args?: unknown[]) => void;
    finishResolution: (selector: string, args?: unknown[]) => void;
    invalidateResolution: (selector: string, args?: unknown[]) => void;
    invalidateResolutionForStore: (selector: string) => void;
    invalidateResolutionForStoreSelector: (selector: string) => void;
};
export type WPDataSelector<T> = T extends (state: infer S, ...args: infer A) => infer R ? (...args: A) => R : T;
export type WPError<ErrorKey extends string = string, ErrorData = unknown> = {
    errors: Record<ErrorKey, string[]>;
    error_data?: Record<ErrorKey, ErrorData>;
    additional_data?: Record<ErrorKey, ErrorData[]>;
};
//# sourceMappingURL=wp-data.d.ts.map