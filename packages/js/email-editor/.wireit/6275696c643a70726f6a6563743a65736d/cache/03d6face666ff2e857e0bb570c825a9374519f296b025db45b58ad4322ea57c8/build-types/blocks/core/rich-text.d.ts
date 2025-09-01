/**
 * Disable Rich text formats we currently cannot support
 * Note: This will remove its support for all blocks in the email editor e.g., p, h1,h2, etc
 */
declare function disableCertainRichTextFormats(): void;
/**
 * Extend the rich text formats with a button for personalization tags.
 */
declare function extendRichTextFormats(): void;
/**
 * Replace written personalization tags with HTML comments in real-time.
 */
declare function activatePersonalizationTagsReplacing(): void;
export { disableCertainRichTextFormats, extendRichTextFormats, activatePersonalizationTagsReplacing, };
