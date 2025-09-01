export function getOnboardingDataRequest() {
    return {
        type: 'GET_WOOPAYMENTS_ONBOARDING_DATA_REQUEST',
    };
}
export function getOnboardingDataSuccess(data) {
    return {
        type: 'GET_WOOPAYMENTS_ONBOARDING_DATA_SUCCESS',
        steps: data.steps,
        context: data.context,
    };
}
export function getOnboardingDataError(error) {
    return {
        type: 'GET_WOOPAYMENTS_ONBOARDING_DATA_ERROR',
        error,
    };
}
