"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnboardingDataRequest = getOnboardingDataRequest;
exports.getOnboardingDataSuccess = getOnboardingDataSuccess;
exports.getOnboardingDataError = getOnboardingDataError;
function getOnboardingDataRequest() {
    return {
        type: 'GET_WOOPAYMENTS_ONBOARDING_DATA_REQUEST',
    };
}
function getOnboardingDataSuccess(data) {
    return {
        type: 'GET_WOOPAYMENTS_ONBOARDING_DATA_SUCCESS',
        steps: data.steps,
        context: data.context,
    };
}
function getOnboardingDataError(error) {
    return {
        type: 'GET_WOOPAYMENTS_ONBOARDING_DATA_ERROR',
        error,
    };
}
