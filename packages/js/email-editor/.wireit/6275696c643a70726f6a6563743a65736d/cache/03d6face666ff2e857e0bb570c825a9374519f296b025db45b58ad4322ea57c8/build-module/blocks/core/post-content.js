import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * External dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
function Placeholder({ layoutClassNames }) {
    const blockProps = useBlockProps({ className: layoutClassNames });
    return (_jsxs("div", { ...blockProps, children: [_jsx("p", { children: __('This is the Content block.', 'fincommerce') }), _jsx("p", { children: __('It will display all the blocks in the email content, which might be only simple text paragraphs. You can enrich your message with images, incorporate data through tables, explore different layout designs with columns, or use any other block type.', 'fincommerce') })] }));
}
// Curried function to add a custom placeholder to the post content block, or just use the original Edit component.
function PostContentEdit(OriginalEditComponent) {
    return function Edit(params) {
        const { postId: contextPostId, postType: contextPostType } = params.context;
        const { __unstableLayoutClassNames: layoutClassNames } = params;
        const hasContent = contextPostId && contextPostType;
        if (hasContent) {
            return _jsx(OriginalEditComponent, { ...params });
        }
        return _jsx(Placeholder, { layoutClassNames: layoutClassNames });
    };
}
function enhancePostContentBlock() {
    addFilter('blocks.registerBlockType', 'fincommerce-email-editor/change-post-content', (settings, name) => {
        if (name === 'core/post-content') {
            return {
                ...settings,
                edit: PostContentEdit(settings.edit),
            };
        }
        return settings;
    });
}
export { enhancePostContentBlock };
