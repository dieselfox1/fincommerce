"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacePersonalizationTagsWithHTMLComments = exports.getCursorPosition = void 0;
const rich_text_1 = require("@wordpress/rich-text");
function getChildElement(rootElement) {
    let currentElement = rootElement;
    while (currentElement && currentElement?.children?.length > 0) {
        // Traverse into the first child element
        currentElement = currentElement.children[0];
    }
    return currentElement;
}
function findReplacementIndex(element, replacements) {
    // Iterate over the replacements array
    for (const [index, replacement] of replacements.entries()) {
        if (!replacement) {
            continue;
        }
        const { attributes } = replacement;
        if (element.getAttribute('data-rich-text-comment') ===
            attributes['data-rich-text-comment']) {
            return index;
        }
    }
    return null; // Return null if no match is found
}
/**
 * Find the latest index of the format that matches the element.
 *
 * @param element
 * @param formats
 */
function findLatestFormatIndex(element, formats) {
    let latestFormatIndex = null;
    for (const [index, formatList] of formats.entries()) {
        if (!formatList) {
            continue;
        }
        // Check each format within the format list at the current index
        for (const format of formatList) {
            if (
            // @ts-expect-error attributes property is missing in build type for RichTextFormatList type
            format?.attributes &&
                element.tagName.toLowerCase() ===
                    // @ts-expect-error tagName property is missing in build type for RichTextFormatList type
                    format.tagName?.toLowerCase() &&
                element.getAttribute('data-link-href') ===
                    // @ts-expect-error attributes property is missing in build type for RichTextFormatList type
                    format?.attributes['data-link-href']) {
                latestFormatIndex = index;
            }
        }
    }
    return latestFormatIndex;
}
/**
 * Retrieves the cursor position within a RichText component.
 * Calculates the offset in plain text while accounting for HTML tags and comments.
 *
 * @param {React.RefObject<HTMLElement>} richTextRef - Reference to the RichText component.
 * @param {string}                       content     - The plain text content of the block.
 * @return {{ start: number, end: number } | null} - The cursor position as start and end offsets.
 */
const getCursorPosition = (richTextRef, content) => {
    const selection = richTextRef.current.ownerDocument.defaultView.getSelection();
    if (!selection.rangeCount) {
        return {
            start: 0,
            end: 0,
        };
    }
    const range = selection.getRangeAt(0);
    if (selection.anchorNode.previousSibling === null) {
        return {
            start: selection.anchorOffset,
            end: selection.anchorOffset + range.toString().length,
        };
    }
    const richTextValue = (0, rich_text_1.create)({ html: content });
    let previousSibling = selection.anchorNode.previousSibling;
    previousSibling = getChildElement(previousSibling);
    const formatIndex = findLatestFormatIndex(previousSibling, richTextValue.formats);
    if (formatIndex !== null) {
        return {
            start: formatIndex + selection.anchorOffset + 1, // We need to add 1 for the format length
            end: formatIndex + selection.anchorOffset + range.toString().length,
        };
    }
    const replacementIndex = findReplacementIndex(previousSibling, richTextValue.replacements);
    if (replacementIndex !== null) {
        return {
            start: replacementIndex + selection.anchorOffset + 1, // We need to add 1 for the replacement length
            end: replacementIndex +
                selection.anchorOffset +
                range.toString().length,
        };
    }
    // fallback for placing the value at the end of the rich text
    return {
        start: richTextValue.text.length,
        end: richTextValue.text.length + range.toString().length,
    };
};
exports.getCursorPosition = getCursorPosition;
/**
 * Replace registered personalization tags with HTML comments in content.
 *
 * @param content string The content to replace the tags in.
 * @param tags    PersonalizationTag[] The tags to replace in the content.
 */
const replacePersonalizationTagsWithHTMLComments = (content, tags) => {
    tags.forEach((tag) => {
        // Skip if the token is not in the content
        if (!content.includes(tag.token.slice(0, tag.token.length - 1))) {
            return;
        }
        // Match the token with optional attributes like [mailpoet/subscriber-firstname default="user"]
        const baseToken = tag.token
            .substring(1, tag.token.length - 1)
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape base token and remove brackets
        const regex = new RegExp(`(?<!<!--)(?<!["'])\\[(${baseToken}(\\s[^\\]]*)?)\\](?!-->)`, // Match token not inside quotes (attributes)
        'g');
        content = content.replace(regex, (match) => {
            // Use the exact text inside the brackets for the replacement
            return `<!--${match}-->`;
        });
    });
    return content;
};
exports.replacePersonalizationTagsWithHTMLComments = replacePersonalizationTagsWithHTMLComments;
