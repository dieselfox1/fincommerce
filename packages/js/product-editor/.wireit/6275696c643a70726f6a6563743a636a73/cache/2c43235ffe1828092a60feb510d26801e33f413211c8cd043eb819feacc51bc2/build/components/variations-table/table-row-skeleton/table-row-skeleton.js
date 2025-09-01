"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRowSkeleton = TableRowSkeleton;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function TableRowSkeleton() {
    return ((0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton fincommerce-product-variations__table-row", "aria-hidden": "true" },
        (0, element_1.createElement)("div", { className: "fincommerce-sortable__handle" }),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__selection" },
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__checkbox" })),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__attributes" }, Array(2)
            .fill(0)
            .map((_, index) => ((0, element_1.createElement)("div", { key: index, className: "fincommerce-tag fincommerce-product-variations__attribute" },
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__attribute-option" }))))),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__price" },
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__regular-price" })),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__quantity" },
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__quantity" })),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__actions" },
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__visibility-icon" }),
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__edit-link" }),
            (0, element_1.createElement)("div", { className: "fincommerce-table-row-skeleton__menu-toggle" }))));
}
