import { PaymentProvidersResponse, WooPayEligibilityResponse } from './types';
export declare function getPaymentProviders(businessCountry?: string): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: import("./action-types").ACTION_TYPES.GET_PAYMENT_PROVIDERS_REQUEST;
} | {
    type: import("./action-types").ACTION_TYPES.GET_PAYMENT_PROVIDERS_SUCCESS;
    providers: import("./types").PaymentsProvider[];
    offlinePaymentGateways: import("./types").OfflinePaymentMethodProvider[];
    suggestions: import("./types").SuggestedPaymentsExtension[];
    suggestionCategories: import("./types").SuggestedPaymentsExtensionCategory[];
} | {
    type: import("./action-types").ACTION_TYPES.GET_PAYMENT_PROVIDERS_ERROR;
    error: unknown;
}, void, PaymentProvidersResponse>;
export declare function getOfflinePaymentGateways(businessCountry?: string): Generator<Generator<Object, void, unknown>, void, unknown>;
export declare function getSuggestions(businessCountry?: string): Generator<Generator<Object, void, unknown>, void, unknown>;
export declare function getSuggestionCategories(businessCountry?: string): Generator<Generator<Object, void, unknown>, void, unknown>;
export declare function getWooPayEligibility(): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, WooPayEligibilityResponse, WooPayEligibilityResponse>;
export declare function getIsWooPayEligible(): Generator<{
    type: import("./action-types").ACTION_TYPES.SET_IS_ELIGIBLE;
    isEligible: boolean;
} | Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, WooPayEligibilityResponse, WooPayEligibilityResponse>, void, WooPayEligibilityResponse>;
//# sourceMappingURL=resolvers.d.ts.map