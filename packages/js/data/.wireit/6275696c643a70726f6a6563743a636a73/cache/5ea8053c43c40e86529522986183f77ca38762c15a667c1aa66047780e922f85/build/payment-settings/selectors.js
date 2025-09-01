"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsWooPayEligible = void 0;
exports.getPaymentProviders = getPaymentProviders;
exports.getOfflinePaymentGateways = getOfflinePaymentGateways;
exports.getSuggestions = getSuggestions;
exports.getSuggestionCategories = getSuggestionCategories;
exports.isFetching = isFetching;
function getPaymentProviders(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.providers;
}
function getOfflinePaymentGateways(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.offlinePaymentGateways;
}
function getSuggestions(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.suggestions;
}
function getSuggestionCategories(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.suggestionCategories;
}
function isFetching(state) {
    return state.isFetching || false;
}
const getIsWooPayEligible = (state) => state.isWooPayEligible;
exports.getIsWooPayEligible = getIsWooPayEligible;
