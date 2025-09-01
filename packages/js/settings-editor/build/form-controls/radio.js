"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const Radio = ({ field, onChange, data, help }) => {
    const { id, getValue, elements } = field;
    const value = getValue({ item: data });
    const label = field.label === id ? undefined : field.label;
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.RadioControl, { help: help, label: label, onChange: (newValue) => {
                onChange({
                    [id]: newValue,
                });
            }, options: elements, selected: value }),
        (0, element_1.createElement)("input", { type: "hidden", name: id, value: value })));
};
exports.Radio = Radio;
