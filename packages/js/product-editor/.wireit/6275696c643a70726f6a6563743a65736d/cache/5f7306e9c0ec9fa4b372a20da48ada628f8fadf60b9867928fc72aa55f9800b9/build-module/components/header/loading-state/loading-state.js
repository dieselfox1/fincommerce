/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
export function LoadingState() {
    return (createElement("div", { className: "fincommerce-product-header is-loading", "aria-hidden": "true" },
        createElement("div", { className: "fincommerce-product-header__inner" },
            createElement("div", null),
            createElement("div", { className: "fincommerce-product-header__title" }),
            createElement("div", { className: "fincommerce-product-header__actions" },
                createElement("div", { className: "fincommerce-product-header__action" }),
                createElement("div", { className: "fincommerce-product-header__action" }),
                createElement("div", { className: "fincommerce-product-header__action" }),
                createElement("div", { className: "fincommerce-product-header__action" }))),
        createElement("div", { className: "fincommerce-product-tabs" }, Array(7)
            .fill(0)
            .map((_, index) => (createElement("div", { key: index, className: "components-button" }))))));
}
