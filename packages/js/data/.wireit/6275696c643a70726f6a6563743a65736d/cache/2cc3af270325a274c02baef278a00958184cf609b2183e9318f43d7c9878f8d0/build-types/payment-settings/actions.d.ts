/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
import { PaymentsProvider, OfflinePaymentMethodProvider, OrderMap, SuggestedPaymentsExtension, SuggestedPaymentsExtensionCategory, EnableGatewayResponse } from './types';
export declare function getPaymentProvidersRequest(): {
    type: ACTION_TYPES.GET_PAYMENT_PROVIDERS_REQUEST;
};
export declare function getPaymentProvidersSuccess(providers: PaymentsProvider[], offlinePaymentGateways: OfflinePaymentMethodProvider[], suggestions: SuggestedPaymentsExtension[], suggestionCategories: SuggestedPaymentsExtensionCategory[]): {
    type: ACTION_TYPES.GET_PAYMENT_PROVIDERS_SUCCESS;
    providers: PaymentsProvider[];
    offlinePaymentGateways: OfflinePaymentMethodProvider[];
    suggestions: SuggestedPaymentsExtension[];
    suggestionCategories: SuggestedPaymentsExtensionCategory[];
};
export declare function getPaymentProvidersError(error: unknown): {
    type: ACTION_TYPES.GET_PAYMENT_PROVIDERS_ERROR;
    error: unknown;
};
/**
 * Toggle the enabled state of a payment gateway.
 * This function makes an AJAX request to the server to toggle the gateway's enabled state.
 *
 * See `WC_AJAX::toggle_gateway_enabled()` for the response structure.
 *
 * @param {string} gatewayId          The ID of the payment gateway to toggle.
 * @param {string} ajaxUrl            The URL to send the AJAX request to, typically the admin-ajax.php endpoint.
 * @param {string} gatewayToggleNonce The nonce for security, used to verify the request.
 *
 * @return {Generator<void, EnableGatewayResponse, unknown>} Server response with the updated gateway state.
 */
export declare function togglePaymentGateway(gatewayId: string, ajaxUrl: string, gatewayToggleNonce: string): Generator<Promise<unknown>, EnableGatewayResponse, EnableGatewayResponse>;
export declare function attachPaymentExtensionSuggestion(url: string): Generator<Promise<unknown>, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare function hidePaymentExtensionSuggestion(url: string): Generator<Promise<unknown>, {
    success: boolean;
}, {
    success: boolean;
}>;
export declare function updateProviderOrdering(orderMap: OrderMap): {
    type: ACTION_TYPES.UPDATE_PROVIDER_ORDERING;
};
export declare function setIsWooPayEligible(isEligible: boolean): {
    type: ACTION_TYPES.SET_IS_ELIGIBLE;
    isEligible: boolean;
};
export type Actions = ReturnType<typeof getPaymentProvidersRequest> | ReturnType<typeof getPaymentProvidersSuccess> | ReturnType<typeof getPaymentProvidersError> | ReturnType<typeof togglePaymentGateway> | ReturnType<typeof attachPaymentExtensionSuggestion> | ReturnType<typeof hidePaymentExtensionSuggestion> | ReturnType<typeof updateProviderOrdering> | ReturnType<typeof setIsWooPayEligible>;
//# sourceMappingURL=actions.d.ts.map