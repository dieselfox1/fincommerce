"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const SelectControlField = ({ label, value, onChange, multiple, options = [], }) => {
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.SelectControl, { multiple: multiple, label: label, options: options, onChange: onChange, value: value })));
};
exports.default = SelectControlField;
