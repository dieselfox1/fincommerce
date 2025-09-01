"use strict";
/**
 * External dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultState = void 0;
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
exports.defaultState = {
    errors: {},
    freeExtensions: [],
    profileItems: {
        business_extensions: null,
        completed: null,
        industry: null,
        number_employees: null,
        other_platform: null,
        other_platform_name: null,
        product_count: null,
        product_types: null,
        revenue: null,
        selling_venues: null,
        setup_client: null,
        skipped: null,
        theme: null,
        wccom_connected: null,
        is_agree_marketing: null,
        store_email: null,
        is_store_country_set: null,
    },
    profileProgress: {},
    emailPrefill: '',
    paymentMethods: [],
    productTypes: {},
    requesting: {},
    taskLists: {},
    jetpackAuthUrls: {},
};
const getUpdatedTaskLists = (taskLists, args) => {
    return Object.keys(taskLists).reduce((lists, taskListId) => {
        return {
            ...lists,
            [taskListId]: {
                ...taskLists[taskListId],
                tasks: taskLists[taskListId].tasks.map((task) => {
                    if (args.id === task.id) {
                        return {
                            ...task,
                            ...args,
                        };
                    }
                    return task;
                }),
            },
        };
    }, { ...taskLists });
};
const reducer = (state = exports.defaultState, action) => {
    switch (action.type) {
        case action_types_1.default.SET_PROFILE_ITEMS:
            return {
                ...state,
                profileItems: action.replace
                    ? action.profileItems
                    : { ...state.profileItems, ...action.profileItems },
            };
        case action_types_1.default.SET_PROFILE_PROGRESS:
            return {
                ...state,
                profileProgress: action.profileProgress,
            };
        case action_types_1.default.SET_EMAIL_PREFILL:
            return {
                ...state,
                emailPrefill: action.emailPrefill,
            };
        case action_types_1.default.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.selector]: action.error,
                },
            };
        case action_types_1.default.SET_IS_REQUESTING:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    [action.selector]: action.isRequesting,
                },
            };
        case action_types_1.default.GET_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                paymentMethods: action.paymentMethods,
            };
        case action_types_1.default.GET_PRODUCT_TYPES_SUCCESS:
            return {
                ...state,
                productTypes: action.productTypes,
            };
        case action_types_1.default.GET_PRODUCT_TYPES_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    productTypes: action.error,
                },
            };
        case action_types_1.default.GET_FREE_EXTENSIONS_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    getFreeExtensions: action.error,
                },
            };
        case action_types_1.default.GET_FREE_EXTENSIONS_SUCCESS:
            return {
                ...state,
                freeExtensions: action.freeExtensions,
            };
        case action_types_1.default.GET_TASK_LISTS_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    getTaskLists: action.error,
                },
            };
        case action_types_1.default.GET_TASK_LISTS_SUCCESS:
            return {
                ...state,
                taskLists: action.taskLists.reduce((lists, list) => {
                    return {
                        ...lists,
                        [list.id]: list,
                    };
                }, state.taskLists || {}),
            };
        case action_types_1.default.DISMISS_TASK_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    dismissTask: action.error,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isDismissed: false,
                }),
            };
        case action_types_1.default.DISMISS_TASK_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    dismissTask: true,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isDismissed: true,
                }),
            };
        case action_types_1.default.DISMISS_TASK_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    dismissTask: false,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, action.task),
            };
        case action_types_1.default.UNDO_DISMISS_TASK_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    undoDismissTask: action.error,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isDismissed: true,
                }),
            };
        case action_types_1.default.UNDO_DISMISS_TASK_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    undoDismissTask: true,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isDismissed: false,
                }),
            };
        case action_types_1.default.UNDO_DISMISS_TASK_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    undoDismissTask: false,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, action.task),
            };
        case action_types_1.default.SNOOZE_TASK_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    snoozeTask: action.error,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isSnoozed: false,
                }),
            };
        case action_types_1.default.SNOOZE_TASK_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    snoozeTask: true,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isSnoozed: true,
                }),
            };
        case action_types_1.default.SNOOZE_TASK_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    snoozeTask: false,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, action.task),
            };
        case action_types_1.default.UNDO_SNOOZE_TASK_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    undoSnoozeTask: action.error,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isSnoozed: true,
                }),
            };
        case action_types_1.default.UNDO_SNOOZE_TASK_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    undoSnoozeTask: true,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isSnoozed: false,
                }),
            };
        case action_types_1.default.UNDO_SNOOZE_TASK_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    undoSnoozeTask: false,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, action.task),
            };
        case action_types_1.default.HIDE_TASK_LIST_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    hideTaskList: action.error,
                },
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: {
                        ...state.taskLists[action.taskListId],
                        isHidden: false,
                        isVisible: true,
                    },
                },
            };
        case action_types_1.default.HIDE_TASK_LIST_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    hideTaskList: true,
                },
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: {
                        ...state.taskLists[action.taskListId],
                        isHidden: true,
                        isVisible: false,
                    },
                },
            };
        case action_types_1.default.HIDE_TASK_LIST_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    hideTaskList: false,
                },
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: action.taskList,
                },
            };
        case action_types_1.default.UNHIDE_TASK_LIST_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    unhideTaskList: action.error,
                },
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: {
                        ...state.taskLists[action.taskListId],
                        isHidden: true,
                        isVisible: false,
                    },
                },
            };
        case action_types_1.default.UNHIDE_TASK_LIST_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    unhideTaskList: true,
                },
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: {
                        ...state.taskLists[action.taskListId],
                        isHidden: false,
                        isVisible: true,
                    },
                },
            };
        case action_types_1.default.UNHIDE_TASK_LIST_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    unhideTaskList: false,
                },
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: action.taskList,
                },
            };
        case action_types_1.default.KEEP_COMPLETED_TASKS_SUCCESS:
            return {
                ...state,
                taskLists: {
                    ...state.taskLists,
                    [action.taskListId]: {
                        ...state.taskLists[action.taskListId],
                        keepCompletedTaskList: action.keepCompletedTaskList,
                    },
                },
            };
        case action_types_1.default.OPTIMISTICALLY_COMPLETE_TASK_REQUEST:
            return {
                ...state,
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isComplete: true,
                }),
            };
        case action_types_1.default.VISITED_TASK:
            return {
                ...state,
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isVisited: true,
                }),
            };
        case action_types_1.default.ACTION_TASK_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    actionTask: action.error,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isActioned: false,
                }),
            };
        case action_types_1.default.ACTION_TASK_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    actionTask: true,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, {
                    id: action.taskId,
                    isActioned: true,
                }),
            };
        case action_types_1.default.ACTION_TASK_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    actionTask: false,
                },
                taskLists: getUpdatedTaskLists(state.taskLists, action.task),
            };
        case action_types_1.default.SET_JETPACK_AUTH_URL:
            return {
                ...state,
                jetpackAuthUrls: {
                    ...state.jetpackAuthUrls,
                    [action.redirectUrl]: action.results,
                },
            };
        case action_types_1.default.CORE_PROFILER_COMPLETED_REQUEST:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    coreProfilerCompleted: true,
                },
            };
        case action_types_1.default.CORE_PROFILER_COMPLETED_SUCCESS:
            return {
                ...state,
                requesting: {
                    ...state.requesting,
                    coreProfilerCompleted: false,
                },
            };
        case action_types_1.default.CORE_PROFILER_COMPLETED_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    coreProfilerCompleted: action.error,
                },
                requesting: {
                    ...state.requesting,
                    coreProfilerCompleted: false,
                },
            };
        default:
            return state;
    }
};
exports.default = reducer;
