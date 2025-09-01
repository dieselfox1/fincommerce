export const getShippingMethods = (state) => {
    return state.shippingMethods || [];
};
export function isShippingMethodsUpdating(state) {
    return state.isUpdating || false;
}
