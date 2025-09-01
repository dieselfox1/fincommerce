"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentGatewaysRequest = getPaymentGatewaysRequest;
exports.getPaymentGatewaysSuccess = getPaymentGatewaysSuccess;
exports.getPaymentGatewaysError = getPaymentGatewaysError;
exports.getPaymentGatewayRequest = getPaymentGatewayRequest;
exports.getPaymentGatewayError = getPaymentGatewayError;
exports.getPaymentGatewaySuccess = getPaymentGatewaySuccess;
exports.updatePaymentGatewaySuccess = updatePaymentGatewaySuccess;
exports.updatePaymentGatewayRequest = updatePaymentGatewayRequest;
exports.updatePaymentGatewayError = updatePaymentGatewayError;
exports.updatePaymentGateway = updatePaymentGateway;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
const constants_1 = require("./constants");
function getPaymentGatewaysRequest() {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_GATEWAYS_REQUEST,
    };
}
function getPaymentGatewaysSuccess(paymentGateways) {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_GATEWAYS_SUCCESS,
        paymentGateways,
    };
}
function getPaymentGatewaysError(error) {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_GATEWAYS_ERROR,
        error,
    };
}
function getPaymentGatewayRequest() {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_GATEWAY_REQUEST,
    };
}
function getPaymentGatewayError(error) {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_GATEWAY_ERROR,
        error,
    };
}
function getPaymentGatewaySuccess(paymentGateway) {
    return {
        type: action_types_1.ACTION_TYPES.GET_PAYMENT_GATEWAY_SUCCESS,
        paymentGateway,
    };
}
function updatePaymentGatewaySuccess(paymentGateway) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_PAYMENT_GATEWAY_SUCCESS,
        paymentGateway,
    };
}
function updatePaymentGatewayRequest() {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_PAYMENT_GATEWAY_REQUEST,
    };
}
function updatePaymentGatewayError(error) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_PAYMENT_GATEWAY_ERROR,
        error,
    };
}
function* updatePaymentGateway(id, data) {
    try {
        yield updatePaymentGatewayRequest();
        const response = yield (0, data_controls_1.apiFetch)({
            method: 'PUT',
            path: constants_1.API_NAMESPACE + '/payment_gateways/' + id,
            body: JSON.stringify(data),
        });
        if (response && response.id === id) {
            // Update the already loaded payment gateway list with the new data
            yield updatePaymentGatewaySuccess(response);
            return response;
        }
    }
    catch (e) {
        yield updatePaymentGatewayError(e);
        throw e;
    }
}
