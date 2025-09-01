"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileItems = getProfileItems;
exports.getProfileProgress = getProfileProgress;
exports.getCoreProfilerCompletedSteps = getCoreProfilerCompletedSteps;
exports.getMostRecentCoreProfilerStep = getMostRecentCoreProfilerStep;
exports.getEmailPrefill = getEmailPrefill;
exports.getTaskLists = getTaskLists;
exports.getTaskListsByIds = getTaskListsByIds;
exports.getTaskList = getTaskList;
exports.getTask = getTask;
exports.getPaymentGatewaySuggestions = getPaymentGatewaySuggestions;
exports.getFreeExtensions = getFreeExtensions;
exports.getProductTypes = getProductTypes;
exports.getJetpackAuthUrl = getJetpackAuthUrl;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const constants_2 = require("../constants");
const actions_1 = require("./actions");
const deprecated_tasks_1 = require("./deprecated-tasks");
const utils_1 = require("../utils");
const resolveSelect = data_1.controls && data_1.controls.resolveSelect ? data_1.controls.resolveSelect : data_controls_1.select;
function* getProfileItems() {
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_2.WC_ADMIN_NAMESPACE + '/onboarding/profile',
            method: 'GET',
        });
        yield (0, actions_1.setProfileItems)(results, true);
    }
    catch (error) {
        yield (0, actions_1.setError)('getProfileItems', error);
    }
}
function* getProfileProgress() {
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_2.WC_ADMIN_NAMESPACE + '/onboarding/profile/progress',
            method: 'GET',
        });
        yield (0, actions_1.setProfileProgress)(results.core_profiler_completed_steps);
    }
    catch (error) {
        yield (0, actions_1.setError)('getProfileProgress', error);
    }
}
function* getCoreProfilerCompletedSteps() {
    yield resolveSelect(constants_1.STORE_NAME, 'getProfileProgress');
}
function* getMostRecentCoreProfilerStep() {
    yield resolveSelect(constants_1.STORE_NAME, 'getProfileProgress');
}
function* getEmailPrefill() {
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_2.WC_ADMIN_NAMESPACE +
                '/onboarding/profile/experimental_get_email_prefill',
            method: 'GET',
        });
        yield (0, actions_1.setEmailPrefill)(results.email);
    }
    catch (error) {
        yield (0, actions_1.setError)('getEmailPrefill', error);
    }
}
function* getTaskLists() {
    const deprecatedTasks = new deprecated_tasks_1.DeprecatedTasks();
    try {
        yield (0, utils_1.checkUserCapability)('manage_fincommerce');
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_2.WC_ADMIN_NAMESPACE + '/onboarding/tasks',
            method: deprecatedTasks.hasDeprecatedTasks() ? 'POST' : 'GET',
            data: deprecatedTasks.getPostData(),
        });
        deprecatedTasks.mergeDeprecatedCallbackFunctions(results);
        yield (0, actions_1.getTaskListsSuccess)(results);
    }
    catch (error) {
        yield (0, actions_1.getTaskListsError)(error);
    }
}
function* getTaskListsByIds() {
    yield resolveSelect(constants_1.STORE_NAME, 'getTaskLists');
}
function* getTaskList() {
    yield resolveSelect(constants_1.STORE_NAME, 'getTaskLists');
}
function* getTask() {
    yield resolveSelect(constants_1.STORE_NAME, 'getTaskLists');
}
function* getPaymentGatewaySuggestions(forceDefaultSuggestions = false) {
    let path = constants_2.WC_ADMIN_NAMESPACE + '/payment-gateway-suggestions';
    if (forceDefaultSuggestions) {
        path += '?force_default_suggestions=true';
    }
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path,
            method: 'GET',
        });
        yield (0, actions_1.setPaymentMethods)(results);
    }
    catch (error) {
        yield (0, actions_1.setError)('getPaymentGatewaySuggestions', error);
    }
}
function* getFreeExtensions() {
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_2.WC_ADMIN_NAMESPACE + '/onboarding/free-extensions',
            method: 'GET',
        });
        yield (0, actions_1.getFreeExtensionsSuccess)(results);
    }
    catch (error) {
        yield (0, actions_1.getFreeExtensionsError)(error);
    }
}
function* getProductTypes() {
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_2.WC_ADMIN_NAMESPACE + '/onboarding/product-types',
            method: 'GET',
        });
        yield (0, actions_1.getProductTypesSuccess)(results);
    }
    catch (error) {
        yield (0, actions_1.getProductTypesError)(error);
    }
}
function* getJetpackAuthUrl(query) {
    try {
        let path = constants_2.WC_ADMIN_NAMESPACE +
            '/onboarding/plugins/jetpack-authorization-url?redirect_url=' +
            encodeURIComponent(query.redirectUrl);
        if (query.from) {
            path += '&from=' + query.from;
        }
        const results = yield (0, data_controls_1.apiFetch)({
            path,
            method: 'GET',
        });
        yield (0, actions_1.setJetpackAuthUrl)(results, query.redirectUrl, query.from ?? '');
    }
    catch (error) {
        yield (0, actions_1.setError)('getJetpackAuthUrl', error);
    }
}
