/**
 * DOM Node.textContent for React components
 * See: https://github.com/rwu823/react-addons-text-content/blob/master/src/index.js
 *
 * @param {Array<string|Node>} components array of components
 *
 * @return {string} concatenated text content of all nodes
 */
export function textContent(components: Array<string | Node>): string;
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
export function getInterpolatedString(interpolatedString: string): string;
/**
 * This function creates an interpolation element that is backwards compatible.
 *
 * @param {string} interpolatedString The interpolation string to be parsed and transformed.
 * @param {Object} conversionMap      The map used for the conversion to create the interpolate element.
 *
 * @return {Element} A React element that is the result of applying the transformation.
 */
export function backwardsCompatibleCreateInterpolateElement(interpolatedString: string, conversionMap: Object): Element;
//# sourceMappingURL=utils.d.ts.map