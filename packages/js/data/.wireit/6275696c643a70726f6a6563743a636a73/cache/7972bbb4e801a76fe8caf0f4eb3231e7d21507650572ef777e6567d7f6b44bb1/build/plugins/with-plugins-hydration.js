"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPluginsHydration = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const withPluginsHydration = (data) => (0, compose_1.createHigherOrderComponent)((OriginalComponent) => (props) => {
    const shouldHydrate = (0, data_1.useSelect)((select) => {
        if (!data) {
            return;
        }
        const { isResolving, hasFinishedResolution } = select(constants_1.STORE_NAME);
        return (!isResolving('getActivePlugins', []) &&
            !hasFinishedResolution('getActivePlugins', []));
    }, []);
    const { startResolution, finishResolution, updateActivePlugins, updateInstalledPlugins, updateIsJetpackConnected, } = (0, data_1.useDispatch)(constants_1.STORE_NAME);
    (0, element_1.useEffect)(() => {
        if (!shouldHydrate) {
            return;
        }
        startResolution('getActivePlugins', []);
        startResolution('getInstalledPlugins', []);
        startResolution('isJetpackConnected', []);
        updateActivePlugins(data.activePlugins, true);
        updateInstalledPlugins(data.installedPlugins, true);
        updateIsJetpackConnected(data.jetpackStatus && data.jetpackStatus.isActive
            ? true
            : false);
        finishResolution('getActivePlugins', []);
        finishResolution('getInstalledPlugins', []);
        finishResolution('isJetpackConnected', []);
    }, [shouldHydrate]);
    return (0, element_1.createElement)(OriginalComponent, { ...props });
}, 'withPluginsHydration');
exports.withPluginsHydration = withPluginsHydration;
