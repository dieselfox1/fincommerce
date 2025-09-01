"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const TextField = ({ label, value, onChange }) => {
    return ((0, element_1.createElement)(components_1.TextControl, { label: label, onChange: onChange, value: value }));
};
exports.default = TextField;
