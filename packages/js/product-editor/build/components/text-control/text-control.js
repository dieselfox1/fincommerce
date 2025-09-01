"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextControl = void 0;
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const label_1 = require("../label/label");
exports.TextControl = (0, element_1.forwardRef)(function ForwardedTextControl({ label, help, error, tooltip, className, required, onChange, onBlur, ...props }, ref) {
    return ((0, element_1.createElement)(components_1.__experimentalInputControl, { ...props, ref: ref, className: (0, clsx_1.default)('fincommerce-product-text-control', className, {
            'has-error': error,
        }), label: (0, element_1.createElement)(label_1.Label, { label: label, required: required, tooltip: tooltip }), required: required, help: error || help, onChange: (value) => {
            onChange(value ?? '');
        }, onBlur: onBlur }));
});
