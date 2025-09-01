"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGutenbergVersionAtLeast = isGutenbergVersionAtLeast;
exports.sanitizeHTML = sanitizeHTML;
/**
 * External dependencies
 */
const settings_1 = require("@fincommerce/settings");
const dompurify_1 = require("dompurify");
function isGutenbergVersionAtLeast(version) {
    const adminSettings = (0, settings_1.getSetting)('admin');
    if (adminSettings.gutenberg_version) {
        return parseFloat(adminSettings?.gutenberg_version) >= version;
    }
    return false;
}
const ALLOWED_TAGS = [
    'a',
    'b',
    'em',
    'i',
    'strong',
    'p',
    'br',
    'code',
    'mark',
    'sub',
    'sup',
    'pre',
    'span',
    'ul',
    'ol',
    'li',
    'blockquote',
    'hr',
];
const ALLOWED_ATTR = ['target', 'href', 'rel', 'name', 'download', 'title'];
/**
 * Sanitizes HTML content to ensure it only contains allowed tags and attributes.
 *
 * @param html - The HTML content to sanitize.
 * @return Sanitized HTML content.
 */
function sanitizeHTML(html) {
    return (0, dompurify_1.sanitize)(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
