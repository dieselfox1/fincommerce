"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const action_types_1 = require("./action-types");
const reducer = (state = {
    active: [],
    installed: [],
    requesting: {},
    errors: {},
    jetpackConnectUrls: {},
    recommended: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.ACTION_TYPES.UPDATE_ACTIVE_PLUGINS:
                state = {
                    ...state,
                    active: payload.replace
                        ? payload.active
                        : (0, lodash_1.concat)(state.active, payload.active),
                    requesting: {
                        ...state.requesting,
                        getActivePlugins: false,
                        activatePlugins: false,
                    },
                    errors: {
                        ...state.errors,
                        getActivePlugins: false,
                        activatePlugins: false,
                    },
                };
                break;
            case action_types_1.ACTION_TYPES.UPDATE_INSTALLED_PLUGINS:
                state = {
                    ...state,
                    installed: payload.replace
                        ? payload.installed
                        : (0, lodash_1.concat)(state.installed, payload.installed),
                    requesting: {
                        ...state.requesting,
                        getInstalledPlugins: false,
                        installPlugins: false,
                    },
                    errors: {
                        ...state.errors,
                        getInstalledPlugins: false,
                        installPlugin: false,
                    },
                };
                break;
            case action_types_1.ACTION_TYPES.SET_IS_REQUESTING:
                state = {
                    ...state,
                    requesting: {
                        ...state.requesting,
                        [payload.selector]: payload.isRequesting,
                    },
                };
                break;
            case action_types_1.ACTION_TYPES.SET_ERROR:
                state = {
                    ...state,
                    requesting: {
                        ...state.requesting,
                        [payload.selector]: false,
                    },
                    errors: {
                        ...state.errors,
                        [payload.selector]: payload.error,
                    },
                };
                break;
            case action_types_1.ACTION_TYPES.UPDATE_JETPACK_CONNECTION:
                state = {
                    ...state,
                    jetpackConnection: payload.jetpackConnection,
                };
                break;
            case action_types_1.ACTION_TYPES.UPDATE_JETPACK_CONNECTION_DATA:
                state = {
                    ...state,
                    jetpackConnectionData: payload.results,
                };
                break;
            case action_types_1.ACTION_TYPES.UPDATE_JETPACK_CONNECT_URL:
                state = {
                    ...state,
                    jetpackConnectUrls: {
                        ...state.jetpackConnectUrls,
                        [payload.redirectUrl]: payload.jetpackConnectUrl,
                    },
                };
                break;
            case action_types_1.ACTION_TYPES.SET_PAYPAL_ONBOARDING_STATUS:
                state = {
                    ...state,
                    paypalOnboardingStatus: payload.paypalOnboardingStatus,
                };
                break;
            case action_types_1.ACTION_TYPES.SET_RECOMMENDED_PLUGINS:
                state = {
                    ...state,
                    recommended: {
                        ...state.recommended,
                        [payload.recommendedType]: payload.plugins,
                    },
                };
                break;
        }
    }
    return state;
};
exports.default = reducer;
