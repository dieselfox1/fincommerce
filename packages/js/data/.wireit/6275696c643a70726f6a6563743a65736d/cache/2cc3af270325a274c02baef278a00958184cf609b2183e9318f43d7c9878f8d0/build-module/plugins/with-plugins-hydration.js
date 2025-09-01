/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { createElement, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
export const withPluginsHydration = (data) => createHigherOrderComponent((OriginalComponent) => (props) => {
    const shouldHydrate = useSelect((select) => {
        if (!data) {
            return;
        }
        const { isResolving, hasFinishedResolution } = select(STORE_NAME);
        return (!isResolving('getActivePlugins', []) &&
            !hasFinishedResolution('getActivePlugins', []));
    }, []);
    const { startResolution, finishResolution, updateActivePlugins, updateInstalledPlugins, updateIsJetpackConnected, } = useDispatch(STORE_NAME);
    useEffect(() => {
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
    return createElement(OriginalComponent, { ...props });
}, 'withPluginsHydration');
