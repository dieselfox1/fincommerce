"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhancePostContentBlock = enhancePostContentBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
const i18n_1 = require("@wordpress/i18n");
const block_editor_1 = require("@wordpress/block-editor");
function Placeholder({ layoutClassNames }) {
    const blockProps = (0, block_editor_1.useBlockProps)({ className: layoutClassNames });
    return ((0, jsx_runtime_1.jsxs)("div", { ...blockProps, children: [(0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('This is the Content block.', 'fincommerce') }), (0, jsx_runtime_1.jsx)("p", { children: (0, i18n_1.__)('It will display all the blocks in the email content, which might be only simple text paragraphs. You can enrich your message with images, incorporate data through tables, explore different layout designs with columns, or use any other block type.', 'fincommerce') })] }));
}
// Curried function to add a custom placeholder to the post content block, or just use the original Edit component.
function PostContentEdit(OriginalEditComponent) {
    return function Edit(params) {
        const { postId: contextPostId, postType: contextPostType } = params.context;
        const { __unstableLayoutClassNames: layoutClassNames } = params;
        const hasContent = contextPostId && contextPostType;
        if (hasContent) {
            return (0, jsx_runtime_1.jsx)(OriginalEditComponent, { ...params });
        }
        return (0, jsx_runtime_1.jsx)(Placeholder, { layoutClassNames: layoutClassNames });
    };
}
function enhancePostContentBlock() {
    (0, hooks_1.addFilter)('blocks.registerBlockType', 'fincommerce-email-editor/change-post-content', (settings, name) => {
        if (name === 'core/post-content') {
            return {
                ...settings,
                edit: PostContentEdit(settings.edit),
            };
        }
        return settings;
    });
}
