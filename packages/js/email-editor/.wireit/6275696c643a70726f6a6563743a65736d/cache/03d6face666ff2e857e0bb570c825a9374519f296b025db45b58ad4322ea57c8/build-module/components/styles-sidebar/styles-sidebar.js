import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { memo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { styles } from '@wordpress/icons';
// eslint-disable-next-line @fincommerce/dependency-group
import { 
// @ts-expect-error Type for PluginSidebar is missing in @types/wordpress__editor
PluginSidebar, 
// @ts-expect-error Type for PluginSidebarMoreMenuItem is missing in @types/wordpress__editor
PluginSidebarMoreMenuItem, } from '@wordpress/editor';
/**
 * Internal dependencies
 */
import { storeName } from '../../store';
import { ScreenTypography, ScreenTypographyElement, ScreenLayout, ScreenRoot, ScreenColors, } from './screens';
import { Navigator } from './navigator';
export function RawStylesSidebar() {
    const { userCanEditGlobalStyles } = useSelect((select) => {
        const { canEdit } = select(storeName).canUserEditGlobalEmailStyles();
        return {
            userCanEditGlobalStyles: canEdit,
        };
    }, []);
    return (userCanEditGlobalStyles && (_jsxs(_Fragment, { children: [_jsx(PluginSidebarMoreMenuItem, { target: "email-styles-sidebar", icon: styles, children: __('Email styles', 'fincommerce') }), _jsx(PluginSidebar, { name: "email-styles-sidebar", icon: styles, title: __('Styles', 'fincommerce'), className: "fincommerce-email-editor-styles-panel", header: __('Styles', 'fincommerce'), children: _jsxs(Navigator, { initialPath: "/", children: [_jsx(Navigator.Screen, { path: "/", children: _jsx(ScreenRoot, {}) }), _jsx(Navigator.Screen, { path: "/typography", children: _jsx(ScreenTypography, {}) }), _jsx(Navigator.Screen, { path: "/typography/text", children: _jsx(ScreenTypographyElement, { element: "text" }) }), _jsx(Navigator.Screen, { path: "/typography/link", children: _jsx(ScreenTypographyElement, { element: "link" }) }), _jsx(Navigator.Screen, { path: "/typography/heading", children: _jsx(ScreenTypographyElement, { element: "heading" }) }), _jsx(Navigator.Screen, { path: "/typography/button", children: _jsx(ScreenTypographyElement, { element: "button" }) }), _jsx(Navigator.Screen, { path: "/colors", children: _jsx(ScreenColors, {}) }), _jsx(Navigator.Screen, { path: "/layout", children: _jsx(ScreenLayout, {}) })] }) })] })));
}
export const StylesSidebar = memo(RawStylesSidebar);
