"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingState = LoadingState;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
function LoadingState() {
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-header is-loading", "aria-hidden": "true" },
        (0, element_1.createElement)("div", { className: "fincommerce-product-header__inner" },
            (0, element_1.createElement)("div", null),
            (0, element_1.createElement)("div", { className: "fincommerce-product-header__title" }),
            (0, element_1.createElement)("div", { className: "fincommerce-product-header__actions" },
                (0, element_1.createElement)("div", { className: "fincommerce-product-header__action" }),
                (0, element_1.createElement)("div", { className: "fincommerce-product-header__action" }),
                (0, element_1.createElement)("div", { className: "fincommerce-product-header__action" }),
                (0, element_1.createElement)("div", { className: "fincommerce-product-header__action" }))),
        (0, element_1.createElement)("div", { className: "fincommerce-product-tabs" }, Array(7)
            .fill(0)
            .map((_, index) => ((0, element_1.createElement)("div", { key: index, className: "components-button" }))))));
}
