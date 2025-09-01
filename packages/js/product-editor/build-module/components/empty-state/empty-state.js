/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
export function EmptyState({ names = [], ...props }) {
    return (createElement("div", { ...props, role: "none", className: "fincommerce-product-empty-state" }, names.map((name) => (createElement("div", { key: name, className: "fincommerce-product-empty-state__row" },
        name === '' ? (createElement("div", { className: "fincommerce-product-empty-state__name" })) : (createElement("div", null, name)),
        createElement("div", null,
            createElement("div", { className: "fincommerce-product-empty-state__value" })),
        createElement("div", null,
            createElement("div", { className: "fincommerce-product-empty-state__actions" })))))));
}
