/**
 * External dependencies
 */
import { apiFetch, select } from '@wordpress/data-controls';
import { controls } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */
import { WC_ADMIN_NAMESPACE, JETPACK_NAMESPACE } from '../constants';
import { OPTIONS_STORE_NAME } from '../options';
import { PAYPAL_NAMESPACE } from './constants';
import { setIsRequesting, updateActivePlugins, setError, updateInstalledPlugins, updateIsJetpackConnected, updateJetpackConnectUrl, updateJetpackConnectionData, setPaypalOnboardingStatus, setRecommendedPlugins, } from './actions';
import { checkUserCapability } from '../utils';
import { store } from './';
// Can be removed in WP 5.9, wp.data is supported in >5.7.
const resolveSelect = controls && controls.resolveSelect ? controls.resolveSelect : select;
export function* getActivePlugins() {
    yield setIsRequesting('getActivePlugins', true);
    try {
        yield checkUserCapability('manage_fincommerce');
        const url = WC_ADMIN_NAMESPACE + '/plugins/active';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        yield updateActivePlugins(results.plugins, true);
    }
    catch (error) {
        yield setError('getActivePlugins', error);
    }
}
export function* getInstalledPlugins() {
    yield setIsRequesting('getInstalledPlugins', true);
    try {
        yield checkUserCapability('manage_fincommerce');
        const url = WC_ADMIN_NAMESPACE + '/plugins/installed';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        yield updateInstalledPlugins(results.plugins, true);
    }
    catch (error) {
        yield setError('getInstalledPlugins', error);
    }
}
export function* isJetpackConnected() {
    yield setIsRequesting('isJetpackConnected', true);
    try {
        const url = JETPACK_NAMESPACE + '/connection';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        yield updateIsJetpackConnected(results.hasConnectedOwner);
    }
    catch (error) {
        yield setError('isJetpackConnected', error);
    }
    yield setIsRequesting('isJetpackConnected', false);
}
export function* getJetpackConnectionData() {
    yield setIsRequesting('getJetpackConnectionData', true);
    try {
        const isConnected = yield resolveSelect(store, 'isJetpackConnected');
        // See API side permission check here: https://github.com/Automattic/jetpack-connection/blob/trunk/src/class-manager.php#L1560-L1568.
        yield checkUserCapability(isConnected ? 'read' : 'manage_options');
        const url = JETPACK_NAMESPACE + '/connection/data';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        yield updateJetpackConnectionData(results);
    }
    catch (error) {
        yield setError('getJetpackConnectionData', error);
    }
    yield setIsRequesting('getJetpackConnectionData', false);
}
export function* getJetpackConnectUrl(query) {
    yield setIsRequesting('getJetpackConnectUrl', true);
    try {
        const url = addQueryArgs(WC_ADMIN_NAMESPACE + '/plugins/connect-jetpack', query);
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        yield updateJetpackConnectUrl(query.redirect_url, results.connectAction);
    }
    catch (error) {
        yield setError('getJetpackConnectUrl', error);
    }
    yield setIsRequesting('getJetpackConnectUrl', false);
}
function* setOnboardingStatusWithOptions() {
    const options = yield resolveSelect(OPTIONS_STORE_NAME, 'getOption', 'fincommerce-ppcp-settings');
    const onboarded = options.merchant_email_production &&
        options.merchant_id_production &&
        options.client_id_production &&
        options.client_secret_production;
    yield setPaypalOnboardingStatus({
        production: {
            state: onboarded ? 'onboarded' : 'unknown',
            onboarded: onboarded ? true : false,
        },
    });
}
export function* getPaypalOnboardingStatus() {
    yield setIsRequesting('getPaypalOnboardingStatus', true);
    const errorData = yield resolveSelect(store, 'getPluginsError', 'getPaypalOnboardingStatus');
    if (errorData && errorData.data && errorData.data.status === 404) {
        // The get-status request doesn't exist fall back to using options.
        yield setOnboardingStatusWithOptions();
    }
    else {
        try {
            const url = PAYPAL_NAMESPACE + '/onboarding/get-status';
            const results = yield apiFetch({
                path: url,
                method: 'GET',
            });
            yield setPaypalOnboardingStatus(results);
        }
        catch (error) {
            yield setOnboardingStatusWithOptions();
            yield setError('getPaypalOnboardingStatus', error);
        }
    }
    yield setIsRequesting('getPaypalOnboardingStatus', false);
}
const SUPPORTED_TYPES = ['payments'];
export function* getRecommendedPlugins(type) {
    if (!SUPPORTED_TYPES.includes(type)) {
        return [];
    }
    yield setIsRequesting('getRecommendedPlugins', true);
    try {
        const url = WC_ADMIN_NAMESPACE + '/payment-gateway-suggestions';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        yield setRecommendedPlugins(type, results);
    }
    catch (error) {
        yield setError('getRecommendedPlugins', error);
    }
    yield setIsRequesting('getRecommendedPlugins', false);
}
