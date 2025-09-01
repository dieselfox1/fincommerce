/**
 * External dependencies
 */
import deepmerge from 'deepmerge';
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
export const getHeadingElementStyles = (styles, headingLevel = 'heading', merge = false) => merge
    ? deepmerge.all([
        defaultStyleObject,
        styles.elements.heading || {},
        styles.elements[headingLevel] || {},
    ])
    : {
        ...defaultStyleObject,
        ...(styles.elements.heading || {}),
        ...(styles.elements[headingLevel] || {}),
    };
export const getElementStyles = (styles, element, headingLevel = 'heading', merge = false) => {
    switch (element) {
        case 'text':
            return {
                typography: styles.typography,
                color: styles.color,
            };
        case 'heading':
            return getHeadingElementStyles(styles, headingLevel ?? 'heading', merge);
        default:
            return (styles.elements[element] ||
                defaultStyleObject);
    }
};
