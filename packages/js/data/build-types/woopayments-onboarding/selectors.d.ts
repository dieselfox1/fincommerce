/**
 * Internal dependencies
 */
import { OnboardingState } from './types';
import { WPDataSelector, WPDataSelectors } from '../types';
export declare const getOnboardingData: (state: OnboardingState, sessionEntryPoint?: string | null) => OnboardingState;
export declare const isOnboardingDataRequestPending: (state: OnboardingState) => boolean;
export declare const getOnboardingDataError: (state: OnboardingState) => unknown;
export type WooPaymentsOnboardingSelectors = {
    getOnboardingData: WPDataSelector<typeof getOnboardingData>;
    isOnboardingDataRequestPending: WPDataSelector<typeof isOnboardingDataRequestPending>;
    getOnboardingDataError: WPDataSelector<typeof getOnboardingDataError>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map