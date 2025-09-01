/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
import { controls, dispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { WC_ADMIN_NAMESPACE } from '../constants';
import { store } from './';
import { DeprecatedTasks } from './deprecated-tasks';
import { STORE_NAME as OPTIONS_STORE_NAME } from '../options/constants';
import { optionsStore } from '..';
export function getFreeExtensionsError(error) {
    return {
        type: TYPES.GET_FREE_EXTENSIONS_ERROR,
        error,
    };
}
export function getFreeExtensionsSuccess(freeExtensions) {
    return {
        type: TYPES.GET_FREE_EXTENSIONS_SUCCESS,
        freeExtensions,
    };
}
export function setError(selector, error) {
    return {
        type: TYPES.SET_ERROR,
        selector,
        error,
    };
}
export function setIsRequesting(selector, isRequesting) {
    return {
        type: TYPES.SET_IS_REQUESTING,
        selector,
        isRequesting,
    };
}
export function setProfileItems(profileItems, replace = false) {
    return {
        type: TYPES.SET_PROFILE_ITEMS,
        profileItems,
        replace,
    };
}
export function getTaskListsError(error) {
    return {
        type: TYPES.GET_TASK_LISTS_ERROR,
        error,
    };
}
export function getTaskListsSuccess(taskLists) {
    return {
        type: TYPES.GET_TASK_LISTS_SUCCESS,
        taskLists,
    };
}
export function snoozeTaskError(taskId, error) {
    return {
        type: TYPES.SNOOZE_TASK_ERROR,
        taskId,
        error,
    };
}
export function snoozeTaskRequest(taskId) {
    return {
        type: TYPES.SNOOZE_TASK_REQUEST,
        taskId,
    };
}
export function snoozeTaskSuccess(task) {
    return {
        type: TYPES.SNOOZE_TASK_SUCCESS,
        task,
    };
}
export function undoSnoozeTaskError(taskId, error) {
    return {
        type: TYPES.UNDO_SNOOZE_TASK_ERROR,
        taskId,
        error,
    };
}
export function undoSnoozeTaskRequest(taskId) {
    return {
        type: TYPES.UNDO_SNOOZE_TASK_REQUEST,
        taskId,
    };
}
export function undoSnoozeTaskSuccess(task) {
    return {
        type: TYPES.UNDO_SNOOZE_TASK_SUCCESS,
        task,
    };
}
export function dismissTaskError(taskId, error) {
    return {
        type: TYPES.DISMISS_TASK_ERROR,
        taskId,
        error,
    };
}
export function dismissTaskRequest(taskId) {
    return {
        type: TYPES.DISMISS_TASK_REQUEST,
        taskId,
    };
}
export function dismissTaskSuccess(task) {
    return {
        type: TYPES.DISMISS_TASK_SUCCESS,
        task,
    };
}
export function undoDismissTaskError(taskId, error) {
    return {
        type: TYPES.UNDO_DISMISS_TASK_ERROR,
        taskId,
        error,
    };
}
export function undoDismissTaskRequest(taskId) {
    return {
        type: TYPES.UNDO_DISMISS_TASK_REQUEST,
        taskId,
    };
}
export function undoDismissTaskSuccess(task) {
    return {
        type: TYPES.UNDO_DISMISS_TASK_SUCCESS,
        task,
    };
}
export function hideTaskListError(taskListId, error) {
    return {
        type: TYPES.HIDE_TASK_LIST_ERROR,
        taskListId,
        error,
    };
}
export function hideTaskListRequest(taskListId) {
    return {
        type: TYPES.HIDE_TASK_LIST_REQUEST,
        taskListId,
    };
}
export function hideTaskListSuccess(taskList) {
    return {
        type: TYPES.HIDE_TASK_LIST_SUCCESS,
        taskList,
        taskListId: taskList.id,
    };
}
export function unhideTaskListError(taskListId, error) {
    return {
        type: TYPES.UNHIDE_TASK_LIST_ERROR,
        taskListId,
        error,
    };
}
export function unhideTaskListRequest(taskListId) {
    return {
        type: TYPES.UNHIDE_TASK_LIST_REQUEST,
        taskListId,
    };
}
export function unhideTaskListSuccess(taskList) {
    return {
        type: TYPES.UNHIDE_TASK_LIST_SUCCESS,
        taskList,
        taskListId: taskList.id,
    };
}
export function optimisticallyCompleteTaskRequest(taskId) {
    return {
        type: TYPES.OPTIMISTICALLY_COMPLETE_TASK_REQUEST,
        taskId,
    };
}
export function keepCompletedTaskListSuccess(taskListId, keepCompletedList) {
    return {
        type: TYPES.KEEP_COMPLETED_TASKS_SUCCESS,
        taskListId,
        keepCompletedTaskList: keepCompletedList,
    };
}
export function visitedTask(taskId) {
    return {
        type: TYPES.VISITED_TASK,
        taskId,
    };
}
export function setPaymentMethods(paymentMethods) {
    return {
        type: TYPES.GET_PAYMENT_METHODS_SUCCESS,
        paymentMethods,
    };
}
export function setEmailPrefill(email) {
    return {
        type: TYPES.SET_EMAIL_PREFILL,
        emailPrefill: email,
    };
}
export function actionTaskError(taskId, error) {
    return {
        type: TYPES.ACTION_TASK_ERROR,
        taskId,
        error,
    };
}
export function actionTaskRequest(taskId) {
    return {
        type: TYPES.ACTION_TASK_REQUEST,
        taskId,
    };
}
export function actionTaskSuccess(task) {
    return {
        type: TYPES.ACTION_TASK_SUCCESS,
        task,
    };
}
export function getProductTypesSuccess(productTypes) {
    return {
        type: TYPES.GET_PRODUCT_TYPES_SUCCESS,
        productTypes,
    };
}
export function getProductTypesError(error) {
    return {
        type: TYPES.GET_PRODUCT_TYPES_ERROR,
        error,
    };
}
export function setProfileProgress(profileProgress) {
    return {
        type: TYPES.SET_PROFILE_PROGRESS,
        profileProgress,
    };
}
export function* keepCompletedTaskList(taskListId) {
    const updateOptionsParams = {
        fincommerce_task_list_keep_completed: 'yes',
    };
    const response = yield controls.dispatch(OPTIONS_STORE_NAME, 'updateOptions', updateOptionsParams);
    if (response && response.success) {
        yield keepCompletedTaskListSuccess(taskListId, 'yes');
    }
}
export function* updateProfileItems(items) {
    yield setIsRequesting('updateProfileItems', true);
    yield setError('updateProfileItems', null);
    try {
        const results = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/profile`,
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
        yield dispatch(optionsStore).invalidateResolution('getOption', [
            'fincommerce_onboarding_profile',
        ]);
        yield dispatch(store).invalidateResolution('getProfileItems', []);
    }
}
export function* updateCoreProfilerStep(step) {
    yield setIsRequesting('updateCoreProfilerStep', true);
    yield setError('updateCoreProfilerStep', null);
    try {
        const results = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/profile/progress/core-profiler/complete`,
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
        yield dispatch(store).invalidateResolution('getProfileProgress', []);
        yield dispatch(store).invalidateResolution('getCoreProfilerCompletedSteps', []);
        yield dispatch(store).invalidateResolution('getMostRecentCoreProfilerStep', []);
    }
}
export function* snoozeTask(id) {
    yield snoozeTaskRequest(id);
    try {
        const task = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/snooze`,
            method: 'POST',
        });
        yield snoozeTaskSuccess(DeprecatedTasks.possiblyPruneTaskData(task, [
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
export function* undoSnoozeTask(id) {
    yield undoSnoozeTaskRequest(id);
    try {
        const task = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/undo_snooze`,
            method: 'POST',
        });
        yield undoSnoozeTaskSuccess(DeprecatedTasks.possiblyPruneTaskData(task, [
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
export function* dismissTask(id) {
    yield dismissTaskRequest(id);
    try {
        const task = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/dismiss`,
            method: 'POST',
        });
        yield dismissTaskSuccess(DeprecatedTasks.possiblyPruneTaskData(task, [
            'isDismissed',
            'isSnoozed',
        ]));
    }
    catch (error) {
        yield dismissTaskError(id, error);
        throw new Error();
    }
}
export function* undoDismissTask(id) {
    yield undoDismissTaskRequest(id);
    try {
        const task = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/undo_dismiss`,
            method: 'POST',
        });
        yield undoDismissTaskSuccess(DeprecatedTasks.possiblyPruneTaskData(task, [
            'isDismissed',
            'isSnoozed',
        ]));
    }
    catch (error) {
        yield undoDismissTaskError(id, error);
        throw new Error();
    }
}
export function* hideTaskList(id) {
    yield hideTaskListRequest(id);
    try {
        const taskList = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/hide`,
            method: 'POST',
        });
        yield hideTaskListSuccess(taskList);
    }
    catch (error) {
        yield hideTaskListError(id, error);
        throw new Error();
    }
}
export function* unhideTaskList(id) {
    yield unhideTaskListRequest(id);
    try {
        const taskList = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/unhide`,
            method: 'POST',
        });
        yield unhideTaskListSuccess(taskList);
    }
    catch (error) {
        yield unhideTaskListError(id, error);
        throw new Error();
    }
}
export function* optimisticallyCompleteTask(id) {
    yield optimisticallyCompleteTaskRequest(id);
}
export function* actionTask(id) {
    yield actionTaskRequest(id);
    try {
        const task = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/tasks/${id}/action`,
            method: 'POST',
        });
        yield actionTaskSuccess(DeprecatedTasks.possiblyPruneTaskData(task, ['isActioned']));
    }
    catch (error) {
        yield actionTaskError(id, error);
        throw new Error();
    }
}
export function* installAndActivatePluginsAsync(plugins, 
// Indicate the origin of the installation request (e.g., core-profiler, marketplace)
// this can be used in the backend to track or do some specific actions based on the source.
source) {
    yield setIsRequesting('installAndActivatePluginsAsync', true);
    try {
        const results = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/plugins/install-and-activate-async`,
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
export function* updateStoreCurrencyAndMeasurementUnits(countryCode) {
    yield setIsRequesting('updateStoreCurrencyAndMeasurementUnits', true);
    try {
        const results = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/onboarding/profile/update-store-currency-and-measurement-units`,
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
export function setJetpackAuthUrl(results, redirectUrl, from = '') {
    return {
        type: TYPES.SET_JETPACK_AUTH_URL,
        results,
        redirectUrl,
        from,
    };
}
export function coreProfilerCompletedError(error) {
    return {
        type: TYPES.CORE_PROFILER_COMPLETED_ERROR,
        error,
    };
}
export function coreProfilerCompletedRequest() {
    return {
        type: TYPES.CORE_PROFILER_COMPLETED_REQUEST,
    };
}
export function coreProfilerCompletedSuccess() {
    return {
        type: TYPES.CORE_PROFILER_COMPLETED_SUCCESS,
    };
}
export function* coreProfilerCompleted() {
    yield coreProfilerCompletedRequest();
    try {
        yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/launch-your-store/initialize-coming-soon`,
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
