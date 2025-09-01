"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const compose_1 = require("@wordpress/compose");
const keycodes_1 = require("@wordpress/keycodes");
const preferences_1 = require("@wordpress/preferences");
/**
 * Internal dependencies
 */
const private_apis_1 = require("../../private-apis");
const store_1 = require("../../store");
const MoreMenu = () => {
    const isLargeViewport = (0, compose_1.useViewportMatch)('large');
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isLargeViewport && ((0, jsx_runtime_1.jsx)(private_apis_1.ViewMoreMenuGroup, { children: (0, jsx_runtime_1.jsx)(preferences_1.PreferenceToggleMenuItem, { scope: store_1.storeName, name: "fullscreenMode", label: (0, i18n_1.__)('Fullscreen mode', 'fincommerce'), info: (0, i18n_1.__)('Show and hide the admin user interface', 'fincommerce'), messageActivated: (0, i18n_1.__)('Fullscreen mode activated.', 'fincommerce'), messageDeactivated: (0, i18n_1.__)('Fullscreen mode deactivated.', 'fincommerce'), shortcut: keycodes_1.displayShortcut.secondary('f') }) })) }));
};
exports.MoreMenu = MoreMenu;
