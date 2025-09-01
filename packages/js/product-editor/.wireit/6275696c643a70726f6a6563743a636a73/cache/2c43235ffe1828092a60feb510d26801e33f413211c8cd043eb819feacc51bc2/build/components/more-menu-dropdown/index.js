"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoreMenuDropdown = void 0;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
/**
 * Copied exactly from https://github.com/WordPress/gutenberg/blob/e89fceffab765902e0162a1e3359d88501e72005/packages/interface/src/components/more-menu-dropdown/index.js
 * to unblock progress as it was discovered to have been deleted while doing a monorepo WordPress dependencies upgrade.
 * It was deleted in https://github.com/WordPress/gutenberg/pull/59096
 */
const MoreMenuDropdown = ({ as: DropdownComponent = components_1.DropdownMenu, className, 
/* translators: button label text should, if possible, be under 16 characters. */
label = (0, i18n_1.__)('Options', 'fincommerce'), popoverProps, toggleProps, children, }) => {
    return ((0, element_1.createElement)(DropdownComponent, { className: (0, clsx_1.default)('interface-more-menu-dropdown', className), icon: icons_1.moreVertical, label: label, popoverProps: {
            placement: 'bottom-end',
            ...popoverProps,
            className: (0, clsx_1.default)('interface-more-menu-dropdown__content', popoverProps?.className),
        }, toggleProps: {
            tooltipPosition: 'bottom',
            ...toggleProps,
            size: 'compact',
        } }, ({ onClose }) => children(onClose)));
};
exports.MoreMenuDropdown = MoreMenuDropdown;
