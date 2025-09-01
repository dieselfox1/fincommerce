import { PaypalOnboardingStatus, RecommendedTypes, Plugin } from './types';
export declare function getActivePlugins(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | Generator<Object, void, import("@wordpress/core-data").User<"edit"> & {
    fincommerce_meta: import("../user/types").fincommerceMeta;
    is_super_admin: boolean;
}> | {
    type: import("./action-types").ACTION_TYPES.UPDATE_ACTIVE_PLUGINS;
    active: string[];
    replace: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_IS_REQUESTING;
    selector: import("./types").SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_ERROR;
    selector: import("./types").SelectorKeysWithActions;
    error: unknown;
}, void, {
    plugins: string[];
} & Response>;
export declare function getInstalledPlugins(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | Generator<Object, void, import("@wordpress/core-data").User<"edit"> & {
    fincommerce_meta: import("../user/types").fincommerceMeta;
    is_super_admin: boolean;
}> | {
    type: import("./action-types").ACTION_TYPES.UPDATE_INSTALLED_PLUGINS;
    installed: string[];
    replace?: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_IS_REQUESTING;
    selector: import("./types").SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_ERROR;
    selector: import("./types").SelectorKeysWithActions;
    error: unknown;
}, void, {
    plugins: string[];
} & Response>;
export declare function isJetpackConnected(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: import("./action-types").ACTION_TYPES.SET_IS_REQUESTING;
    selector: import("./types").SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_ERROR;
    selector: import("./types").SelectorKeysWithActions;
    error: unknown;
} | {
    type: import("./action-types").ACTION_TYPES.UPDATE_JETPACK_CONNECTION;
    jetpackConnection: boolean;
}, void, {
    isActive: boolean;
    isStaging: boolean;
    isRegistered: boolean;
    isUserConnected: boolean;
    hasConnectedOwner: boolean;
    offlineMode: {
        isActive: boolean;
        constant: boolean;
        url: boolean;
        filter: boolean;
        wpLocalConstant: boolean;
    };
    isPublic: boolean;
} & Response>;
export declare function getJetpackConnectionData(): Generator<Object, void, boolean & {
    connectionOwner: string | null;
    currentUser: {
        isConnected: boolean;
        isMaster: boolean;
        username: string;
        id: number;
        wpcomUser?: {
            ID?: number;
            login?: string;
            email?: string;
            display_name?: string;
            text_direction?: string;
            site_count?: number;
            jetpack_connect?: string;
            color_scheme?: string;
            sidebar_collapsed?: boolean;
            user_locale?: string;
            avatar?: string;
        };
        gravatar: string;
        permissions: {
            connect: boolean;
            connect_user: boolean;
            disconnect: boolean;
            admin_page: boolean;
            manage_modules: boolean;
            network_admin: boolean;
            network_sites_page: boolean;
            edit_posts: boolean;
            publish_posts: boolean;
            manage_options: boolean;
            view_stats: boolean;
            manage_plugins: boolean;
        };
    };
} & Response>;
export declare function getJetpackConnectUrl(query: {
    redirect_url: string;
}): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: import("./action-types").ACTION_TYPES.SET_IS_REQUESTING;
    selector: import("./types").SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_ERROR;
    selector: import("./types").SelectorKeysWithActions;
    error: unknown;
} | {
    type: import("./action-types").ACTION_TYPES.UPDATE_JETPACK_CONNECT_URL;
    jetpackConnectUrl: string;
    redirectUrl: string;
}, void, {
    slug: "jetpack";
    name: string;
    connectAction: string;
} & Response>;
export declare function getPaypalOnboardingStatus(): Generator<Object, void, {
    data?: {
        status: number;
    };
} & PaypalOnboardingStatus>;
export declare function getRecommendedPlugins(type: RecommendedTypes): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: import("./action-types").ACTION_TYPES.SET_IS_REQUESTING;
    selector: import("./types").SelectorKeysWithActions;
    isRequesting: boolean;
} | {
    type: import("./action-types").ACTION_TYPES.SET_ERROR;
    selector: import("./types").SelectorKeysWithActions;
    error: unknown;
} | {
    type: import("./action-types").ACTION_TYPES.SET_RECOMMENDED_PLUGINS;
    recommendedType: string;
    plugins: Plugin[];
}, never[] | undefined, Plugin[]>;
//# sourceMappingURL=resolvers.d.ts.map