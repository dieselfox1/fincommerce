"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const Badge = ({ count, className = '', ...props }) => {
    return ((0, element_1.createElement)("span", { className: `fincommerce-badge ${className}`, ...props }, count));
};
exports.Badge = Badge;
