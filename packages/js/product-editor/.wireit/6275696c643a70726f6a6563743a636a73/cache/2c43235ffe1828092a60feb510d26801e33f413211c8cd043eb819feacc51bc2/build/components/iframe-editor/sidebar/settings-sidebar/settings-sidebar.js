"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSidebar = void 0;
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const drawer_left_1 = __importDefault(require("./drawer-left"));
const drawer_right_1 = __importDefault(require("./drawer-right"));
const plugin_sidebar_1 = require("../plugin-sidebar");
const constants_1 = require("../../constants");
const SettingsHeader = () => {
    return (0, element_1.createElement)("strong", null, (0, i18n_1.__)('Settings', 'fincommerce'));
};
const SettingsSidebar = ({ smallScreenTitle, }) => {
    return ((0, element_1.createElement)(plugin_sidebar_1.PluginSidebar
    // By not providing a name, the sidebar will not be listed in
    // the more menu's Plugins menu group.
    , { 
        // By not providing a name, the sidebar will not be listed in
        // the more menu's Plugins menu group.
        identifier: constants_1.SETTINGS_SIDEBAR_IDENTIFIER, title: (0, i18n_1.__)('Settings', 'fincommerce'), icon: (0, i18n_1.isRTL)() ? drawer_right_1.default : drawer_left_1.default, isActiveByDefault: true, 
        // We need to pass a custom header to the sidebar to prevent
        // the pin button in the default header from being displayed.
        header: (0, element_1.createElement)(SettingsHeader, null), closeLabel: (0, i18n_1.__)('Close settings', 'fincommerce'), smallScreenTitle: smallScreenTitle },
        (0, element_1.createElement)(block_editor_1.BlockInspector, null)));
};
exports.SettingsSidebar = SettingsSidebar;
