import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useViewportMatch } from '@wordpress/compose';
import { displayShortcut } from '@wordpress/keycodes';
import { PreferenceToggleMenuItem } from '@wordpress/preferences';
/**
 * Internal dependencies
 */
import { ViewMoreMenuGroup } from '../../private-apis';
import { storeName } from '../../store';
export const MoreMenu = () => {
    const isLargeViewport = useViewportMatch('large');
    return (_jsx(_Fragment, { children: isLargeViewport && (_jsx(ViewMoreMenuGroup, { children: _jsx(PreferenceToggleMenuItem, { scope: storeName, name: "fullscreenMode", label: __('Fullscreen mode', 'fincommerce'), info: __('Show and hide the admin user interface', 'fincommerce'), messageActivated: __('Fullscreen mode activated.', 'fincommerce'), messageDeactivated: __('Fullscreen mode deactivated.', 'fincommerce'), shortcut: displayShortcut.secondary('f') }) })) }));
};
