import { CoreProfilerCompletedSteps, ExtensionList, GetJetpackAuthUrlResponse, OnboardingProductTypes, ProfileItems, TaskListType } from './types';
import { Plugin } from '../plugins/types';
export declare function getProfileItems(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "SET_PROFILE_ITEMS";
    profileItems: ProfileItems;
    replace: boolean;
}, void, ProfileItems>;
export declare function getProfileProgress(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "SET_PROFILE_PROGRESS";
    profileProgress: Partial<CoreProfilerCompletedSteps>;
}, void, {
    core_profiler_completed_steps: Partial<CoreProfilerCompletedSteps>;
    status: string;
}>;
export declare function getCoreProfilerCompletedSteps(): Generator<Object, void, unknown>;
export declare function getMostRecentCoreProfilerStep(): Generator<Object, void, unknown>;
export declare function getEmailPrefill(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "SET_EMAIL_PREFILL";
    emailPrefill: string;
}, void, {
    email: string;
}>;
export declare function getTaskLists(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | Generator<Object, void, import("@wordpress/core-data").User<"edit"> & {
    fincommerce_meta: import("../user/types").fincommerceMeta;
    is_super_admin: boolean;
}> | {
    type: "GET_TASK_LISTS_ERROR";
    error: unknown;
} | {
    type: "GET_TASK_LISTS_SUCCESS";
    taskLists: TaskListType[];
}, void, TaskListType[]>;
export declare function getTaskListsByIds(): Generator<Object, void, unknown>;
export declare function getTaskList(): Generator<Object, void, unknown>;
export declare function getTask(): Generator<Object, void, unknown>;
export declare function getPaymentGatewaySuggestions(forceDefaultSuggestions?: boolean): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "GET_PAYMENT_METHODS_SUCCESS";
    paymentMethods: Plugin[];
}, void, Plugin[]>;
export declare function getFreeExtensions(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "GET_FREE_EXTENSIONS_ERROR";
    error: unknown;
} | {
    type: "GET_FREE_EXTENSIONS_SUCCESS";
    freeExtensions: ExtensionList[];
}, void, ExtensionList[]>;
export declare function getProductTypes(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "GET_PRODUCT_TYPES_SUCCESS";
    productTypes: OnboardingProductTypes;
} | {
    type: "GET_PRODUCT_TYPES_ERROR";
    error: unknown;
}, void, OnboardingProductTypes>;
export declare function getJetpackAuthUrl(query: {
    redirectUrl: string;
    from?: string;
}): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "SET_JETPACK_AUTH_URL";
    results: GetJetpackAuthUrlResponse;
    redirectUrl: string;
    from: string;
}, void, GetJetpackAuthUrlResponse>;
//# sourceMappingURL=resolvers.d.ts.map