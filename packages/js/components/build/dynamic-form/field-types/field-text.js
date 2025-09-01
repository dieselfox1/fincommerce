"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const index_1 = require("../../index");
const TextField = ({ field, type = 'text', ...props }) => {
    const { label, description } = field;
    return ((0, element_1.createElement)(index_1.TextControl, { type: type, title: description, label: label, ...props }));
};
exports.TextField = TextField;
