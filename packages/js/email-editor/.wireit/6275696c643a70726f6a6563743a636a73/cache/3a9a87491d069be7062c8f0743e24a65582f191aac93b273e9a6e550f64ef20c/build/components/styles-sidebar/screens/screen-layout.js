"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenLayout = ScreenLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const dimensions_panel_1 = require("../panels/dimensions-panel");
const screen_header_1 = require("./screen-header");
const events_1 = require("../../../events");
function ScreenLayout() {
    (0, events_1.recordEventOnce)('styles_sidebar_screen_layout_opened');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(screen_header_1.ScreenHeader, { title: (0, i18n_1.__)('Layout', 'fincommerce') }), (0, jsx_runtime_1.jsx)(dimensions_panel_1.DimensionsPanel, {})] }));
}
