"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenTypography = ScreenTypography;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const typography_panel_1 = __importDefault(require("../panels/typography-panel"));
const screen_header_1 = __importDefault(require("./screen-header"));
const events_1 = require("../../../events");
function ScreenTypography() {
    (0, events_1.recordEventOnce)('styles_sidebar_screen_typography_opened');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(screen_header_1.default, { title: (0, i18n_1.__)('Typography', 'fincommerce'), description: (0, i18n_1.__)('Manage the typography settings for different elements.', 'fincommerce') }), (0, jsx_runtime_1.jsx)(typography_panel_1.default, {})] }));
}
