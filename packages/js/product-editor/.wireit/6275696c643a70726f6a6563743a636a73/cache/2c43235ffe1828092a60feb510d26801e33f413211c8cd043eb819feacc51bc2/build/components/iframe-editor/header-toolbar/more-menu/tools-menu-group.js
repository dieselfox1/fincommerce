"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsMenuGroup = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const copy_all_content_menu_item_1 = require("./copy-all-content-menu-item");
const help_menu_item_1 = require("./help-menu-item");
const ToolsMenuGroup = () => {
    return ((0, element_1.createElement)(components_1.MenuGroup, { label: (0, i18n_1.__)('Tools', 'fincommerce') },
        (0, element_1.createElement)(copy_all_content_menu_item_1.CopyAllContentMenuItem, null),
        (0, element_1.createElement)(help_menu_item_1.HelpMenuItem, null)));
};
exports.ToolsMenuGroup = ToolsMenuGroup;
