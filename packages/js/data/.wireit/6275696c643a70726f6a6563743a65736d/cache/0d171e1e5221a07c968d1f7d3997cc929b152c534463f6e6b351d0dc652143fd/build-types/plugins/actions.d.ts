import { DispatchFromMap } from '@automattic/data-stores';
import { ACTION_TYPES as TYPES } from './action-types';
import { PaypalOnboardingStatus, SelectorKeysWithActions, RecommendedTypes, InstallPluginsResponse, ActivatePluginsResponse, PluginNames, JetpackConnectionDataResponse, Plugin } from './types';
export declare function updateActivePlugins(active: string[], replace?: boolean): {
    type: TYPES.UPDATE_ACTIVE_PLUGINS;
    active: string[];
    replace: boolean;
};
export declare function updateInstalledPlugins(installed: string[], replace?: boolean): {
    type: TYPES.UPDATE_INSTALLED_PLUGINS;
    installed: string[];
    replace?: boolean;
};
export declare function setIsRequesting(selector: SelectorKeysWithActions, isRequesting: boolean): {
    type: TYPES.SET_IS_REQUESTING;
    selector: SelectorKeysWithActions;
    isRequesting: boolean;
};
export declare function setError(selector: SelectorKeysWithActions, error: unknown): {
    type: TYPES.SET_ERROR;
    selector: SelectorKeysWithActions;
    error: unknown;
};
export declare function updateIsJetpackConnected(jetpackConnection: boolean): {
    type: TYPES.UPDATE_JETPACK_CONNECTION;
    jetpackConnection: boolean;
};
export declare function updateJetpackConnectionData(results: JetpackConnectionDataResponse): {
    type: TYPES.UPDATE_JETPACK_CONNECTION_DATA;
    results: JetpackConnectionDataResponse;
};
export declare function updateJetpackConnectUrl(redirectUrl: string, jetpackConnectUrl: string): {
    type: TYPES.UPDATE_JETPACK_CONNECT_URL;
    jetpackConnectUrl: string;
    redirectUrl: string;
};
export declare const createErrorNotice: (errorMessage: string) => {
    type: "CREATE_NOTICE";
    [key: string]: unknown;
};
export declare function setPaypalOnboardingStatus(status: Partial<PaypalOnboardingStatus>): {
    type: TYPES.SET_PAYPAL_ONBOARDING_STATUS;
    paypalOnboardingStatus: Partial<PaypalOnboardingStatus>;
};
export declare function setRecommendedPlugins(type: string, plugins: Plugin[]): {
    type: TYPES.SET_RECOMMENDED_PLUGINS;
    recommendedType: string;
    plugins: Plugin[];
};
export declare function installPlugins(plugins: Partial<PluginNames>[], async?: boolean, source?: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: TYPES.UPDATE_INSTALLED_PLUGINS;
    installed: string[];
    replace?: boolean;
} | {
    type: TYPES.SET_IS_REQUESTING;
    selector: SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: TYPES.SET_ERROR;
    selector: SelectorKeysWithActions;
    error: unknown;
} | Generator<never, void, unknown>, InstallPluginsResponse | undefined, {
    data: {
        installed: string[];
        results: Record<string, boolean>;
        install_time?: Record<string, number>;
        activated: string[];
        plugin_details?: Record<string, {
            name: string;
            uri: string;
            version: string;
        }>;
    };
    errors: import("../types").WPError<Partial<PluginNames>>;
    success: boolean;
    message: string;
} & Response>;
export declare function activatePlugins(plugins: Partial<PluginNames>[]): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: TYPES.UPDATE_ACTIVE_PLUGINS;
    active: string[];
    replace: boolean;
} | {
    type: TYPES.SET_IS_REQUESTING;
    selector: SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: TYPES.SET_ERROR;
    selector: SelectorKeysWithActions;
    error: unknown;
} | Generator<never, void, unknown>, ActivatePluginsResponse | undefined, {
    data: {
        activated: string[];
        active: string[];
    };
    errors: import("../types").WPError<Partial<PluginNames>>;
    success: boolean;
    message: string;
} & Response>;
export declare function installAndActivatePlugins(plugins: string[], source?: string): Generator<Object, {
    data: {
        installed: string[];
        results: Record<string, boolean>;
        install_time?: Record<string, number>;
        activated: string[];
        plugin_details?: Record<string, {
            name: string;
            uri: string;
            version: string;
        }>;
    };
    errors: import("../types").WPError<Partial<PluginNames>>;
    success: boolean;
    message: string;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: ResponseType;
    url: string;
    clone(): Response;
    body: ReadableStream<Uint8Array> | null;
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    bytes(): Promise<Uint8Array>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}, {
    data: {
        installed: string[];
        results: Record<string, boolean>;
        install_time?: Record<string, number>;
        activated: string[];
        plugin_details?: Record<string, {
            name: string;
            uri: string;
            version: string;
        }>;
    };
    errors: import("../types").WPError<Partial<PluginNames>>;
    success: boolean;
    message: string;
} & Response>;
export declare function connectToJetpack(getAdminLink: (endpoint: string) => string): Generator<Object, string, string>;
export declare function installJetpackAndConnect(errorAction: (errorMessage: string) => void, getAdminLink: (endpoint: string) => string): Generator<void | Object, void, string>;
export declare function connectToJetpackWithFailureRedirect(failureRedirect: string, errorAction: (errorMessage: string) => void, getAdminLink: (endpoint: string) => string): Generator<void | Object, void, string>;
export declare function dismissRecommendedPlugins(type: RecommendedTypes): Generator<Object, boolean | never[], Plugin[] & boolean>;
export declare function deactivatePlugin(pluginFile: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, void, unknown>;
export type Actions = ReturnType<typeof updateActivePlugins | typeof updateInstalledPlugins | typeof setIsRequesting | typeof setError | typeof updateIsJetpackConnected | typeof updateJetpackConnectUrl | typeof updateJetpackConnectionData | typeof setPaypalOnboardingStatus | typeof setRecommendedPlugins | typeof createErrorNotice>;
export type ActionDispatchers = DispatchFromMap<{
    installPlugins: typeof installPlugins;
    activatePlugins: typeof activatePlugins;
    installJetpackAndConnect: typeof installJetpackAndConnect;
    installAndActivatePlugins: typeof installAndActivatePlugins;
    connectToJetpackWithFailureRedirect: typeof connectToJetpackWithFailureRedirect;
    dismissRecommendedPlugins: typeof dismissRecommendedPlugins;
    deactivatePlugin: typeof deactivatePlugin;
}>;
//# sourceMappingURL=actions.d.ts.map