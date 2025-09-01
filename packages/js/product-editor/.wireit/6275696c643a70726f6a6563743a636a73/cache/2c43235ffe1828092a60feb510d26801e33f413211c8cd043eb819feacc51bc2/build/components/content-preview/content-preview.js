"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentPreview = ContentPreview;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const sanitize_html_1 = require("../../utils/sanitize-html");
const CONTENT_TAGS = [
    'a',
    'b',
    'em',
    'i',
    'strong',
    'p',
    'br',
    'img',
    'blockquote',
    'cite',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'li',
    'ol',
    'div',
];
const CONTENT_ATTR = [
    'target',
    'href',
    'rel',
    'name',
    'download',
    'src',
    'style',
    'class',
];
function ContentPreview({ content }) {
    const parentEditorSettings = (0, data_1.useSelect)((select) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return select(block_editor_1.store).getSettings();
    }, []);
    return ((0, element_1.createElement)("div", { className: "fincommerce-content-preview" },
        (0, element_1.createElement)(block_editor_1.__unstableIframe, { className: "fincommerce-content-preview__iframe", tabIndex: -1 },
            (0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)(block_editor_1.__unstableEditorStyles, { styles: parentEditorSettings?.styles }),
                (0, element_1.createElement)("style", null, `body {
									overflow: hidden;
								}`),
                (0, element_1.createElement)("div", { className: "fincommerce-content-preview__content", dangerouslySetInnerHTML: (0, sanitize_html_1.sanitizeHTML)(content, {
                        tags: CONTENT_TAGS,
                        attr: CONTENT_ATTR,
                    }) })))));
}
