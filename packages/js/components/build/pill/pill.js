"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pill = Pill;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const experimental_1 = require("../experimental");
function Pill({ children, className = '' }) {
    return ((0, element_1.createElement)(experimental_1.Text, { className: (0, clsx_1.default)('fincommerce-pill', className), variant: "caption", as: "span", size: "12", lineHeight: "16px" }, children));
}
