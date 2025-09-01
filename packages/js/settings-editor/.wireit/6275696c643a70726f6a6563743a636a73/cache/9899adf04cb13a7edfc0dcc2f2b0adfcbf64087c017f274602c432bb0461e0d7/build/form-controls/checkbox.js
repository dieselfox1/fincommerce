"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const Checkbox = ({ field, onChange, data, help }) => {
    const { id, getValue } = field;
    // DataForm will automatically use the id as the label if no label is provided so we conditionally set the label to undefined if it matches the id to avoid displaying it.
    // We should contribute upstream to allow label to be optional.
    const label = field.label === id ? undefined : field.label;
    const value = getValue({ item: data });
    const hiddenValue = value === 'yes' ? '1' : '0';
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.CheckboxControl, { __nextHasNoMarginBottom: true, label: label, help: help, checked: value === 'yes', onChange: (checked) => {
                onChange({
                    [id]: checked ? 'yes' : 'no',
                });
            } }),
        (0, element_1.createElement)("input", { type: "hidden", name: id, value: hiddenValue })));
};
exports.Checkbox = Checkbox;
