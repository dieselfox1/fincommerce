"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenColors = ScreenColors;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const screen_header_1 = __importDefault(require("./screen-header"));
const hooks_1 = require("../../../hooks");
const store_1 = require("../../../store");
const events_1 = require("../../../events");
const private_apis_1 = require("../../../private-apis");
function ScreenColors() {
    (0, events_1.recordEventOnce)('styles_sidebar_screen_colors_opened');
    const { userStyles, styles, updateStyles } = (0, hooks_1.useEmailStyles)();
    const theme = (0, data_1.useSelect)((select) => select(store_1.storeName).getTheme(), []);
    const handleOnChange = (newStyles) => {
        updateStyles(newStyles);
        (0, events_1.recordEvent)('styles_sidebar_screen_colors_styles_updated'); // We can't log the updated color here because the onChange function returns the complete object.
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(screen_header_1.default, { title: (0, i18n_1.__)('Colors', 'fincommerce'), description: (0, i18n_1.__)('Manage palettes and the default color of different global elements.', 'fincommerce') }), (0, jsx_runtime_1.jsx)(private_apis_1.StylesColorPanel, { value: userStyles, inheritedValue: styles, onChange: handleOnChange, settings: theme?.settings, panelId: "colors" })] }));
}
