"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSection = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const FormSection = ({ title, description, className, children, }) => {
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)('fincommerce-form-section', className) },
        (0, element_1.createElement)("div", { className: "fincommerce-form-section__header" },
            (0, element_1.createElement)("h3", { className: "fincommerce-form-section__title" }, title),
            (0, element_1.createElement)("div", { className: "fincommerce-form-section__description" }, description)),
        (0, element_1.createElement)("div", { className: "fincommerce-form-section__content" }, children)));
};
exports.FormSection = FormSection;
