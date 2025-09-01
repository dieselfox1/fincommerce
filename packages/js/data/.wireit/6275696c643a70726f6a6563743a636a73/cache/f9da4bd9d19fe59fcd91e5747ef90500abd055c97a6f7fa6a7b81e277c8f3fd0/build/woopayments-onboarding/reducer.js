"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    steps: [],
    context: {},
    isFetching: false,
    errors: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WOOPAYMENTS_ONBOARDING_DATA_REQUEST':
            return {
                ...state,
                isFetching: true,
            };
        case 'GET_WOOPAYMENTS_ONBOARDING_DATA_SUCCESS':
            return {
                ...state,
                steps: action.steps,
                context: action.context,
                isFetching: false,
            };
        case 'GET_WOOPAYMENTS_ONBOARDING_DATA_ERROR':
            return {
                ...state,
                errors: {
                    ...state.errors,
                    getOnboardingData: action.error,
                },
                isFetching: false,
            };
        default:
            return state;
    }
};
exports.default = reducer;
