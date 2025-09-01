"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitcherLoadingPlaceholder = SwitcherLoadingPlaceholder;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
function SwitcherLoadingPlaceholder({ position, }) {
    return ((0, element_1.createElement)(components_1.Button, { "data-testid": "fincommerce-product-variation-switcher-footer-placeholder", className: "fincommerce-product-variation-switcher-footer__button is-placeholder", disabled: true },
        position === 'left' && ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.arrowLeft, size: 16, className: "fincommerce-product-variation-switcher-footer__arrow" }),
            (0, element_1.createElement)("div", { className: "fincommerce-product-variation-switcher-footer__product-image" }))),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variation-switcher-footer__item-label" }),
        position === 'right' && ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)("div", { className: "fincommerce-product-variation-switcher-footer__product-image" }),
            (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.arrowRight, size: 16, className: "fincommerce-product-variation-switcher-footer__arrow" })))));
}
