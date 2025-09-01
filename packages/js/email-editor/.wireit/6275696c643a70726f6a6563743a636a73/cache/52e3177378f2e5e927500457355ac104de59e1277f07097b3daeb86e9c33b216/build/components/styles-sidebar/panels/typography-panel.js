"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypographyPanel = TypographyPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const hooks_1 = require("../../../hooks");
const utils_1 = require("../utils");
const events_1 = require("../../../events");
function ElementItem({ element, label }) {
    const { styles } = (0, hooks_1.useEmailStyles)();
    const elementStyles = (0, utils_1.getElementStyles)(styles, element, null, true);
    const { fontFamily, fontStyle, fontWeight, letterSpacing, textDecoration, textTransform, } = elementStyles.typography;
    const textColor = elementStyles.color?.text || 'inherit';
    const background = elementStyles.color?.background || '#f0f0f0';
    const navigationButtonLabel = (0, i18n_1.sprintf)(
    // translators: %s: is a subset of Typography, e.g., 'text' or 'links'.
    (0, i18n_1.__)('Typography %s styles', 'fincommerce'), label);
    return ((0, jsx_runtime_1.jsx)(components_1.__experimentalItem, { children: (0, jsx_runtime_1.jsx)(components_1.__experimentalNavigatorButton, { path: `/typography/${element}`, "aria-label": navigationButtonLabel, onClick: () => (0, events_1.recordEvent)('styles_sidebar_screen_typography_button_click', {
                element,
                label,
                path: `typography/${element}`,
            }), children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalHStack, { justify: "flex-start", children: [(0, jsx_runtime_1.jsx)(components_1.FlexItem, { className: "edit-site-global-styles-screen-typography__indicator", style: {
                            fontFamily: fontFamily ?? 'serif',
                            background,
                            color: textColor,
                            fontStyle: fontStyle ?? 'normal',
                            fontWeight: fontWeight ?? 'normal',
                            letterSpacing: letterSpacing ?? 'normal',
                            textDecoration: textDecoration ??
                                (element === 'link' ? 'underline' : 'none'),
                            textTransform: textTransform ?? 'none',
                        }, children: "Aa" }), (0, jsx_runtime_1.jsx)(components_1.FlexItem, { children: label })] }) }) }));
}
function TypographyPanel() {
    return ((0, jsx_runtime_1.jsx)(components_1.Card, { size: "small", variant: "primary", isBorderless: true, children: (0, jsx_runtime_1.jsx)(components_1.CardBody, { children: (0, jsx_runtime_1.jsxs)(components_1.__experimentalVStack, { spacing: 3, children: [(0, jsx_runtime_1.jsx)(components_1.__experimentalHeading, { level: 3, className: "edit-site-global-styles-subtitle", children: (0, i18n_1.__)('Elements', 'fincommerce') }), (0, jsx_runtime_1.jsxs)(components_1.__experimentalItemGroup, { isBordered: true, isSeparated: true, size: "small", children: [(0, jsx_runtime_1.jsx)(ElementItem, { element: "text", label: (0, i18n_1.__)('Text', 'fincommerce') }), (0, jsx_runtime_1.jsx)(ElementItem, { element: "link", label: (0, i18n_1.__)('Links', 'fincommerce') }), (0, jsx_runtime_1.jsx)(ElementItem, { element: "heading", label: (0, i18n_1.__)('Headings', 'fincommerce') }), (0, jsx_runtime_1.jsx)(ElementItem, { element: "button", label: (0, i18n_1.__)('Buttons', 'fincommerce') })] })] }) }) }));
}
exports.default = TypographyPanel;
