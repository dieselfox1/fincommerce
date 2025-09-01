"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
function Skeleton() {
    return ((0, element_1.createElement)("div", { "aria-hidden": "true", "aria-label": (0, i18n_1.__)('Loading linked products', 'fincommerce'), className: "fincommerce-product-list" },
        (0, element_1.createElement)("div", { role: "table" },
            (0, element_1.createElement)("div", { role: "rowgroup" },
                (0, element_1.createElement)("div", { role: "rowheader" },
                    (0, element_1.createElement)("div", { role: "columnheader" },
                        (0, element_1.createElement)("div", { className: "skeleton" })),
                    (0, element_1.createElement)("div", { role: "columnheader" }))),
            (0, element_1.createElement)("div", { role: "rowgroup" }, Array.from({ length: 3 }).map((_, index) => ((0, element_1.createElement)("div", { role: "row", key: index },
                (0, element_1.createElement)("div", { role: "cell" },
                    (0, element_1.createElement)("div", { className: "fincommerce-product-list__product-image skeleton" }),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-list__product-info" },
                        (0, element_1.createElement)("div", { className: "fincommerce-product-list__product-name skeleton" }),
                        (0, element_1.createElement)("div", { className: "fincommerce-product-list__product-price skeleton" }))),
                (0, element_1.createElement)("div", { role: "cell", className: "fincommerce-product-list__actions" },
                    (0, element_1.createElement)("div", { className: "skeleton" }),
                    (0, element_1.createElement)("div", { className: "skeleton" })))))))));
}
