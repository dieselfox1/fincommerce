"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostRecentCoreProfilerStep = exports.getCoreProfilerCompletedSteps = exports.getJetpackAuthUrl = exports.getProductTypes = exports.getEmailPrefill = exports.isOnboardingRequesting = exports.getOnboardingError = exports.getPaymentGatewaySuggestions = exports.getTask = exports.getTaskList = exports.getTaskListsByIds = exports.getTaskLists = exports.getProfileProgress = exports.getProfileItems = exports.getFreeExtensions = void 0;
/**
 * External dependencies
 */
const rememo_1 = __importDefault(require("rememo"));
const getFreeExtensions = (state) => {
    return state.freeExtensions || [];
};
exports.getFreeExtensions = getFreeExtensions;
const getProfileItems = (state) => {
    return state.profileItems || {};
};
exports.getProfileItems = getProfileItems;
const getProfileProgress = (state) => {
    return state.profileProgress || {};
};
exports.getProfileProgress = getProfileProgress;
exports.getTaskLists = (0, rememo_1.default)((state) => {
    return Object.values(state.taskLists);
}, (state) => [state.taskLists]);
exports.getTaskListsByIds = (0, rememo_1.default)((state, ids) => {
    return ids.map((id) => state.taskLists[id]);
}, (state, ids) => ids.map((id) => state.taskLists[id]));
const getTaskList = (state, selector) => {
    return state.taskLists[selector];
};
exports.getTaskList = getTaskList;
const getTask = (state, selector) => {
    return Object.keys(state.taskLists).reduce((value, listId) => {
        return (value ||
            state.taskLists[listId].tasks.find((task) => task.id === selector));
    }, undefined);
};
exports.getTask = getTask;
const getPaymentGatewaySuggestions = (state) => {
    return state.paymentMethods || [];
};
exports.getPaymentGatewaySuggestions = getPaymentGatewaySuggestions;
const getOnboardingError = (state, selector) => {
    return state.errors[selector] || false;
};
exports.getOnboardingError = getOnboardingError;
const isOnboardingRequesting = (state, selector) => {
    return state.requesting[selector] || false;
};
exports.isOnboardingRequesting = isOnboardingRequesting;
const getEmailPrefill = (state) => {
    return state.emailPrefill || '';
};
exports.getEmailPrefill = getEmailPrefill;
const getProductTypes = (state) => {
    return state.productTypes || {};
};
exports.getProductTypes = getProductTypes;
const getJetpackAuthUrl = (state, query) => {
    return state.jetpackAuthUrls[query.redirectUrl] || '';
};
exports.getJetpackAuthUrl = getJetpackAuthUrl;
exports.getCoreProfilerCompletedSteps = (0, rememo_1.default)((state) => {
    return state.profileProgress || {};
}, (state) => [state.profileProgress]);
exports.getMostRecentCoreProfilerStep = (0, rememo_1.default)((state) => {
    const completedSteps = state.profileProgress || {};
    return (Object.entries(completedSteps).sort((a, b) => {
        const dateA = new Date(a[1].completed_at);
        const dateB = new Date(b[1].completed_at);
        return dateB.getTime() - dateA.getTime();
    })[0]?.[0] || null);
}, (state) => [state.profileProgress]);
