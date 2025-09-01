"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const Textarea = ({ field, onChange, data, help }) => {
    const { id, getValue, placeholder } = field;
    const label = field.label === id ? undefined : field.label;
    const value = getValue({ item: data });
    return ((0, element_1.createElement)(components_1.TextareaControl, { __nextHasNoMarginBottom: true, help: help, label: label, placeholder: placeholder, onChange: (newValue) => {
            onChange({
                [id]: newValue,
            });
        }, value: value, id: id }));
};
exports.Textarea = Textarea;
