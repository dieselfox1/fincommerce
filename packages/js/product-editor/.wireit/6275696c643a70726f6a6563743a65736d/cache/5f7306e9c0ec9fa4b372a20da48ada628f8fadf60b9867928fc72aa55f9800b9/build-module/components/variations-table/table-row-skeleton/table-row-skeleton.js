/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
export function TableRowSkeleton() {
    return (createElement("div", { className: "fincommerce-table-row-skeleton fincommerce-product-variations__table-row", "aria-hidden": "true" },
        createElement("div", { className: "fincommerce-sortable__handle" }),
        createElement("div", { className: "fincommerce-product-variations__selection" },
            createElement("div", { className: "fincommerce-table-row-skeleton__checkbox" })),
        createElement("div", { className: "fincommerce-product-variations__attributes" }, Array(2)
            .fill(0)
            .map((_, index) => (createElement("div", { key: index, className: "fincommerce-tag fincommerce-product-variations__attribute" },
            createElement("div", { className: "fincommerce-table-row-skeleton__attribute-option" }))))),
        createElement("div", { className: "fincommerce-product-variations__price" },
            createElement("div", { className: "fincommerce-table-row-skeleton__regular-price" })),
        createElement("div", { className: "fincommerce-product-variations__quantity" },
            createElement("div", { className: "fincommerce-table-row-skeleton__quantity" })),
        createElement("div", { className: "fincommerce-product-variations__actions" },
            createElement("div", { className: "fincommerce-table-row-skeleton__visibility-icon" }),
            createElement("div", { className: "fincommerce-table-row-skeleton__edit-link" }),
            createElement("div", { className: "fincommerce-table-row-skeleton__menu-toggle" }))));
}
