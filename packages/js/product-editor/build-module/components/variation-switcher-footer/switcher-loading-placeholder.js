/**
 * External dependencies
 */
import { createElement, Fragment } from '@wordpress/element';
import { arrowLeft, arrowRight, Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';
export function SwitcherLoadingPlaceholder({ position, }) {
    return (createElement(Button, { "data-testid": "fincommerce-product-variation-switcher-footer-placeholder", className: "fincommerce-product-variation-switcher-footer__button is-placeholder", disabled: true },
        position === 'left' && (createElement(Fragment, null,
            createElement(Icon, { icon: arrowLeft, size: 16, className: "fincommerce-product-variation-switcher-footer__arrow" }),
            createElement("div", { className: "fincommerce-product-variation-switcher-footer__product-image" }))),
        createElement("div", { className: "fincommerce-product-variation-switcher-footer__item-label" }),
        position === 'right' && (createElement(Fragment, null,
            createElement("div", { className: "fincommerce-product-variation-switcher-footer__product-image" }),
            createElement(Icon, { icon: arrowRight, size: 16, className: "fincommerce-product-variation-switcher-footer__arrow" })))));
}
