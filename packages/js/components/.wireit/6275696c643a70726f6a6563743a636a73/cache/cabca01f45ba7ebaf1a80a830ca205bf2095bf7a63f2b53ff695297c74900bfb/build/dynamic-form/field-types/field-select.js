"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectField = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const index_1 = require("../../index");
const transformOptions = (options) => Object.entries(options).map(([key, value]) => ({
    key,
    label: value,
    value: { id: key },
}));
const SelectField = ({ field, ...props }) => {
    const { description, label, options = {} } = field;
    const transformedOptions = (0, element_1.useMemo)(() => transformOptions(options), [options]);
    return ((0, element_1.createElement)(index_1.SelectControl, { title: description, label: label, options: transformedOptions, ...props }));
};
exports.SelectField = SelectField;
