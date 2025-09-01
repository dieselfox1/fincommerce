/**
 * Internal dependencies
 */
import { EmailStyles } from '../../store';
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
export declare const getHeadingElementStyles: (styles: EmailStyles, headingLevel?: string, merge?: boolean) => EmailStyles;
export declare const getElementStyles: (styles: EmailStyles, element: string, headingLevel?: string, merge?: boolean) => EmailStyles;
