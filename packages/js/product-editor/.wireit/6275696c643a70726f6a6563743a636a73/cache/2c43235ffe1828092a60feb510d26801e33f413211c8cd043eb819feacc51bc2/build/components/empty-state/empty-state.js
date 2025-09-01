"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = EmptyState;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function EmptyState({ names = [], ...props }) {
    return ((0, element_1.createElement)("div", { ...props, role: "none", className: "fincommerce-product-empty-state" }, names.map((name) => ((0, element_1.createElement)("div", { key: name, className: "fincommerce-product-empty-state__row" },
        name === '' ? ((0, element_1.createElement)("div", { className: "fincommerce-product-empty-state__name" })) : ((0, element_1.createElement)("div", null, name)),
        (0, element_1.createElement)("div", null,
            (0, element_1.createElement)("div", { className: "fincommerce-product-empty-state__value" })),
        (0, element_1.createElement)("div", null,
            (0, element_1.createElement)("div", { className: "fincommerce-product-empty-state__actions" })))))));
}
