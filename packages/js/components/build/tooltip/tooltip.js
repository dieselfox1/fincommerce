"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const compose_1 = require("@wordpress/compose");
const Tooltip = ({ children = (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.help }), className = '', helperText = (0, i18n_1.__)('Help', 'fincommerce'), position = 'top center', text, }) => {
    const [isPopoverVisible, setIsPopoverVisible] = (0, element_1.useState)(false);
    const uniqueIdentifier = (0, compose_1.useInstanceId)(exports.Tooltip, 'product_tooltip');
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-tooltip', uniqueIdentifier) },
            (0, element_1.createElement)(components_1.Button, { className: (0, clsx_1.default)('fincommerce-tooltip__button', className), onKeyDown: (event) => {
                    if (event.key !== 'Enter') {
                        return;
                    }
                    setIsPopoverVisible(true);
                }, onClick: () => setIsPopoverVisible(!isPopoverVisible), label: helperText }, children),
            isPopoverVisible && ((0, element_1.createElement)(components_1.Popover, { focusOnMount: true, position: position, inline: true, className: "fincommerce-tooltip__text", onFocusOutside: (event) => {
                    if (event.currentTarget?.classList.contains(uniqueIdentifier)) {
                        return;
                    }
                    setIsPopoverVisible(false);
                }, onKeyDown: (event) => {
                    if (event.key !== 'Escape') {
                        return;
                    }
                    setIsPopoverVisible(false);
                } }, text)))));
};
exports.Tooltip = Tooltip;
