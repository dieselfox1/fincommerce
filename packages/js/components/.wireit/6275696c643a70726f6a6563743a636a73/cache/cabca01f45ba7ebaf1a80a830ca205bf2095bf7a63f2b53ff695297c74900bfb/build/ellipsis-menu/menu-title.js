"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * `MenuTitle` is another valid Menu child, but this does not have any accessibility attributes associated
 * (so this should not be used in place of the `EllipsisMenu` prop `label`).
 */
const MenuTitle = ({ children, }) => {
    return (0, element_1.createElement)("div", { className: "fincommerce-ellipsis-menu__title" }, children);
};
exports.default = MenuTitle;
