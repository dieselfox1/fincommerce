"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylesSidebar = void 0;
exports.RawStylesSidebar = RawStylesSidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
const icons_1 = require("@wordpress/icons");
// eslint-disable-next-line @fincommerce/dependency-group
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const store_1 = require("../../store");
const screens_1 = require("./screens");
const navigator_1 = require("./navigator");
function RawStylesSidebar() {
    const { userCanEditGlobalStyles } = (0, data_1.useSelect)((select) => {
        const { canEdit } = select(store_1.storeName).canUserEditGlobalEmailStyles();
        return {
            userCanEditGlobalStyles: canEdit,
        };
    }, []);
    return (userCanEditGlobalStyles && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(editor_1.PluginSidebarMoreMenuItem, { target: "email-styles-sidebar", icon: icons_1.styles, children: (0, i18n_1.__)('Email styles', 'fincommerce') }), (0, jsx_runtime_1.jsx)(editor_1.PluginSidebar, { name: "email-styles-sidebar", icon: icons_1.styles, title: (0, i18n_1.__)('Styles', 'fincommerce'), className: "fincommerce-email-editor-styles-panel", header: (0, i18n_1.__)('Styles', 'fincommerce'), children: (0, jsx_runtime_1.jsxs)(navigator_1.Navigator, { initialPath: "/", children: [(0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenRoot, {}) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/typography", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenTypography, {}) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/typography/text", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenTypographyElement, { element: "text" }) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/typography/link", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenTypographyElement, { element: "link" }) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/typography/heading", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenTypographyElement, { element: "heading" }) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/typography/button", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenTypographyElement, { element: "button" }) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/colors", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenColors, {}) }), (0, jsx_runtime_1.jsx)(navigator_1.Navigator.Screen, { path: "/layout", children: (0, jsx_runtime_1.jsx)(screens_1.ScreenLayout, {}) })] }) })] })));
}
exports.StylesSidebar = (0, element_1.memo)(RawStylesSidebar);
