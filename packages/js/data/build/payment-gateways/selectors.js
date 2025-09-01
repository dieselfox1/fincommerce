"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentGateway = getPaymentGateway;
exports.getPaymentGateways = getPaymentGateways;
exports.getPaymentGatewayError = getPaymentGatewayError;
exports.isPaymentGatewayUpdating = isPaymentGatewayUpdating;
function getPaymentGateway(state, id) {
    return state.paymentGateways.find((paymentGateway) => paymentGateway.id === id);
}
function getPaymentGateways(state) {
    return state.paymentGateways;
}
function getPaymentGatewayError(state, selector) {
    return state.errors[selector] || null;
}
function isPaymentGatewayUpdating(state) {
    return state.isUpdating || false;
}
