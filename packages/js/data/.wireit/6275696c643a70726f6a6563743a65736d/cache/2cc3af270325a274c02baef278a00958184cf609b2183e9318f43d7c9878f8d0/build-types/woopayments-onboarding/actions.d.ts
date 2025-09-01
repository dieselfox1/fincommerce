/**
 * Internal dependencies
 */
import { OnboardingDataResponse } from './types';
export declare function getOnboardingDataRequest(): {
    type: "GET_WOOPAYMENTS_ONBOARDING_DATA_REQUEST";
};
export declare function getOnboardingDataSuccess(data: OnboardingDataResponse): {
    type: "GET_WOOPAYMENTS_ONBOARDING_DATA_SUCCESS";
    steps: import("./types").StepContent[];
    context: object;
};
export declare function getOnboardingDataError(error: unknown): {
    type: "GET_WOOPAYMENTS_ONBOARDING_DATA_ERROR";
    error: unknown;
};
export type Action = ReturnType<typeof getOnboardingDataRequest> | ReturnType<typeof getOnboardingDataSuccess> | ReturnType<typeof getOnboardingDataError>;
//# sourceMappingURL=actions.d.ts.map