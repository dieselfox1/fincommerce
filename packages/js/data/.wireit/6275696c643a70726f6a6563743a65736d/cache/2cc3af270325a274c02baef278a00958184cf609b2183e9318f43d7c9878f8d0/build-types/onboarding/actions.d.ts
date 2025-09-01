import { ExtensionList, ProfileItems, TaskListType, TaskType, OnboardingProductTypes, InstallAndActivatePluginsAsyncResponse, GetJetpackAuthUrlResponse, CoreProfilerStep, CoreProfilerCompletedSteps } from './types';
import { Plugin, PluginNames } from '../plugins/types';
export declare function getFreeExtensionsError(error: unknown): {
    type: "GET_FREE_EXTENSIONS_ERROR";
    error: unknown;
};
export declare function getFreeExtensionsSuccess(freeExtensions: ExtensionList[]): {
    type: "GET_FREE_EXTENSIONS_SUCCESS";
    freeExtensions: ExtensionList[];
};
export declare function setError(selector: string, error: unknown): {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
};
export declare function setIsRequesting(selector: string, isRequesting: boolean): {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
};
export declare function setProfileItems(profileItems: ProfileItems, replace?: boolean): {
    type: "SET_PROFILE_ITEMS";
    profileItems: ProfileItems;
    replace: boolean;
};
export declare function getTaskListsError(error: unknown): {
    type: "GET_TASK_LISTS_ERROR";
    error: unknown;
};
export declare function getTaskListsSuccess(taskLists: TaskListType[]): {
    type: "GET_TASK_LISTS_SUCCESS";
    taskLists: TaskListType[];
};
export declare function snoozeTaskError(taskId: string, error: unknown): {
    type: "SNOOZE_TASK_ERROR";
    taskId: string;
    error: unknown;
};
export declare function snoozeTaskRequest(taskId: string): {
    type: "SNOOZE_TASK_REQUEST";
    taskId: string;
};
export declare function snoozeTaskSuccess(task: Partial<TaskType>): {
    type: "SNOOZE_TASK_SUCCESS";
    task: Partial<TaskType>;
};
export declare function undoSnoozeTaskError(taskId: string, error: unknown): {
    type: "UNDO_SNOOZE_TASK_ERROR";
    taskId: string;
    error: unknown;
};
export declare function undoSnoozeTaskRequest(taskId: string): {
    type: "UNDO_SNOOZE_TASK_REQUEST";
    taskId: string;
};
export declare function undoSnoozeTaskSuccess(task: Partial<TaskType>): {
    type: "UNDO_SNOOZE_TASK_SUCCESS";
    task: Partial<TaskType>;
};
export declare function dismissTaskError(taskId: string, error: unknown): {
    type: "DISMISS_TASK_ERROR";
    taskId: string;
    error: unknown;
};
export declare function dismissTaskRequest(taskId: string): {
    type: "DISMISS_TASK_REQUEST";
    taskId: string;
};
export declare function dismissTaskSuccess(task: Partial<TaskType>): {
    type: "DISMISS_TASK_SUCCESS";
    task: Partial<TaskType>;
};
export declare function undoDismissTaskError(taskId: string, error: unknown): {
    type: "UNDO_DISMISS_TASK_ERROR";
    taskId: string;
    error: unknown;
};
export declare function undoDismissTaskRequest(taskId: string): {
    type: "UNDO_DISMISS_TASK_REQUEST";
    taskId: string;
};
export declare function undoDismissTaskSuccess(task: Partial<TaskType>): {
    type: "UNDO_DISMISS_TASK_SUCCESS";
    task: Partial<TaskType>;
};
export declare function hideTaskListError(taskListId: string, error: unknown): {
    type: "HIDE_TASK_LIST_ERROR";
    taskListId: string;
    error: unknown;
};
export declare function hideTaskListRequest(taskListId: string): {
    type: "HIDE_TASK_LIST_REQUEST";
    taskListId: string;
};
export declare function hideTaskListSuccess(taskList: TaskListType): {
    type: "HIDE_TASK_LIST_SUCCESS";
    taskList: TaskListType;
    taskListId: string;
};
export declare function unhideTaskListError(taskListId: string, error: unknown): {
    type: "UNHIDE_TASK_LIST_ERROR";
    taskListId: string;
    error: unknown;
};
export declare function unhideTaskListRequest(taskListId: string): {
    type: "UNHIDE_TASK_LIST_REQUEST";
    taskListId: string;
};
export declare function unhideTaskListSuccess(taskList: TaskListType): {
    type: "UNHIDE_TASK_LIST_SUCCESS";
    taskList: TaskListType;
    taskListId: string;
};
export declare function optimisticallyCompleteTaskRequest(taskId: string): {
    type: "OPTIMISTICALLY_COMPLETE_TASK_REQUEST";
    taskId: string;
};
export declare function keepCompletedTaskListSuccess(taskListId: string, keepCompletedList: 'yes' | 'no'): {
    type: "KEEP_COMPLETED_TASKS_SUCCESS";
    taskListId: string;
    keepCompletedTaskList: "yes" | "no";
};
export declare function visitedTask(taskId: string): {
    type: "VISITED_TASK";
    taskId: string;
};
export declare function setPaymentMethods(paymentMethods: Plugin[]): {
    type: "GET_PAYMENT_METHODS_SUCCESS";
    paymentMethods: Plugin[];
};
export declare function setEmailPrefill(email: string): {
    type: "SET_EMAIL_PREFILL";
    emailPrefill: string;
};
export declare function actionTaskError(taskId: string, error: unknown): {
    type: "ACTION_TASK_ERROR";
    taskId: string;
    error: unknown;
};
export declare function actionTaskRequest(taskId: string): {
    type: "ACTION_TASK_REQUEST";
    taskId: string;
};
export declare function actionTaskSuccess(task: Partial<TaskType>): {
    type: "ACTION_TASK_SUCCESS";
    task: Partial<TaskType>;
};
export declare function getProductTypesSuccess(productTypes: OnboardingProductTypes): {
    type: "GET_PRODUCT_TYPES_SUCCESS";
    productTypes: OnboardingProductTypes;
};
export declare function getProductTypesError(error: unknown): {
    type: "GET_PRODUCT_TYPES_ERROR";
    error: unknown;
};
export declare function setProfileProgress(profileProgress: Partial<CoreProfilerCompletedSteps>): {
    type: "SET_PROFILE_PROGRESS";
    profileProgress: Partial<CoreProfilerCompletedSteps>;
};
export declare function keepCompletedTaskList(taskListId: string): Generator<Object, void, {
    success: "yes" | "no";
}>;
export declare function updateProfileItems(items: ProfileItems): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
} | {
    type: "SET_PROFILE_ITEMS";
    profileItems: ProfileItems;
    replace: boolean;
} | Promise<{
    type: "INVALIDATE_RESOLUTION";
    selectorName: "getOption" | "getOptionsRequestingError" | "isOptionsUpdating" | "getOptionsUpdatingError";
    args: [] | [name: string] | [name: string];
}> | Promise<{
    type: "INVALIDATE_RESOLUTION";
    selectorName: "getProfileItems" | "getProfileProgress" | "getCoreProfilerCompletedSteps" | "getMostRecentCoreProfilerStep" | "getEmailPrefill" | "getTaskLists" | "getTaskListsByIds" | "getTaskList" | "getTask" | "getPaymentGatewaySuggestions" | "getFreeExtensions" | "getProductTypes" | "getJetpackAuthUrl" | "getOnboardingError" | "isOnboardingRequesting";
    args: [] | [ids: string[]] | [selector: string] | [selector: string] | [query: {
        redirectUrl: string;
        from?: string;
    }] | [selector: string] | [selector: string];
}>, {
    items: ProfileItems;
    status: string;
}, {
    items: ProfileItems;
    status: string;
}>;
export declare function updateCoreProfilerStep(step: CoreProfilerStep): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    selector: string;
    error: unknown;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
} | Promise<{
    type: "INVALIDATE_RESOLUTION";
    selectorName: "getProfileItems" | "getProfileProgress" | "getCoreProfilerCompletedSteps" | "getMostRecentCoreProfilerStep" | "getEmailPrefill" | "getTaskLists" | "getTaskListsByIds" | "getTaskList" | "getTask" | "getPaymentGatewaySuggestions" | "getFreeExtensions" | "getProductTypes" | "getJetpackAuthUrl" | "getOnboardingError" | "isOnboardingRequesting";
    args: [] | [ids: string[]] | [selector: string] | [selector: string] | [query: {
        redirectUrl: string;
        from?: string;
    }] | [selector: string] | [selector: string];
}>, {
    results: CoreProfilerStep;
    status: string;
}, {
    results: CoreProfilerStep;
    status: string;
}>;
export declare function snoozeTask(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SNOOZE_TASK_ERROR";
    taskId: string;
    error: unknown;
} | {
    type: "SNOOZE_TASK_REQUEST";
    taskId: string;
} | {
    type: "SNOOZE_TASK_SUCCESS";
    task: Partial<TaskType>;
}, void, TaskType>;
export declare function undoSnoozeTask(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "UNDO_SNOOZE_TASK_ERROR";
    taskId: string;
    error: unknown;
} | {
    type: "UNDO_SNOOZE_TASK_REQUEST";
    taskId: string;
} | {
    type: "UNDO_SNOOZE_TASK_SUCCESS";
    task: Partial<TaskType>;
}, void, TaskType>;
export declare function dismissTask(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "DISMISS_TASK_ERROR";
    taskId: string;
    error: unknown;
} | {
    type: "DISMISS_TASK_REQUEST";
    taskId: string;
} | {
    type: "DISMISS_TASK_SUCCESS";
    task: Partial<TaskType>;
}, void, TaskType>;
export declare function undoDismissTask(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "UNDO_DISMISS_TASK_ERROR";
    taskId: string;
    error: unknown;
} | {
    type: "UNDO_DISMISS_TASK_REQUEST";
    taskId: string;
} | {
    type: "UNDO_DISMISS_TASK_SUCCESS";
    task: Partial<TaskType>;
}, void, TaskType>;
export declare function hideTaskList(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "HIDE_TASK_LIST_ERROR";
    taskListId: string;
    error: unknown;
} | {
    type: "HIDE_TASK_LIST_REQUEST";
    taskListId: string;
} | {
    type: "HIDE_TASK_LIST_SUCCESS";
    taskList: TaskListType;
    taskListId: string;
}, void, TaskListType>;
export declare function unhideTaskList(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "UNHIDE_TASK_LIST_ERROR";
    taskListId: string;
    error: unknown;
} | {
    type: "UNHIDE_TASK_LIST_REQUEST";
    taskListId: string;
} | {
    type: "UNHIDE_TASK_LIST_SUCCESS";
    taskList: TaskListType;
    taskListId: string;
}, void, TaskListType>;
export declare function optimisticallyCompleteTask(id: string): Generator<{
    type: "OPTIMISTICALLY_COMPLETE_TASK_REQUEST";
    taskId: string;
}, void, unknown>;
export declare function actionTask(id: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "ACTION_TASK_ERROR";
    taskId: string;
    error: unknown;
} | {
    type: "ACTION_TASK_REQUEST";
    taskId: string;
} | {
    type: "ACTION_TASK_SUCCESS";
    task: Partial<TaskType>;
}, void, TaskType>;
export declare function installAndActivatePluginsAsync(plugins: Partial<PluginNames>[], source?: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, InstallAndActivatePluginsAsyncResponse, InstallAndActivatePluginsAsyncResponse>;
export declare function updateStoreCurrencyAndMeasurementUnits(countryCode: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, {
    results: null;
    status: string;
}, {
    results: null;
    status: string;
}>;
export declare function setJetpackAuthUrl(results: GetJetpackAuthUrlResponse, redirectUrl: string, from?: string): {
    type: "SET_JETPACK_AUTH_URL";
    results: GetJetpackAuthUrlResponse;
    redirectUrl: string;
    from: string;
};
export declare function coreProfilerCompletedError(error: unknown): {
    type: "CORE_PROFILER_COMPLETED_ERROR";
    error: unknown;
};
export declare function coreProfilerCompletedRequest(): {
    type: "CORE_PROFILER_COMPLETED_REQUEST";
};
export declare function coreProfilerCompletedSuccess(): {
    type: "CORE_PROFILER_COMPLETED_SUCCESS";
};
export declare function coreProfilerCompleted(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "CORE_PROFILER_COMPLETED_REQUEST";
} | {
    type: "CORE_PROFILER_COMPLETED_SUCCESS";
} | {
    type: "CORE_PROFILER_COMPLETED_ERROR";
    error: unknown;
}, void, unknown>;
export type Action = ReturnType<typeof getFreeExtensionsError | typeof getFreeExtensionsSuccess | typeof setError | typeof setIsRequesting | typeof setProfileItems | typeof snoozeTaskRequest | typeof snoozeTaskSuccess | typeof snoozeTaskError | typeof getTaskListsError | typeof getTaskListsSuccess | typeof undoSnoozeTaskError | typeof undoSnoozeTaskSuccess | typeof dismissTaskError | typeof dismissTaskSuccess | typeof dismissTaskRequest | typeof undoDismissTaskError | typeof undoDismissTaskSuccess | typeof undoDismissTaskRequest | typeof undoSnoozeTaskRequest | typeof hideTaskListError | typeof hideTaskListSuccess | typeof hideTaskListRequest | typeof unhideTaskListError | typeof unhideTaskListSuccess | typeof unhideTaskListRequest | typeof optimisticallyCompleteTaskRequest | typeof keepCompletedTaskListSuccess | typeof visitedTask | typeof setPaymentMethods | typeof setEmailPrefill | typeof actionTaskError | typeof actionTaskSuccess | typeof actionTaskRequest | typeof getProductTypesError | typeof getProductTypesSuccess | typeof setJetpackAuthUrl | typeof coreProfilerCompletedRequest | typeof coreProfilerCompletedSuccess | typeof coreProfilerCompletedError | typeof setProfileProgress>;
//# sourceMappingURL=actions.d.ts.map