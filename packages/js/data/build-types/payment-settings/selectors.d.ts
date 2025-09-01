/**
 * Internal dependencies
 */
import { PaymentsProvider, OfflinePaymentMethodProvider, PaymentsSettingsState, SuggestedPaymentsExtension, SuggestedPaymentsExtensionCategory } from './types';
import { WPDataSelector, WPDataSelectors } from '../types';
export declare function getPaymentProviders(state: PaymentsSettingsState, businessCountry?: string | null): Array<PaymentsProvider>;
export declare function getOfflinePaymentGateways(state: PaymentsSettingsState, businessCountry?: string | null): Array<OfflinePaymentMethodProvider>;
export declare function getSuggestions(state: PaymentsSettingsState, businessCountry?: string | null): Array<SuggestedPaymentsExtension>;
export declare function getSuggestionCategories(state: PaymentsSettingsState, businessCountry?: string | null): Array<SuggestedPaymentsExtensionCategory>;
export declare function isFetching(state: PaymentsSettingsState): boolean;
export declare const getIsWooPayEligible: (state: PaymentsSettingsState) => boolean;
export type PaymentSettingsSelectors = {
    getPaymentProviders: WPDataSelector<typeof getPaymentProviders>;
    getOfflinePaymentGateways: WPDataSelector<typeof getOfflinePaymentGateways>;
    getSuggestions: WPDataSelector<typeof getSuggestions>;
    getSuggestionCategories: WPDataSelector<typeof getSuggestionCategories>;
    isFetching: WPDataSelector<typeof isFetching>;
    getIsWooPayEligible: WPDataSelector<typeof getIsWooPayEligible>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map