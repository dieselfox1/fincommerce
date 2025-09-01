/**
 * External dependencies
 */
import { BlockInspector } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';
import { isRTL, __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import drawerLeft from './drawer-left';
import drawerRight from './drawer-right';
import { PluginSidebar } from '../plugin-sidebar';
import { SETTINGS_SIDEBAR_IDENTIFIER } from '../../constants';
const SettingsHeader = () => {
    return createElement("strong", null, __('Settings', 'fincommerce'));
};
export const SettingsSidebar = ({ smallScreenTitle, }) => {
    return (createElement(PluginSidebar
    // By not providing a name, the sidebar will not be listed in
    // the more menu's Plugins menu group.
    , { 
        // By not providing a name, the sidebar will not be listed in
        // the more menu's Plugins menu group.
        identifier: SETTINGS_SIDEBAR_IDENTIFIER, title: __('Settings', 'fincommerce'), icon: isRTL() ? drawerRight : drawerLeft, isActiveByDefault: true, 
        // We need to pass a custom header to the sidebar to prevent
        // the pin button in the default header from being displayed.
        header: createElement(SettingsHeader, null), closeLabel: __('Close settings', 'fincommerce'), smallScreenTitle: smallScreenTitle },
        createElement(BlockInspector, null)));
};
