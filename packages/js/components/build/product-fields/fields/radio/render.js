"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const RadioField = ({ label, value, onChange, options = [], }) => {
    return ((0, element_1.createElement)(components_1.RadioControl, { label: label, options: options, onChange: onChange, selected: value }));
};
exports.default = RadioField;
