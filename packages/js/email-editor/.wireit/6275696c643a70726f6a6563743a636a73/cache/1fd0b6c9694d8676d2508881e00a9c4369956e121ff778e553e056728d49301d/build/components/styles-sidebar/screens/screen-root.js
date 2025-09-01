"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenRoot = ScreenRoot;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const preview_1 = require("./preview");
const events_1 = require("../../../events");
function ScreenRoot() {
    return ((0, jsx_runtime_1.jsx)(components_1.Card, { size: "small", className: "edit-site-global-styles-screen-root", variant: "primary", children: (0, jsx_runtime_1.jsx)(components_1.CardBody, { children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalVStack, { spacing: 4, children: [(0, jsx_runtime_1.jsx)(components_1.Card, { children: (0, jsx_runtime_1.jsx)(components_1.CardMedia, { children: (0, jsx_runtime_1.jsx)(preview_1.Preview, {}) }) }), (0, jsx_runtime_1.jsxs)(components_1.__experimentalItemGroup, { children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalNavigatorButton, { path: "/typography", onClick: () => (0, events_1.recordEvent)('styles_sidebar_navigation_click', { path: 'typography' }), children: (0, jsx_runtime_1.jsx)(components_1.__experimentalItem, { children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { justify: "flex-start", children: [(0, jsx_runtime_1.jsx)(components_1.Icon, { icon: icons_1.typography, size: 24 }), (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, i18n_1.__)('Typography', 'fincommerce') })] }) }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalNavigatorButton, { path: "/colors", onClick: () => (0, events_1.recordEvent)('styles_sidebar_navigation_click', { path: 'colors' }), children: (0, jsx_runtime_1.jsx)(components_1.__experimentalItem, { children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { justify: "flex-start", children: [(0, jsx_runtime_1.jsx)(components_1.Icon, { icon: icons_1.color, size: 24 }), (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, i18n_1.__)('Colors', 'fincommerce') })] }) }) }), (0, jsx_runtime_1.jsx)(components_1.__experimentalNavigatorButton, { path: "/layout", onClick: () => (0, events_1.recordEvent)('styles_sidebar_navigation_click', { path: 'layout' }), children: (0, jsx_runtime_1.jsx)(components_1.__experimentalItem, { children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { justify: "flex-start", children: [(0, jsx_runtime_1.jsx)(components_1.Icon, { icon: icons_1.layout, size: 24 }), (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: (0, i18n_1.__)('Layout', 'fincommerce') })] }) }) })] })] }) }) }));
}
