"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnboardingData = getOnboardingData;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const constants_2 = require("./constants");
const actions_1 = require("./actions");
function* getOnboardingData(sessionEntryPoint) {
    // Check if we're already fetching to prevent concurrent requests.
    const isFetchingData = yield (0, data_controls_1.select)(constants_2.STORE_KEY, 'isOnboardingDataRequestPending');
    if (isFetchingData) {
        return;
    }
    yield (0, actions_1.getOnboardingDataRequest)();
    try {
        const response = yield (0, data_controls_1.apiFetch)({
            method: 'POST', // Use the not-so-semantic POST to avoid caching of response.
            path: `${constants_1.WC_ADMIN_NAMESPACE}/settings/payments/woopayments/onboarding`,
            data: sessionEntryPoint ? { source: sessionEntryPoint } : {},
        });
        yield (0, actions_1.getOnboardingDataSuccess)(response);
    }
    catch (e) {
        yield (0, actions_1.getOnboardingDataError)(e);
    }
}
