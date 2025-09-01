"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const context_1 = require("./context");
/**
 * The section wrapper, used to indicate a sub-section (and change the header level context).
 */
const Section = ({ component, children, ...props }) => {
    const Component = component || 'div';
    return ((0, element_1.createElement)(context_1.Level.Consumer, null, (level) => ((0, element_1.createElement)(context_1.Level.Provider, { value: level + 1 }, component === false ? (children) : ((0, element_1.createElement)(Component, { ...props }, children))))));
};
exports.Section = Section;
