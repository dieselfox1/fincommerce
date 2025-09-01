/**
 * External dependencies
 */
import { getSetting } from '@fincommerce/settings';
import { sanitize } from 'dompurify';
export function isGutenbergVersionAtLeast(version) {
    const adminSettings = getSetting('admin');
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
export function sanitizeHTML(html) {
    return sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
