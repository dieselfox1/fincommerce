"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHTML = sanitizeHTML;
/**
 * External dependencies
 */
const dompurify_1 = require("dompurify");
const ALLOWED_TAGS = ['a', 'b', 'em', 'i', 'strong', 'p', 'br', 'abbr'];
const ALLOWED_ATTR = ['target', 'href', 'rel', 'name', 'download', 'title'];
function sanitizeHTML(html, config) {
    const allowedTags = config?.tags || ALLOWED_TAGS;
    const allowedAttr = config?.attr || ALLOWED_ATTR;
    return {
        __html: (0, dompurify_1.sanitize)(html, {
            ALLOWED_TAGS: allowedTags,
            ALLOWED_ATTR: allowedAttr,
        }),
    };
}
