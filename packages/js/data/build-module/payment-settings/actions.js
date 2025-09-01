/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */
import { ACTION_TYPES } from './action-types';
import { WC_ADMIN_NAMESPACE } from '../constants';
export function getPaymentProvidersRequest() {
    return {
        type: ACTION_TYPES.GET_PAYMENT_PROVIDERS_REQUEST,
    };
}
export function getPaymentProvidersSuccess(providers, offlinePaymentGateways, suggestions, suggestionCategories) {
    return {
        type: ACTION_TYPES.GET_PAYMENT_PROVIDERS_SUCCESS,
        providers,
        offlinePaymentGateways,
        suggestions,
        suggestionCategories,
    };
}
export function getPaymentProvidersError(error) {
    return {
        type: ACTION_TYPES.GET_PAYMENT_PROVIDERS_ERROR,
        error,
    };
}
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
export function* togglePaymentGateway(gatewayId, ajaxUrl, gatewayToggleNonce) {
    try {
        // Use apiFetch for the AJAX request
        const result = yield apiFetch({
            url: ajaxUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'fincommerce_toggle_gateway_enabled',
                security: gatewayToggleNonce,
                gateway_id: gatewayId,
            }),
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}
export function* attachPaymentExtensionSuggestion(url) {
    try {
        // Use apiFetch for the AJAX request
        const result = yield apiFetch({
            url,
            method: 'POST',
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}
export function* hidePaymentExtensionSuggestion(url) {
    try {
        // Use apiFetch for the AJAX request
        const result = yield apiFetch({
            url,
            method: 'POST',
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}
export function updateProviderOrdering(orderMap) {
    try {
        apiFetch({
            path: WC_ADMIN_NAMESPACE + '/settings/payments/providers/order',
            method: 'POST',
            data: {
                order_map: orderMap,
            },
        });
    }
    catch (error) {
        throw error;
    }
    return {
        type: ACTION_TYPES.UPDATE_PROVIDER_ORDERING,
    };
}
export function setIsWooPayEligible(isEligible) {
    return {
        type: ACTION_TYPES.SET_IS_ELIGIBLE,
        isEligible,
    };
}
