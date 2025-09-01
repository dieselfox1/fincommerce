"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingMethods = getShippingMethods;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const actions_1 = require("./actions");
const constants_1 = require("../constants");
function* getShippingMethods(forceDefaultSuggestions = false) {
    let path = constants_1.WC_ADMIN_NAMESPACE + '/shipping-partner-suggestions';
    if (forceDefaultSuggestions) {
        path += '?force_default_suggestions=true';
    }
    yield (0, actions_1.getShippingMethodsRequest)();
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path,
            method: 'GET',
        });
        yield (0, actions_1.getShippingMethodsSuccess)(results);
    }
    catch (error) {
        yield (0, actions_1.getShippingMethodsError)(error);
    }
}
