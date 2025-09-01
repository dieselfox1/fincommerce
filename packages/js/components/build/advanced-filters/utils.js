"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textContent = textContent;
exports.getInterpolatedString = getInterpolatedString;
exports.backwardsCompatibleCreateInterpolateElement = backwardsCompatibleCreateInterpolateElement;
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
const deprecated_1 = __importDefault(require("@wordpress/deprecated"));
const element_1 = require("@wordpress/element");
/**
 * DOM Node.textContent for React components
 * See: https://github.com/rwu823/react-addons-text-content/blob/master/src/index.js
 *
 * @param {Array<string|Node>} components array of components
 *
 * @return {string} concatenated text content of all nodes
 */
function textContent(components) {
    let text = '';
    const toText = (component) => {
        if ((0, lodash_1.isString)(component) || (0, lodash_1.isNumber)(component)) {
            text += component;
        }
        else if ((0, lodash_1.isArray)(component)) {
            component.forEach(toText);
        }
        else if (component && component.props) {
            const { children } = component.props;
            if ((0, lodash_1.isArray)(children)) {
                children.forEach(toText);
            }
            else {
                toText(children);
            }
        }
    };
    toText(components);
    return text;
}
/**
 * This function processes an input string, checks for deprecated interpolation formatting, and
 * modifies it to conform to the new standard.
 * The deprecated interpolation formatting is `{{element}}...{{/element}}`, and the new standard
 * formatting is `<element>...</element>`.
 *
 * @param {string} interpolatedString The interpolation string to be parsed.
 *
 * @return {string}  Fixed interpolation string.
 */
function getInterpolatedString(interpolatedString) {
    const regex = /(\{\{)(\/?\s*\w+\s*\/?)(\}\})/g;
    const replacedString = interpolatedString.replaceAll(regex, (match, p1, p2) => {
        const inner = p2.trim();
        let replacement;
        if (inner.startsWith('/')) {
            // Closing tag
            replacement = `</${inner.slice(1)}>`;
        }
        else if (inner.endsWith('/')) {
            // Self-closing tag
            replacement = `<${inner.slice(0, -1)}/>`;
        }
        else {
            // Opening tag
            replacement = `<${inner}>`;
        }
        return replacement;
    });
    if (replacedString !== interpolatedString) {
        (0, deprecated_1.default)('Old interpolation string format `{{element}}...{{/element}}` or `{{element/}}`', {
            since: '7.8',
            alternative: 'new interpolation string format `<element>...</element>` or `<element/>`',
            link: 'https://github.com/dieselfox1/fincommerce/tree/trunk/packages/js/components/src/advanced-filters/README.md',
        });
    }
    return replacedString;
}
/**
 * This function creates an interpolation element that is backwards compatible.
 *
 * @param {string} interpolatedString The interpolation string to be parsed and transformed.
 * @param {Object} conversionMap      The map used for the conversion to create the interpolate element.
 *
 * @return {Element} A React element that is the result of applying the transformation.
 */
function backwardsCompatibleCreateInterpolateElement(interpolatedString, conversionMap) {
    return (0, element_1.createInterpolateElement)(getInterpolatedString(interpolatedString), conversionMap);
}
