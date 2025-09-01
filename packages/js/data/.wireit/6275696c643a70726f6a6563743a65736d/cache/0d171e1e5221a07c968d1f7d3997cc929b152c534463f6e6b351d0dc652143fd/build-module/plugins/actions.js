/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
import { __, _n, sprintf } from '@wordpress/i18n';
import { controls } from '@wordpress/data';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import { ACTION_TYPES as TYPES } from './action-types';
import { WC_ADMIN_NAMESPACE } from '../constants';
import { isRestApiError } from '../types';
class PluginError extends Error {
    data;
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
const isPluginResponseError = (plugins, error) => typeof error === 'object' && error !== null && plugins[0] in error;
const formatErrorMessage = (actionType = 'install', plugins, rawErrorMessage) => {
    return sprintf(
    /* translators: %(actionType): install or activate (the plugin). %(pluginName): a plugin slug (e.g. fincommerce-services). %(error): a single error message or in plural a comma separated error message list.*/
    _n('Could not %(actionType)s %(pluginName)s plugin, %(error)s', 'Could not %(actionType)s the following plugins: %(pluginName)s with these Errors: %(error)s', Object.keys(plugins).length || 1, 'fincommerce'), {
        actionType,
        pluginName: plugins.join(', '),
        error: rawErrorMessage,
    });
};
export function updateActivePlugins(active, replace = false) {
    return {
        type: TYPES.UPDATE_ACTIVE_PLUGINS,
        active,
        replace,
    };
}
export function updateInstalledPlugins(installed, replace = false) {
    return {
        type: TYPES.UPDATE_INSTALLED_PLUGINS,
        installed,
        replace,
    };
}
export function setIsRequesting(selector, isRequesting) {
    return {
        type: TYPES.SET_IS_REQUESTING,
        selector,
        isRequesting,
    };
}
export function setError(selector, error) {
    return {
        type: TYPES.SET_ERROR,
        selector,
        error,
    };
}
export function updateIsJetpackConnected(jetpackConnection) {
    return {
        type: TYPES.UPDATE_JETPACK_CONNECTION,
        jetpackConnection,
    };
}
export function updateJetpackConnectionData(results) {
    return {
        type: TYPES.UPDATE_JETPACK_CONNECTION_DATA,
        results,
    };
}
export function updateJetpackConnectUrl(redirectUrl, jetpackConnectUrl) {
    return {
        type: TYPES.UPDATE_JETPACK_CONNECT_URL,
        jetpackConnectUrl,
        redirectUrl,
    };
}
export const createErrorNotice = (errorMessage) => {
    return controls.dispatch('core/notices', 'createNotice', 'error', errorMessage);
};
export function setPaypalOnboardingStatus(status) {
    return {
        type: TYPES.SET_PAYPAL_ONBOARDING_STATUS,
        paypalOnboardingStatus: status,
    };
}
export function setRecommendedPlugins(type, plugins) {
    return {
        type: TYPES.SET_RECOMMENDED_PLUGINS,
        recommendedType: type,
        plugins,
    };
}
function* handlePluginAPIError(actionType, plugins, error) {
    let rawErrorMessage;
    if (isPluginResponseError(plugins, error)) {
        // Backend error messages are in the form of { plugin-slug: [ error messages ] }.
        rawErrorMessage = Object.values(error).join(', \n');
    }
    else {
        // Other error such as API connection errors.
        rawErrorMessage =
            isRestApiError(error) || error instanceof Error
                ? error.message
                : JSON.stringify(error);
    }
    // Track the error.
    switch (actionType) {
        case 'install':
            recordEvent('install_plugins_error', {
                plugins: plugins.join(', '),
                message: rawErrorMessage,
            });
            break;
        case 'activate':
            recordEvent('activate_plugins_error', {
                plugins: plugins.join(', '),
                message: rawErrorMessage,
            });
    }
    throw new PluginError(formatErrorMessage(actionType, plugins, rawErrorMessage), error);
}
// Action Creator Generators
export function* installPlugins(plugins, async = false, source) {
    yield setIsRequesting('installPlugins', true);
    try {
        const results = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/plugins/install`,
            method: 'POST',
            data: { plugins: plugins.join(','), async, source },
        });
        if (results.data.installed?.length) {
            yield updateInstalledPlugins(results.data.installed);
        }
        if (results.errors?.errors &&
            Object.keys(results.errors.errors).length) {
            throw results.errors.errors;
        }
        return results;
    }
    catch (error) {
        yield setError('installPlugins', error);
        yield handlePluginAPIError('install', plugins, error);
    }
    finally {
        yield setIsRequesting('installPlugins', false);
    }
}
export function* activatePlugins(plugins) {
    yield setIsRequesting('activatePlugins', true);
    try {
        const results = yield apiFetch({
            path: `${WC_ADMIN_NAMESPACE}/plugins/activate`,
            method: 'POST',
            data: { plugins: plugins.join(',') },
        });
        if (results.data.activated.length) {
            yield updateActivePlugins(results.data.activated);
        }
        if (Object.keys(results.errors.errors).length) {
            throw results.errors.errors;
        }
        return results;
    }
    catch (error) {
        yield setError('activatePlugins', error);
        yield handlePluginAPIError('activate', plugins, error);
    }
    finally {
        yield setIsRequesting('activatePlugins', false);
    }
}
export function* installAndActivatePlugins(plugins, source) {
    try {
        const installations = yield controls.dispatch(STORE_NAME, 'installPlugins', plugins, false, source);
        const activations = yield controls.dispatch(STORE_NAME, 'activatePlugins', plugins);
        const response = {
            ...activations,
            data: {
                ...activations.data,
                ...installations.data,
            },
        };
        // If everything was a success and we BOTH installed and activated, make the success message more informative.
        if (installations.success &&
            Object.keys(installations.data.results).length &&
            activations.success &&
            activations.data.activated.length) {
            // If only ONE plugin was installed, use the plugin details to create a more informative message.
            if (activations.data.activated.length === 1) {
                const plugin_slug = activations.data.activated[0];
                const plugin = activations.data.plugin_details?.[plugin_slug];
                if (plugin) {
                    response.message = sprintf(
                    /* translators: %1$s: plugin name, %2$s: plugin version */
                    __('%1$s (%2$s) was successfully installed and activated.', 'fincommerce'), plugin.name, plugin.version);
                }
                else {
                    response.message = __('A plugin was successfully installed and activated.', 'fincommerce');
                }
            }
            else {
                response.message = __('Plugins were successfully installed and activated.', 'fincommerce');
            }
        }
        else if (
        // If everything was a success, and we ONLY activated ONE plugin, make the success message more informative.
        installations.success &&
            !Object.keys(installations.data.results).length &&
            activations.success &&
            activations.data.activated.length === 1) {
            const plugin_slug = activations.data.activated[0];
            const plugin = activations.data.plugin_details?.[plugin_slug];
            if (plugin) {
                response.message = sprintf(
                /* translators: %1$s: plugin name */
                __('%1$s was successfully activated.', 'fincommerce'), plugin.name);
            }
            else {
                response.message = __('A plugin was successfully activated.', 'fincommerce');
            }
        }
        return response;
    }
    catch (error) {
        throw error;
    }
}
export function* connectToJetpack(getAdminLink) {
    const url = yield controls.resolveSelect(STORE_NAME, 'getJetpackConnectUrl', {
        redirect_url: getAdminLink('admin.php?page=wc-admin'),
    });
    const error = yield controls.resolveSelect(STORE_NAME, 'getPluginsError', 'getJetpackConnectUrl');
    if (error) {
        throw new Error(error);
    }
    else {
        return url;
    }
}
export function* installJetpackAndConnect(errorAction, getAdminLink) {
    try {
        yield controls.dispatch(STORE_NAME, 'installPlugins', ['jetpack']);
        yield controls.dispatch(STORE_NAME, 'activatePlugins', ['jetpack']);
        const url = yield controls.dispatch(STORE_NAME, 'connectToJetpack', getAdminLink);
        window.location.href = url;
    }
    catch (error) {
        if (error instanceof Error) {
            yield errorAction(error.message);
        }
        else {
            throw error;
        }
    }
}
export function* connectToJetpackWithFailureRedirect(failureRedirect, errorAction, getAdminLink) {
    try {
        const url = yield controls.dispatch(STORE_NAME, 'connectToJetpack', getAdminLink);
        window.location.href = url;
    }
    catch (error) {
        if (error instanceof Error) {
            yield errorAction(error.message);
        }
        else {
            throw error;
        }
        window.location.href = failureRedirect;
    }
}
const SUPPORTED_TYPES = ['payments'];
export function* dismissRecommendedPlugins(type) {
    if (!SUPPORTED_TYPES.includes(type)) {
        return [];
    }
    const plugins = yield controls.resolveSelect(STORE_NAME, 'getRecommendedPlugins', type);
    yield setRecommendedPlugins(type, []);
    let success;
    try {
        const url = WC_ADMIN_NAMESPACE + '/payment-gateway-suggestions/dismiss';
        success = yield apiFetch({
            path: url,
            method: 'POST',
        });
    }
    catch (error) {
        success = false;
    }
    if (!success) {
        // Reset recommended plugins
        yield setRecommendedPlugins(type, plugins);
    }
    return success;
}
export function* deactivatePlugin(pluginFile) {
    try {
        yield apiFetch({
            path: `/wp/v2/plugins/${pluginFile}`,
            method: 'POST',
            data: { status: 'inactive' },
        });
    }
    catch (error) {
        throw error;
    }
}
