"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentProvidersRequest = getPaymentProvidersRequest;
exports.getPaymentProvidersSuccess = getPaymentProvidersSuccess;
exports.getPaymentProvidersError = getPaymentProvidersError;
exports.togglePaymentGateway = togglePaymentGateway;
exports.attachPaymentExtensionSuggestion = attachPaymentExtensionSuggestion;
exports.hidePaymentExtensionSuggestion = hidePaymentExtensionSuggestion;
exports.updateProviderOrdering = updateProviderOrdering;
exports.setIsWooPayEligible = setIsWooPayEligible;
/**
 * External dependencies
 */
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
const constants_1 = require("../constants");
function getPaymentProvidersRequest() {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_PROVIDERS_REQUEST,
    };
}
function getPaymentProvidersSuccess(providers, offlinePaymentGateways, suggestions, suggestionCategories) {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_PROVIDERS_SUCCESS,
        providers,
        offlinePaymentGateways,
        suggestions,
        suggestionCategories,
    };
}
function getPaymentProvidersError(error) {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_PROVIDERS_ERROR,
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
function* togglePaymentGateway(gatewayId, ajaxUrl, gatewayToggleNonce) {
    try {
        // Use apiFetch for the AJAX request
        const result = yield (0, api_fetch_1.default)({
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
function* attachPaymentExtensionSuggestion(url) {
    try {
        // Use apiFetch for the AJAX request
        const result = yield (0, api_fetch_1.default)({
            url,
            method: 'POST',
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}
function* hidePaymentExtensionSuggestion(url) {
    try {
        // Use apiFetch for the AJAX request
        const result = yield (0, api_fetch_1.default)({
            url,
            method: 'POST',
        });
        return result;
    }
    catch (error) {
        throw error;
    }
}
function updateProviderOrdering(orderMap) {
    try {
        (0, api_fetch_1.default)({
            path: constants_1.WC_ADMIN_NAMESPACE + '/settings/payments/providers/order',
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
        type: action_types_1.ACTION_TYPES.UPDATE_PROVIDER_ORDERING,
    };
}
function setIsWooPayEligible(isEligible) {
    return {
        type: action_types_1.ACTION_TYPES.SET_IS_ELIGIBLE,
        isEligible,
    };
}
