"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentProviders = getPaymentProviders;
exports.getOfflinePaymentGateways = getOfflinePaymentGateways;
exports.getSuggestions = getSuggestions;
exports.getSuggestionCategories = getSuggestionCategories;
exports.getWooPayEligibility = getWooPayEligibility;
exports.getIsWooPayEligible = getIsWooPayEligible;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const actions_1 = require("./actions");
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const resolveSelect = data_1.controls?.resolveSelect ?? data_controls_1.select;
function* getPaymentProviders(businessCountry) {
    yield (0, actions_1.getPaymentProvidersRequest)();
    try {
        const paymentProvidersResponse = yield (0, data_controls_1.apiFetch)({
            method: 'POST', // Use the not-so-semantic POST to avoid caching of response.
            path: constants_1.WC_ADMIN_NAMESPACE + '/settings/payments/providers',
            data: businessCountry ? { location: businessCountry } : {},
        });
        yield (0, actions_1.getPaymentProvidersSuccess)(paymentProvidersResponse.providers, paymentProvidersResponse.offline_payment_methods, paymentProvidersResponse.suggestions, paymentProvidersResponse.suggestion_categories);
    }
    catch (e) {
        yield (0, actions_1.getPaymentProvidersError)(e);
    }
}
function* getPaymentProvidersIfNeeded(businessCountry) {
    // Just make sure the payment providers resolver has been called.
    yield resolveSelect(constants_2.STORE_KEY, 'getPaymentProviders', businessCountry);
}
function* getOfflinePaymentGateways(businessCountry) {
    yield getPaymentProvidersIfNeeded(businessCountry);
}
function* getSuggestions(businessCountry) {
    yield getPaymentProvidersIfNeeded(businessCountry);
}
function* getSuggestionCategories(businessCountry) {
    yield getPaymentProvidersIfNeeded(businessCountry);
}
function* getWooPayEligibility() {
    const response = yield (0, data_controls_1.apiFetch)({
        method: 'POST',
        path: `${constants_1.WC_ADMIN_NAMESPACE}/settings/payments/woopayments/woopay-eligibility`,
    });
    return response;
}
function* getIsWooPayEligible() {
    const response = yield getWooPayEligibility();
    yield (0, actions_1.setIsWooPayEligible)(response.is_eligible);
}
