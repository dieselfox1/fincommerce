export function getPaymentProviders(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.providers;
}
export function getOfflinePaymentGateways(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.offlinePaymentGateways;
}
export function getSuggestions(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.suggestions;
}
export function getSuggestionCategories(state, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
businessCountry) {
    return state.suggestionCategories;
}
export function isFetching(state) {
    return state.isFetching || false;
}
export const getIsWooPayEligible = (state) => state.isWooPayEligible;
