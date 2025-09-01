"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementStyles = exports.getHeadingElementStyles = void 0;
/**
 * External dependencies
 */
const deepmerge_1 = __importDefault(require("deepmerge"));
const defaultStyleObject = {
    typography: {},
    color: {},
};
/**
 * Gets combined element styles for a heading element.
 *
 * If merge is true, individual styles will be merged with the heading styles.
 * This should be false in the Editor UI so heading levels state "default" in the tools UI instead of using
 * values from the parent "heading" element.
 *
 * @param styles
 * @param headingLevel
 * @param merge
 */
const getHeadingElementStyles = (styles, headingLevel = 'heading', merge = false) => merge
    ? deepmerge_1.default.all([
        defaultStyleObject,
        styles.elements.heading || {},
        styles.elements[headingLevel] || {},
    ])
    : {
        ...defaultStyleObject,
        ...(styles.elements.heading || {}),
        ...(styles.elements[headingLevel] || {}),
    };
exports.getHeadingElementStyles = getHeadingElementStyles;
const getElementStyles = (styles, element, headingLevel = 'heading', merge = false) => {
    switch (element) {
        case 'text':
            return {
                typography: styles.typography,
                color: styles.color,
            };
        case 'heading':
            return (0, exports.getHeadingElementStyles)(styles, headingLevel ?? 'heading', merge);
        default:
            return (styles.elements[element] ||
                defaultStyleObject);
    }
};
exports.getElementStyles = getElementStyles;
