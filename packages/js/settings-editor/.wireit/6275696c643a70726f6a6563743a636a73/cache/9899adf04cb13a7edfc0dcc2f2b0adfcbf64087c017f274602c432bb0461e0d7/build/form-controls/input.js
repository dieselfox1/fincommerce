"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const Input = ({ field, onChange, data, help, type }) => {
    const { id, getValue, placeholder } = field;
    const value = getValue({ item: data });
    // DataForm will automatically use the id as the label if no label is provided so we conditionally set the label to undefined if it matches the id to avoid displaying it.
    // We should contribute upstream to allow label to be optional.
    const label = field.label === id ? undefined : field.label;
    return ((0, element_1.createElement)(components_1.__experimentalInputControl, { id: id, label: label, type: type, value: value, help: help, placeholder: placeholder, onChange: (newValue) => {
            onChange({
                [id]: newValue,
            });
        } }));
};
exports.Input = Input;
