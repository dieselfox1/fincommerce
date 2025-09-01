"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenHeader = ScreenHeader;
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
const navigator_1 = require("../navigator");
/**
 * Component for displaying the screen header and optional description based on site editor component:
 * https://github.com/WordPress/gutenberg/blob/7fa03fafeb421ab4c3604564211ce6007cc38e84/packages/edit-site/src/components/global-styles/header.js
 *
 * @param root0
 * @param root0.title
 * @param root0.description
 * @param root0.onBack
 */
function ScreenHeader({ title, description, onBack }) {
    return ((0, jsx_runtime_1.jsxs)(components_1.__experimentalVStack, { spacing: 0, children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalView, { children: (0, jsx_runtime_1.jsx)(components_1.__experimentalSpacer, { marginBottom: 0, paddingX: 4, paddingY: 3, children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { spacing: 2, children: [(0, jsx_runtime_1.jsx)(navigator_1.Navigator.BackButton, { style: { minWidth: 24, padding: 0 }, icon: icons_1.chevronLeft, size: "small", "aria-label": (0, i18n_1.__)('Navigate to the previous view', 'fincommerce'), onClick: onBack }), (0, jsx_runtime_1.jsx)(components_1.__experimentalSpacer, { children: (0, jsx_runtime_1.jsx)(components_1.__experimentalHeading, { className: "fincommerce-email-editor-styles-header", level: 2, size: 13, children: title }) })] }) }) }), description && ((0, jsx_runtime_1.jsx)("p", { className: "fincommerce-email-editor-styles-header-description", children: description }))] }));
}
exports.default = ScreenHeader;
