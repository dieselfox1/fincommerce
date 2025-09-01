"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioField = RadioField;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const sanitize_html_1 = require("../../utils/sanitize-html");
function RadioField({ title, description, className, ...props }) {
    return ((0, element_1.createElement)(components_1.RadioControl, { ...props, className: (0, clsx_1.default)(className, 'fincommerce-radio-field'), label: (0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)("span", { className: "fincommerce-radio-field__title" }, title),
            description && ((0, element_1.createElement)("span", { className: "fincommerce-radio-field__description", dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(description) }))) }));
}
