"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByTextWithMarkup = void 0;
/**
 * External dependencies
 */
const react_1 = require("@testing-library/react");
/**
 * For use with react-testing-library, like getText but allows the text to reside in multiple elements
 *
 * @param {Object} query - Original query.
 *
 * @return {Array} - Array of two arrays, first including truthy values, and second including falsy.
 */
const withMarkup = (query) => (text) => query((content, node) => {
    const hasText = (domNode) => domNode.textContent === text;
    const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
    return hasText(node) && childrenDontHaveText;
});
exports.getByTextWithMarkup = withMarkup(react_1.screen.getByText);
