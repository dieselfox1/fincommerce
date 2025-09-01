"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * `EmptyTable` displays a blank space with an optional message passed as a children node
 * with the purpose of replacing a table with no rows.
 * It mimics the same height a table would have according to the `numberOfRows` prop.
 */
const EmptyTable = ({ children, numberOfRows = 5 }) => {
    return ((0, element_1.createElement)("div", { className: "fincommerce-table is-empty", style: { '--number-of-rows': numberOfRows } }, children));
};
exports.default = EmptyTable;
