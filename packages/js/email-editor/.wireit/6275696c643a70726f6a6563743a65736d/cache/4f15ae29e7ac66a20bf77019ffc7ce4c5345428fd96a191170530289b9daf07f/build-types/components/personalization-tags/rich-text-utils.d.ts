/**
 * External dependencies
 */
import * as React from '@wordpress/element';
/**
 * Internal dependencies
 */
import { PersonalizationTag } from '../../store';
/**
 * Retrieves the cursor position within a RichText component.
 * Calculates the offset in plain text while accounting for HTML tags and comments.
 *
 * @param {React.RefObject<HTMLElement>} richTextRef - Reference to the RichText component.
 * @param {string}                       content     - The plain text content of the block.
 * @return {{ start: number, end: number } | null} - The cursor position as start and end offsets.
 */
declare const getCursorPosition: (richTextRef: React.RefObject<HTMLElement>, content: string) => {
    start: number;
    end: number;
};
/**
 * Replace registered personalization tags with HTML comments in content.
 *
 * @param content string The content to replace the tags in.
 * @param tags    PersonalizationTag[] The tags to replace in the content.
 */
declare const replacePersonalizationTagsWithHTMLComments: (content: string, tags: PersonalizationTag[]) => string;
export { getCursorPosition, replacePersonalizationTagsWithHTMLComments };
