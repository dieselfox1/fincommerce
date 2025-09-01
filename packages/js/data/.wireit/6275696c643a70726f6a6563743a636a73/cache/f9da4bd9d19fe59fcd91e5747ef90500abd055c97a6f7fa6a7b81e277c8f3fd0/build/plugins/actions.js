"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorNotice = void 0;
exports.updateActivePlugins = updateActivePlugins;
exports.updateInstalledPlugins = updateInstalledPlugins;
exports.setIsRequesting = setIsRequesting;
exports.setError = setError;
exports.updateIsJetpackConnected = updateIsJetpackConnected;
exports.updateJetpackConnectionData = updateJetpackConnectionData;
exports.updateJetpackConnectUrl = updateJetpackConnectUrl;
exports.setPaypalOnboardingStatus = setPaypalOnboardingStatus;
exports.setRecommendedPlugins = setRecommendedPlugins;
exports.installPlugins = installPlugins;
exports.activatePlugins = activatePlugins;
exports.installAndActivatePlugins = installAndActivatePlugins;
exports.connectToJetpack = connectToJetpack;
exports.installJetpackAndConnect = installJetpackAndConnect;
exports.connectToJetpackWithFailureRedirect = connectToJetpackWithFailureRedirect;
exports.dismissRecommendedPlugins = dismissRecommendedPlugins;
exports.deactivatePlugin = deactivatePlugin;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const action_types_1 = require("./action-types");
const constants_2 = require("../constants");
const types_1 = require("../types");
class PluginError extends Error {
    data;
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
const isPluginResponseError = (plugins, error) => typeof error === 'object' && error !== null && plugins[0] in error;
const formatErrorMessage = (actionType = 'install', plugins, rawErrorMessage) => {
    return (0, i18n_1.sprintf)(
    /* translators: %(actionType): install or activate (the plugin). %(pluginName): a plugin slug (e.g. fincommerce-services). %(error): a single error message or in plural a comma separated error message list.*/
    (0, i18n_1._n)('Could not %(actionType)s %(pluginName)s plugin, %(error)s', 'Could not %(actionType)s the following plugins: %(pluginName)s with these Errors: %(error)s', Object.keys(plugins).length || 1, 'fincommerce'), {
        actionType,
        pluginName: plugins.join(', '),
        error: rawErrorMessage,
    });
};
function updateActivePlugins(active, replace = false) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_ACTIVE_PLUGINS,
        active,
        replace,
    };
}
function updateInstalledPlugins(installed, replace = false) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_INSTALLED_PLUGINS,
        installed,
        replace,
    };
}
function setIsRequesting(selector, isRequesting) {
    return {
        type: action_types_1.ACTION_TYPES.SET_IS_REQUESTING,
        selector,
        isRequesting,
    };
}
function setError(selector, error) {
    return {
        type: action_types_1.ACTION_TYPES.SET_ERROR,
        selector,
        error,
    };
}
function updateIsJetpackConnected(jetpackConnection) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_JETPACK_CONNECTION,
        jetpackConnection,
    };
}
function updateJetpackConnectionData(results) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_JETPACK_CONNECTION_DATA,
        results,
    };
}
function updateJetpackConnectUrl(redirectUrl, jetpackConnectUrl) {
    return {
        type: action_types_1.ACTION_TYPES.UPDATE_JETPACK_CONNECT_URL,
        jetpackConnectUrl,
        redirectUrl,
    };
}
const createErrorNotice = (errorMessage) => {
    return data_1.controls.dispatch('core/notices', 'createNotice', 'error', errorMessage);
};
exports.createErrorNotice = createErrorNotice;
function setPaypalOnboardingStatus(status) {
    return {
        type: action_types_1.ACTION_TYPES.SET_PAYPAL_ONBOARDING_STATUS,
        paypalOnboardingStatus: status,
    };
}
function setRecommendedPlugins(type, plugins) {
    return {
        type: action_types_1.ACTION_TYPES.SET_RECOMMENDED_PLUGINS,
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
            (0, types_1.isRestApiError)(error) || error instanceof Error
                ? error.message
                : JSON.stringify(error);
    }
    // Track the error.
    switch (actionType) {
        case 'install':
            (0, tracks_1.recordEvent)('install_plugins_error', {
                plugins: plugins.join(', '),
                message: rawErrorMessage,
            });
            break;
        case 'activate':
            (0, tracks_1.recordEvent)('activate_plugins_error', {
                plugins: plugins.join(', '),
                message: rawErrorMessage,
            });
    }
    throw new PluginError(formatErrorMessage(actionType, plugins, rawErrorMessage), error);
}
// Action Creator Generators
function* installPlugins(plugins, async = false, source) {
    yield setIsRequesting('installPlugins', true);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: `${constants_2.WC_ADMIN_NAMESPACE}/plugins/install`,
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
function* activatePlugins(plugins) {
    yield setIsRequesting('activatePlugins', true);
    try {
        const results = yield (0, data_controls_1.apiFetch)({
            path: `${constants_2.WC_ADMIN_NAMESPACE}/plugins/activate`,
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
function* installAndActivatePlugins(plugins, source) {
    try {
        const installations = yield data_1.controls.dispatch(constants_1.STORE_NAME, 'installPlugins', plugins, false, source);
        const activations = yield data_1.controls.dispatch(constants_1.STORE_NAME, 'activatePlugins', plugins);
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
                    response.message = (0, i18n_1.sprintf)(
                    /* translators: %1$s: plugin name, %2$s: plugin version */
                    (0, i18n_1.__)('%1$s (%2$s) was successfully installed and activated.', 'fincommerce'), plugin.name, plugin.version);
                }
                else {
                    response.message = (0, i18n_1.__)('A plugin was successfully installed and activated.', 'fincommerce');
                }
            }
            else {
                response.message = (0, i18n_1.__)('Plugins were successfully installed and activated.', 'fincommerce');
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
                response.message = (0, i18n_1.sprintf)(
                /* translators: %1$s: plugin name */
                (0, i18n_1.__)('%1$s was successfully activated.', 'fincommerce'), plugin.name);
            }
            else {
                response.message = (0, i18n_1.__)('A plugin was successfully activated.', 'fincommerce');
            }
        }
        return response;
    }
    catch (error) {
        throw error;
    }
}
function* connectToJetpack(getAdminLink) {
    const url = yield data_1.controls.resolveSelect(constants_1.STORE_NAME, 'getJetpackConnectUrl', {
        redirect_url: getAdminLink('admin.php?page=wc-admin'),
    });
    const error = yield data_1.controls.resolveSelect(constants_1.STORE_NAME, 'getPluginsError', 'getJetpackConnectUrl');
    if (error) {
        throw new Error(error);
    }
    else {
        return url;
    }
}
function* installJetpackAndConnect(errorAction, getAdminLink) {
    try {
        yield data_1.controls.dispatch(constants_1.STORE_NAME, 'installPlugins', ['jetpack']);
        yield data_1.controls.dispatch(constants_1.STORE_NAME, 'activatePlugins', ['jetpack']);
        const url = yield data_1.controls.dispatch(constants_1.STORE_NAME, 'connectToJetpack', getAdminLink);
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
function* connectToJetpackWithFailureRedirect(failureRedirect, errorAction, getAdminLink) {
    try {
        const url = yield data_1.controls.dispatch(constants_1.STORE_NAME, 'connectToJetpack', getAdminLink);
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
function* dismissRecommendedPlugins(type) {
    if (!SUPPORTED_TYPES.includes(type)) {
        return [];
    }
    const plugins = yield data_1.controls.resolveSelect(constants_1.STORE_NAME, 'getRecommendedPlugins', type);
    yield setRecommendedPlugins(type, []);
    let success;
    try {
        const url = constants_2.WC_ADMIN_NAMESPACE + '/payment-gateway-suggestions/dismiss';
        success = yield (0, data_controls_1.apiFetch)({
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
function* deactivatePlugin(pluginFile) {
    try {
        yield (0, data_controls_1.apiFetch)({
            path: `/wp/v2/plugins/${pluginFile}`,
            method: 'POST',
            data: { status: 'inactive' },
        });
    }
    catch (error) {
        throw error;
    }
}
