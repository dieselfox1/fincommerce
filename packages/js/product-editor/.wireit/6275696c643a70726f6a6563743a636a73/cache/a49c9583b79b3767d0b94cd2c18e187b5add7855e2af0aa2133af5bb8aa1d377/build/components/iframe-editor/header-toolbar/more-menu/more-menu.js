"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreMenu = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const action_item_1 = __importDefault(require("@wordpress/interface/build-module/components/action-item"));
/**
 * Internal dependencies
 */
const tools_menu_group_1 = require("./tools-menu-group");
const writing_menu_1 = require("../writing-menu");
const constants_1 = require("../../constants");
const more_menu_dropdown_1 = require("../../../more-menu-dropdown");
const MoreMenu = () => {
    return ((0, element_1.createElement)(more_menu_dropdown_1.MoreMenuDropdown, null, (onClose) => ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(writing_menu_1.WritingMenu, null),
        (0, element_1.createElement)(action_item_1.default.Slot, { name: constants_1.MORE_MENU_ACTION_ITEM_SLOT_NAME, label: (0, i18n_1.__)('Plugins', 'fincommerce'), as: components_1.MenuGroup, fillProps: { onClick: onClose } }),
        (0, element_1.createElement)(tools_menu_group_1.ToolsMenuGroup, null)))));
};
exports.MoreMenu = MoreMenu;
