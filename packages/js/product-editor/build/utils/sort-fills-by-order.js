"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortFillsByOrder = void 0;
/**
 * External dependencies
 */
const react_1 = require("react");
const element_1 = require("@wordpress/element");
const sortFillsByOrder = (fills) => {
    // Copy fills array here because its type is readonly array that doesn't have .sort method in Typescript definition.
    const sortedFills = [...fills].sort((a, b) => {
        return a[0].props.order - b[0].props.order;
    });
    return (0, element_1.createElement)(react_1.Fragment, null, sortedFills);
};
exports.sortFillsByOrder = sortFillsByOrder;
