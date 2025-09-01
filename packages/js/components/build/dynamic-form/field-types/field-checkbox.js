"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxField = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const CheckboxField = ({ field, onChange, ...props }) => {
    const { label, description } = field;
    return ((0, element_1.createElement)(components_1.CheckboxControl, { onChange: (val) => onChange(val), title: description, label: label, ...props }));
};
exports.CheckboxField = CheckboxField;
