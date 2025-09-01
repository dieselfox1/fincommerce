"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivePlugins = getActivePlugins;
exports.getInstalledPlugins = getInstalledPlugins;
exports.isJetpackConnected = isJetpackConnected;
exports.getJetpackConnectionData = getJetpackConnectionData;
exports.getJetpackConnectUrl = getJetpackConnectUrl;
exports.getPaypalOnboardingStatus = getPaypalOnboardingStatus;
exports.getRecommendedPlugins = getRecommendedPlugins;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const options_1 = require("../options");
const constants_2 = require("./constants");
const actions_1 = require("./actions");
const utils_1 = require("../utils");
const _1 = require("./");
// Can be removed in WP 5.9, wp.data is supported in >5.7.
const resolveSelect = data_1.controls && data_1.controls.resolveSelect ? data_1.controls.resolveSelect : data_controls_1.select;
function* getActivePlugins() {
    yield (0, actions_1.setIsRequesting)('getActivePlugins', true);
    try {
        yield (0, utils_1.checkUserCapability)('manage_fincommerce');
        const url = constants_1.WC_ADMIN_NAMESPACE + '/plugins/active';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.updateActivePlugins)(results.plugins, true);
    }
    catch (error) {
        yield (0, actions_1.setError)('getActivePlugins', error);
    }
}
function* getInstalledPlugins() {
    yield (0, actions_1.setIsRequesting)('getInstalledPlugins', true);
    try {
        yield (0, utils_1.checkUserCapability)('manage_fincommerce');
        const url = constants_1.WC_ADMIN_NAMESPACE + '/plugins/installed';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.updateInstalledPlugins)(results.plugins, true);
    }
    catch (error) {
        yield (0, actions_1.setError)('getInstalledPlugins', error);
    }
}
function* isJetpackConnected() {
    yield (0, actions_1.setIsRequesting)('isJetpackConnected', true);
    try {
        const url = constants_1.JETPACK_NAMESPACE + '/connection';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.updateIsJetpackConnected)(results.hasConnectedOwner);
    }
    catch (error) {
        yield (0, actions_1.setError)('isJetpackConnected', error);
    }
    yield (0, actions_1.setIsRequesting)('isJetpackConnected', false);
}
function* getJetpackConnectionData() {
    yield (0, actions_1.setIsRequesting)('getJetpackConnectionData', true);
    try {
        const isConnected = yield resolveSelect(_1.store, 'isJetpackConnected');
        // See API side permission check here: https://github.com/Automattic/jetpack-connection/blob/trunk/src/class-manager.php#L1560-L1568.
        yield (0, utils_1.checkUserCapability)(isConnected ? 'read' : 'manage_options');
        const url = constants_1.JETPACK_NAMESPACE + '/connection/data';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.updateJetpackConnectionData)(results);
    }
    catch (error) {
        yield (0, actions_1.setError)('getJetpackConnectionData', error);
    }
    yield (0, actions_1.setIsRequesting)('getJetpackConnectionData', false);
}
function* getJetpackConnectUrl(query) {
    yield (0, actions_1.setIsRequesting)('getJetpackConnectUrl', true);
    try {
        const url = (0, url_1.addQueryArgs)(constants_1.WC_ADMIN_NAMESPACE + '/plugins/connect-jetpack', query);
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.updateJetpackConnectUrl)(query.redirect_url, results.connectAction);
    }
    catch (error) {
        yield (0, actions_1.setError)('getJetpackConnectUrl', error);
    }
    yield (0, actions_1.setIsRequesting)('getJetpackConnectUrl', false);
}
function* setOnboardingStatusWithOptions() {
    const options = yield resolveSelect(options_1.OPTIONS_STORE_NAME, 'getOption', 'fincommerce-ppcp-settings');
    const onboarded = options.merchant_email_production &&
        options.merchant_id_production &&
        options.client_id_production &&
        options.client_secret_production;
    yield (0, actions_1.setPaypalOnboardingStatus)({
        production: {
            state: onboarded ? 'onboarded' : 'unknown',
            onboarded: onboarded ? true : false,
        },
    });
}
function* getPaypalOnboardingStatus() {
    yield (0, actions_1.setIsRequesting)('getPaypalOnboardingStatus', true);
    const errorData = yield resolveSelect(_1.store, 'getPluginsError', 'getPaypalOnboardingStatus');
    if (errorData && errorData.data && errorData.data.status === 404) {
        // The get-status request doesn't exist fall back to using options.
        yield setOnboardingStatusWithOptions();
    }
    else {
        try {
            const url = constants_2.PAYPAL_NAMESPACE + '/onboarding/get-status';
            const results = yield (0, data_controls_1.apiFetch)({
                path: url,
                method: 'GET',
            });
            yield (0, actions_1.setPaypalOnboardingStatus)(results);
        }
        catch (error) {
            yield setOnboardingStatusWithOptions();
            yield (0, actions_1.setError)('getPaypalOnboardingStatus', error);
        }
    }
    yield (0, actions_1.setIsRequesting)('getPaypalOnboardingStatus', false);
}
const SUPPORTED_TYPES = ['payments'];
function* getRecommendedPlugins(type) {
    if (!SUPPORTED_TYPES.includes(type)) {
        return [];
    }
    yield (0, actions_1.setIsRequesting)('getRecommendedPlugins', true);
    try {
        const url = constants_1.WC_ADMIN_NAMESPACE + '/payment-gateway-suggestions';
        const results = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.setRecommendedPlugins)(type, results);
    }
    catch (error) {
        yield (0, actions_1.setError)('getRecommendedPlugins', error);
    }
    yield (0, actions_1.setIsRequesting)('getRecommendedPlugins', false);
}
