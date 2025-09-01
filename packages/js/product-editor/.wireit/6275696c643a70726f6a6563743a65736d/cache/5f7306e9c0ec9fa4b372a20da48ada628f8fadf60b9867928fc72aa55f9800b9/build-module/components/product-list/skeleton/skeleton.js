/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
export function Skeleton() {
    return (createElement("div", { "aria-hidden": "true", "aria-label": __('Loading linked products', 'fincommerce'), className: "fincommerce-product-list" },
        createElement("div", { role: "table" },
            createElement("div", { role: "rowgroup" },
                createElement("div", { role: "rowheader" },
                    createElement("div", { role: "columnheader" },
                        createElement("div", { className: "skeleton" })),
                    createElement("div", { role: "columnheader" }))),
            createElement("div", { role: "rowgroup" }, Array.from({ length: 3 }).map((_, index) => (createElement("div", { role: "row", key: index },
                createElement("div", { role: "cell" },
                    createElement("div", { className: "fincommerce-product-list__product-image skeleton" }),
                    createElement("div", { className: "fincommerce-product-list__product-info" },
                        createElement("div", { className: "fincommerce-product-list__product-name skeleton" }),
                        createElement("div", { className: "fincommerce-product-list__product-price skeleton" }))),
                createElement("div", { role: "cell", className: "fincommerce-product-list__actions" },
                    createElement("div", { className: "skeleton" }),
                    createElement("div", { className: "skeleton" })))))))));
}
