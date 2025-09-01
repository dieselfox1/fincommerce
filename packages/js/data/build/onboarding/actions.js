"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFreeExtensionsError = getFreeExtensionsError;
exports.getFreeExtensionsSuccess = getFreeExtensionsSuccess;
exports.setError = setError;
exports.setIsRequesting = setIsRequesting;
exports.setProfileItems = setProfileItems;
exports.getTaskListsError = getTaskListsError;
exports.getTaskListsSuccess = getTaskListsSuccess;
exports.snoozeTaskError = snoozeTaskError;
exports.snoozeTaskRequest = snoozeTaskRequest;
exports.snoozeTaskSuccess = snoozeTaskSuccess;
exports.undoSnoozeTaskError = undoSnoozeTaskError;
exports.undoSnoozeTaskRequest = undoSnoozeTaskRequest;
exports.undoSnoozeTaskSuccess = undoSnoozeTaskSuccess;
exports.dismissTaskError = dismissTaskError;
exports.dismissTaskRequest = dismissTaskRequest;
exports.dismissTaskSuccess = dismissTaskSuccess;
exports.undoDismissTaskError = undoDismissTaskError;
exports.undoDismissTaskRequest = undoDismissTaskRequest;
exports.undoDismissTaskSuccess = undoDismissTaskSuccess;
exports.hideTaskListError = hideTaskListError;
exports.hideTaskListRequest = hideTaskListRequest;
exports.hideTaskListSuccess = hideTaskListSuccess;
exports.unhideTaskListError = unhideTaskListError;
exports.unhideTaskListRequest = unhideTaskListRequest;
exports.unhideTaskListSuccess = unhideTaskListSuccess;
exports.optimisticallyCompleteTaskRequest = optimisticallyCompleteTaskRequest;
exports.keepCompletedTaskListSuccess = keepCompletedTaskListSuccess;
exports.visitedTask = visitedTask;
exports.setPaymentMethods = setPaymentMethods;
exports.setEmailPrefill = setEmailPrefill;
exports.actionTaskError = actionTaskError;
exports.actionTaskRequest = actionTaskRequest;
exports.actionTaskSuccess = actionTaskSuccess;
exports.getProductTypesSuccess = getProductTypesSuccess;
exports.getProductTypesError = getProductTypesError;
exports.setProfileProgress = setProfileProgress;
exports.keepCompletedTaskList = keepCompletedTaskList;
exports.updateProfileItems = updateProfileItems;
exports.updateCoreProfilerStep = updateCoreProfilerStep;
exports.snoozeTask = snoozeTask;
exports.undoSnoozeTask = undoSnoozeTask;
exports.dismissTask = dismissTask;
exports.undoDismissTask = undoDismissTask;
exports.hideTaskList = hideTaskList;
exports.unhideTaskList = unhideTaskList;
exports.optimisticallyCompleteTask = optimisticallyCompleteTask;
exports.actionTask = actionTask;
exports.installAndActivatePluginsAsync = installAndActivatePluginsAsync;
exports.updateStoreCurrencyAndMeasurementUnits = updateStoreCurrencyAndMeasurementUnits;
exports.setJetpackAuthUrl = setJetpackAuthUrl;
exports.coreProfilerCompletedError = coreProfilerCompletedError;
exports.coreProfilerCompletedRequest = coreProfilerCompletedRequest;
exports.coreProfilerCompletedSuccess = coreProfilerCompletedSuccess;
exports.coreProfilerCompleted = coreProfilerCompleted;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const constants_1 = require("../constants");
const _1 = require("./");
const deprecated_tasks_1 = require("./deprecated-tasks");
const constants_2 = require("../options/constants");
const __1 = require("..");
function getFreeExtensionsError(error) {
    return {
        type: action_types_1.default.GET_FREE_EXTENSIONS_ERROR,
        error,
    };
}
function getFreeExtensionsSuccess(freeExtensions) {
    return {
        type: action_types_1.default.GET_FREE_EXTENSIONS_SUCCESS,
        freeExtensions,
    };
}
function setError(selector, error) {
    return {
        type: action_types_1.default.SET_ERROR,
        selector,
        error,
    };
}
function setIsRequesting(selector, isRequesting) {
    return {
        type: action_types_1.default.SET_IS_REQUESTING,
        selector,
        isRequesting,
    };
}
function setProfileItems(profileItems, replace = false) {
    return {
        type: action_types_1.default.SET_PROFILE_ITEMS,
        profileItems,
        replace,
    };
}
function getTaskListsError(error) {
    return {
        type: action_types_1.default.GET_TASK_LISTS_ERROR,
        error,
    };
}
function getTaskListsSuccess(taskLists) {
    return {
        type: action_types_1.default.GET_TASK_LISTS_SUCCESS,
        taskLists,
    };
}
function snoozeTaskError(taskId, error) {
    return {
        type: action_types_1.default.SNOOZE_TASK_ERROR,
        taskId,
        error,
    };
}
function snoozeTaskRequest(taskId) {
    return {
        type: action_types_1.default.SNOOZE_TASK_REQUEST,
        taskId,
    };
}
function snoozeTaskSuccess(task) {
    return {
        type: action_types_1.default.SNOOZE_TASK_SUCCESS,
        task,
    };
}
function undoSnoozeTaskError(taskId, error) {
    return {
        type: action_types_1.default.UNDO_SNOOZE_TASK_ERROR,
        taskId,
        error,
    };
}
function undoSnoozeTaskRequest(taskId) {
    return {
        type: action_types_1.default.UNDO_SNOOZE_TASK_REQUEST,
        taskId,
    };
}
function undoSnoozeTaskSuccess(task) {
    return {
        type: action_types_1.default.UNDO_SNOOZE_TASK_SUCCESS,
        task,
    };
}
function dismissTaskError(taskId, error) {
    return {
        type: action_types_1.default.DISMISS_TASK_ERROR,
        taskId,
        error,
    };
}
function dismissTaskRequest(taskId) {
    return {
        type: action_types_1.default.DISMISS_TASK_REQUEST,
        taskId,
    };
}
function dismissTaskSuccess(task) {
    return {
        type: action_types_1.default.DISMISS_TASK_SUCCESS,
        task,
    };
}
function undoDismissTaskError(taskId, error) {
    return {
        type: action_types_1.default.UNDO_DISMISS_TASK_ERROR,
        taskId,
        error,
    };
}
function undoDismissTaskRequest(taskId) {
    return {
        type: action_types_1.default.UNDO_DISMISS_TASK_REQUEST,
        taskId,
    };
}
function undoDismissTaskSuccess(task) {
    return {
        type: action_types_1.default.UNDO_DISMISS_TASK_SUCCESS,
        task,
    };
}
function hideTaskListError(taskListId, error) {
    return {
        type: action_types_1.default.HIDE_TASK_LIST_ERROR,
        taskListId,
        error,
    };
}
function hideTaskListRequest(taskListId) {
    return {
        type: action_types_1.default.HIDE_TASK_LIST_REQUEST,
        taskListId,
    };
}
function hideTaskListSuccess(taskList) {
    return {
        type: action_types_1.default.HIDE_TASK_LIST_SUCCESS,
        taskList,
        taskListId: taskList.id,
    };
}
function unhideTaskListError(taskListId, error) {
    return {
        type: action_types_1.default.UNHIDE_TASK_LIST_ERROR,
        taskListId,
        error,
    };
}
function unhideTaskListRequest(taskListId) {
    return {
        type: action_types_1.default.UNHIDE_TASK_LIST_REQUEST,
        taskListId,
    };
}
function unhideTaskListSuccess(taskList) {
    return {
        type: action_types_1.default.UNHIDE_TASK_LIST_SUCCESS,
        taskList,
        taskListId: taskList.id,
    };
}
function optimisticallyCompleteTaskRequest(taskId) {
    return {
        type: action_types_1.default.OPTIMISTICALLY_COMPLETE_TASK_REQUEST,
        taskId,
    };
}
function keepCompletedTaskListSuccess(taskListId, keepCompletedList) {
    return {
        type: action_types_1.default.KEEP_COMPLETED_TASKS_SUCCESS,
        taskListId,
        keepCompletedTaskList: keepCompletedList,
    };
}
function visitedTask(taskId) {
    return {
        type: action_types_1.default.VISITED_TASK,
        taskId,
    };
}
function setPaymentMethods(paymentMethods) {
    return {
        type: action_types_1.default.GET_PAYMENT_METHODS_SUCCESS,
        paymentMethods,
    };
}
function setEmailPrefill(email) {
    return {
        type: action_types_1.default.SET_EMAIL_PREFILL,
        emailPrefill: email,
    };
}
function actionTaskError(taskId, error) {
    return {
        type: action_types_1.default.ACTION_TASK_ERROR,
        taskId,
        error,
    };
}
function actionTaskRequest(taskId) {
    return {
        type: action_types_1.default.ACTION_TASK_REQUEST,
        taskId,
    };
}
function actionTaskSuccess(task) {
    return {
        type: action_types_1.default.ACTION_TASK_SUCCESS,
        task,
    };
}
function getProductTypesSuccess(productTypes) {
    return {
        type: action_types_1.default.GET_PRODUCT_TYPES_SUCCESS,
        productTypes,
    };
}
function getProductTypesError(error) {
    return {
        type: action_types_1.default.GET_PRODUCT_TYPES_ERROR,
        error,
    };
}
function setProfileProgress(profileProgress) {
    return {
        type: action_types_1.default.SET_PROFILE_PROGRESS,
        profileProgress,
    };
}
function* keepCompletedTaskList(taskListId) {
    const updateOptionsParams = {
        fincommerce_task_list_keep_completed: 'yes',
    };
    const response = yield data_1.controls.dispatch(constants_2.STORE_NAME, 'updateOptions', updateOptionsParams);
    if (response && response.success) {
        yield keepCompletedTaskListSuccess(taskListId, 'yes');
    }
}
function* updateProfileItems(items) {
    yield setIsRequesting('updateProfileItems', true);
    yield setError('updateProfileItems', null);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/profile`,
            method: 'POST',
            data: items,
        });
        if (results && results.status === 'success') {
            yield setProfileItems(items);
            yield setIsRequesting('updateProfileItems', false);
            return results;
        }
        throw new Error();
    }
    catch (error) {
        yield setError('updateProfileItems', error);
        yield setIsRequesting('updateProfileItems', false);
        throw error;
    }
    finally {
        yield (0, data_1.dispatch)(__1.optionsStore).invalidateResolution('getOption', [
            'fincommerce_onboarding_profile',
        ]);
        yield (0, data_1.dispatch)(_1.store).invalidateResolution('getProfileItems', []);
    }
}
function* updateCoreProfilerStep(step) {
    yield setIsRequesting('updateCoreProfilerStep', true);
    yield setError('updateCoreProfilerStep', null);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/profile/progress/core-profiler/complete`,
            method: 'POST',
            data: { step },
        });
        if (results && results.status === 'success') {
            yield setIsRequesting('updateCoreProfilerStep', false);
            return results;
        }
        throw new Error();
    }
    catch (error) {
        yield setError('updateCoreProfilerStep', error);
        yield setIsRequesting('updateCoreProfilerStep', false);
        throw error;
    }
    finally {
        yield (0, data_1.dispatch)(_1.store).invalidateResolution('getProfileProgress', []);
        yield (0, data_1.dispatch)(_1.store).invalidateResolution('getCoreProfilerCompletedSteps', []);
        yield (0, data_1.dispatch)(_1.store).invalidateResolution('getMostRecentCoreProfilerStep', []);
    }
}
function* snoozeTask(id) {
    yield snoozeTaskRequest(id);
    try {
        const task = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/snooze`,
            method: 'POST',
        });
        yield snoozeTaskSuccess(deprecated_tasks_1.DeprecatedTasks.possiblyPruneTaskData(task, [
            'isSnoozed',
            'isDismissed',
            'snoozedUntil',
        ]));
    }
    catch (error) {
        yield snoozeTaskError(id, error);
        throw new Error();
    }
}
function* undoSnoozeTask(id) {
    yield undoSnoozeTaskRequest(id);
    try {
        const task = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/undo_snooze`,
            method: 'POST',
        });
        yield undoSnoozeTaskSuccess(deprecated_tasks_1.DeprecatedTasks.possiblyPruneTaskData(task, [
            'isSnoozed',
            'isDismissed',
            'snoozedUntil',
        ]));
    }
    catch (error) {
        yield undoSnoozeTaskError(id, error);
        throw new Error();
    }
}
function* dismissTask(id) {
    yield dismissTaskRequest(id);
    try {
        const task = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/dismiss`,
            method: 'POST',
        });
        yield dismissTaskSuccess(deprecated_tasks_1.DeprecatedTasks.possiblyPruneTaskData(task, [
            'isDismissed',
            'isSnoozed',
        ]));
    }
    catch (error) {
        yield dismissTaskError(id, error);
        throw new Error();
    }
}
function* undoDismissTask(id) {
    yield undoDismissTaskRequest(id);
    try {
        const task = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/undo_dismiss`,
            method: 'POST',
        });
        yield undoDismissTaskSuccess(deprecated_tasks_1.DeprecatedTasks.possiblyPruneTaskData(task, [
            'isDismissed',
            'isSnoozed',
        ]));
    }
    catch (error) {
        yield undoDismissTaskError(id, error);
        throw new Error();
    }
}
function* hideTaskList(id) {
    yield hideTaskListRequest(id);
    try {
        const taskList = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/hide`,
            method: 'POST',
        });
        yield hideTaskListSuccess(taskList);
    }
    catch (error) {
        yield hideTaskListError(id, error);
        throw new Error();
    }
}
function* unhideTaskList(id) {
    yield unhideTaskListRequest(id);
    try {
        const taskList = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/unhide`,
            method: 'POST',
        });
        yield unhideTaskListSuccess(taskList);
    }
    catch (error) {
        yield unhideTaskListError(id, error);
        throw new Error();
    }
}
function* optimisticallyCompleteTask(id) {
    yield optimisticallyCompleteTaskRequest(id);
}
function* actionTask(id) {
    yield actionTaskRequest(id);
    try {
        const task = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/action`,
            method: 'POST',
        });
        yield actionTaskSuccess(deprecated_tasks_1.DeprecatedTasks.possiblyPruneTaskData(task, ['isActioned']));
    }
    catch (error) {
        yield actionTaskError(id, error);
        throw new Error();
    }
}
function* installAndActivatePluginsAsync(plugins, 
// Indicate the origin of the installation request (e.g., core-profiler, marketplace)
// this can be used in the backend to track or do some specific actions based on the source.
source) {
    yield setIsRequesting('installAndActivatePluginsAsync', true);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/plugins/install-and-activate-async`,
            method: 'POST',
            data: { plugins, source },
        });
        return results;
    }
    catch (error) {
        throw error;
    }
    finally {
        yield setIsRequesting('installAndActivatePluginsAsync', false);
    }
}
function* updateStoreCurrencyAndMeasurementUnits(countryCode) {
    yield setIsRequesting('updateStoreCurrencyAndMeasurementUnits', true);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/onboarding/profile/update-store-currency-and-measurement-units`,
            method: 'POST',
            data: {
                country_code: countryCode,
            },
        });
        return results;
    }
    catch (error) {
        throw error;
    }
    finally {
        yield setIsRequesting('updateStoreCurrencyAndMeasurementUnits', false);
    }
}
function setJetpackAuthUrl(results, redirectUrl, from = '') {
    return {
        type: action_types_1.default.SET_JETPACK_AUTH_URL,
        results,
        redirectUrl,
        from,
    };
}
function coreProfilerCompletedError(error) {
    return {
        type: action_types_1.default.CORE_PROFILER_COMPLETED_ERROR,
        error,
    };
}
function coreProfilerCompletedRequest() {
    return {
        type: action_types_1.default.CORE_PROFILER_COMPLETED_REQUEST,
    };
}
function coreProfilerCompletedSuccess() {
    return {
        type: action_types_1.default.CORE_PROFILER_COMPLETED_SUCCESS,
    };
}
function* coreProfilerCompleted() {
    yield coreProfilerCompletedRequest();
    try {
        yield (0, data_controls_1.apiFetch)({
            path: `${constants_1.WC_ADMIN_NAMESPACE}/launch-your-store/initialize-coming-soon`,
            method: 'POST',
        });
    }
    catch (error) {
        yield coreProfilerCompletedError(error);
        throw error;
    }
    finally {
        yield coreProfilerCompletedSuccess();
    }
}
