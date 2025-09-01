"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingMethods = void 0;
exports.isShippingMethodsUpdating = isShippingMethodsUpdating;
const getShippingMethods = (state) => {
    return state.shippingMethods || [];
};
exports.getShippingMethods = getShippingMethods;
function isShippingMethodsUpdating(state) {
    return state.isUpdating || false;
}
