"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonWithDropdownMenu = ButtonWithDropdownMenu;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
__exportStar(require("./types"), exports);
function ButtonWithDropdownMenu({ dropdownButtonLabel = (0, i18n_1.__)('More options', 'fincommerce'), controls, defaultOpen = false, popoverProps: { placement = 'bottom-end', position = 'bottom left left', offset = 0, } = {
    placement: 'bottom-end',
    position: 'bottom left left',
    offset: 0,
}, className, renderMenu, onToggle, ...props }) {
    return ((0, element_1.createElement)(components_1.Flex, { className: `fincommerce-button-with-dropdown-menu${className?.length ? ' ' + className : ''}`, justify: "left", gap: 0, expanded: false, role: "group" },
        (0, element_1.createElement)(components_1.FlexItem, { role: "none" },
            (0, element_1.createElement)(components_1.Button, { ...props, className: "fincommerce-button-with-dropdown-menu__main-button" })),
        (0, element_1.createElement)(components_1.FlexItem, { role: "none" },
            (0, element_1.createElement)(components_1.DropdownMenu, { toggleProps: {
                    className: 'fincommerce-button-with-dropdown-menu__dropdown-button',
                    variant: props.variant,
                }, controls: controls, icon: icons_1.chevronDown, label: dropdownButtonLabel, popoverProps: {
                    placement,
                    position,
                    offset,
                }, defaultOpen: defaultOpen, onToggle: onToggle }, renderMenu))));
}
