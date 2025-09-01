"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableCertainRichTextFormats = disableCertainRichTextFormats;
exports.extendRichTextFormats = extendRichTextFormats;
exports.activatePersonalizationTagsReplacing = activatePersonalizationTagsReplacing;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * External dependencies
 */
const rich_text_1 = require("@wordpress/rich-text");
const i18n_1 = require("@wordpress/i18n");
const block_editor_1 = require("@wordpress/block-editor");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const hooks_1 = require("@wordpress/hooks");
const compose_1 = require("@wordpress/compose");
/**
 * Internal dependencies
 */
const rich_text_utils_1 = require("../../components/personalization-tags/rich-text-utils");
const personalization_tags_modal_1 = require("../../components/personalization-tags/personalization-tags-modal");
const store_1 = require("../../store");
const personalization_tags_popover_1 = require("../../components/personalization-tags/personalization-tags-popover");
const personalization_tags_link_popover_1 = require("../../components/personalization-tags/personalization-tags-link-popover");
const events_1 = require("../../events");
const use_is_email_editor_1 = require("../../hooks/use-is-email-editor");
/**
 * Disable Rich text formats we currently cannot support
 * Note: This will remove its support for all blocks in the email editor e.g., p, h1,h2, etc
 */
function disableCertainRichTextFormats() {
    // remove support for inline image - We can't use it
    (0, rich_text_1.unregisterFormatType)('core/image');
    // remove support for Inline code - Not well formatted
    (0, rich_text_1.unregisterFormatType)('core/code');
    // remove support for Language - Not supported for now
    (0, rich_text_1.unregisterFormatType)('core/language');
}
/**
 * A button to the rich text editor to open modal with registered personalization tags.
 *
 * @param root0
 * @param root0.contentRef
 */
function PersonalizationTagsButton({ contentRef }) {
    const [isModalOpened, setIsModalOpened] = (0, element_1.useState)(false);
    const selectedBlockId = (0, data_1.useSelect)((select) => select('core/block-editor').getSelectedBlockClientId());
    const { updateBlockAttributes } = (0, data_1.useDispatch)('core/block-editor');
    // Get the current block attributes
    const blockAttributes = (0, data_1.useSelect)((select) => {
        const attributes = select('core/block-editor').getBlockAttributes(selectedBlockId);
        return attributes;
    });
    // Some blocks, such as the Button block, store the content in `text` attribute.
    const blockContentKey = 'text' in blockAttributes ? 'text' : 'content';
    // After first saving the content does not have property originalHTML, so we need to check for content as well
    const blockContent = blockAttributes?.[blockContentKey]?.originalHTML ||
        blockAttributes?.[blockContentKey] ||
        '';
    const handleInsert = (0, element_1.useCallback)((tag, linkText) => {
        let { start, end } = (0, rich_text_utils_1.getCursorPosition)(contentRef, blockContent);
        let updatedContent = '';
        // When we pass linkText, we want to insert the tag as a link
        if (linkText) {
            let richTextValue = (0, rich_text_1.create)({ html: blockContent });
            // Insert the new text into the current selection or at the cursor
            richTextValue = (0, rich_text_1.insert)(richTextValue, linkText, start, end);
            end = start + linkText.length;
            // The link is inserted via registered format type to avoid breaking the content
            richTextValue = (0, rich_text_1.applyFormat)(richTextValue, {
                type: 'fincommerce-email-editor/link-shortcode',
                // @ts-expect-error attributes property is missing in build type for WPFormat type
                attributes: {
                    'data-link-href': tag,
                    contenteditable: 'false',
                    style: 'text-decoration: underline;',
                },
            }, start, end);
            updatedContent = (0, rich_text_1.toHTMLString)({ value: richTextValue });
        }
        else {
            let richTextValue = (0, rich_text_1.create)({ html: blockContent });
            richTextValue = (0, rich_text_1.insert)(richTextValue, (0, rich_text_1.create)({ html: `<!--${tag}-->&nbsp;` }), // Add a non-breaking space to avoid an issue when WP renderer removes blog containing only a comment
            start, end);
            updatedContent = (0, rich_text_1.toHTMLString)({ value: richTextValue });
        }
        updateBlockAttributes(selectedBlockId, {
            [blockContentKey]: updatedContent,
        });
    }, [
        blockContent,
        blockContentKey,
        contentRef,
        selectedBlockId,
        updateBlockAttributes,
    ]);
    const isEmailEditor = (0, use_is_email_editor_1.useIsEmailEditor)();
    if (!isEmailEditor) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(block_editor_1.BlockControls, { children: (0, jsx_runtime_1.jsxs)(components_1.ToolbarGroup, { children: [(0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: "shortcode", title: (0, i18n_1.__)('Personalization Tags', 'fincommerce'), onClick: () => {
                        setIsModalOpened(true);
                        (0, events_1.recordEvent)('block_controls_personalization_tags_button_clicked');
                    } }), (0, jsx_runtime_1.jsx)(personalization_tags_popover_1.PersonalizationTagsPopover, { contentRef: contentRef, onUpdate: (originalTag, updatedTag) => {
                        // When we update the tag, we need to add brackets to the tag, because the popover removes them
                        const updatedContent = blockContent.replace(`<!--[${originalTag}]-->`, `<!--[${updatedTag}]-->`);
                        updateBlockAttributes(selectedBlockId, {
                            [blockContentKey]: updatedContent,
                        });
                    } }), (0, jsx_runtime_1.jsx)(personalization_tags_link_popover_1.PersonalizationTagsLinkPopover, { contentRef: contentRef, onUpdate: (htmlElement, newTag, newText) => {
                        const oldTag = htmlElement
                            .getAttribute('data-link-href')
                            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(`<a([^>]*?)data-link-href="${oldTag}"([^>]*?)>${htmlElement.textContent}</a>`, 'gi');
                        // Replace the matched link with the new link
                        const updatedContent = blockContent.replace(regex, (_, beforeAttrs, afterAttrs) => {
                            // Construct the new <a> tag
                            return `<a${beforeAttrs}data-link-href="${newTag}"${afterAttrs}>${newText}</a>`;
                        });
                        updateBlockAttributes(selectedBlockId, {
                            content: updatedContent,
                        });
                    } }), (0, jsx_runtime_1.jsx)(personalization_tags_modal_1.PersonalizationTagsModal, { isOpened: isModalOpened, onInsert: (value, linkText) => {
                        handleInsert(value, linkText);
                        setIsModalOpened(false);
                    }, closeCallback: () => setIsModalOpened(false), canInsertLink: true, openedBy: "block-controls" })] }) }));
}
/**
 * Extend the rich text formats with a button for personalization tags.
 */
function extendRichTextFormats() {
    (0, rich_text_1.registerFormatType)('fincommerce-email-editor/shortcode', {
        name: 'fincommerce-email-editor/shortcode',
        title: (0, i18n_1.__)('Personalization Tags', 'fincommerce'),
        className: 'fincommerce-email-editor-personalization-tags',
        tagName: 'span',
        // @ts-expect-error attributes property is missing in build type for WPFormat type
        attributes: {},
        edit: PersonalizationTagsButton,
    });
    // Register format type for using personalization tags as link attributes
    (0, rich_text_1.registerFormatType)('fincommerce-email-editor/link-shortcode', {
        name: 'fincommerce-email-editor/link-shortcode',
        title: (0, i18n_1.__)('Personalization Tags Link', 'fincommerce'),
        className: 'fincommerce-email-editor-personalization-tags-link',
        tagName: 'a',
        // @ts-expect-error attributes property is missing in build type for WPFormat type
        attributes: {
            'data-link-href': 'data-link-href',
            contenteditable: 'contenteditable',
            style: 'style',
        },
        edit: null,
    });
}
const personalizationTagsLiveContentUpdate = (0, compose_1.createHigherOrderComponent)((BlockEdit) => (props) => {
    const { attributes, setAttributes, name } = props;
    const { content } = attributes;
    // Fetch the personalization tags list
    const list = (0, data_1.useSelect)((select) => select(store_1.storeName).getPersonalizationTagsList(), []);
    // Memoized function to replace content tags
    const updateContent = (0, element_1.useCallback)(() => {
        if (!content) {
            return '';
        }
        return (0, rich_text_utils_1.replacePersonalizationTagsWithHTMLComments)(content, list);
    }, [content, list]);
    // Handle content updates
    const handleSetAttributes = (0, element_1.useCallback)((newAttributes) => {
        if (newAttributes.content !== undefined) {
            const replacedContent = (0, rich_text_utils_1.replacePersonalizationTagsWithHTMLComments)(newAttributes.content, list);
            setAttributes({
                ...newAttributes,
                content: replacedContent,
            });
        }
        else {
            setAttributes(newAttributes);
        }
    }, [list, setAttributes]);
    // Only process supported blocks
    if (name === 'core/paragraph' ||
        name === 'core/heading' ||
        name === 'core/list-item') {
        return ((0, jsx_runtime_1.jsx)(BlockEdit, { ...props, attributes: {
                ...attributes,
                content: updateContent(),
            }, setAttributes: handleSetAttributes }));
    }
    // Return default for unsupported blocks
    return (0, jsx_runtime_1.jsx)(BlockEdit, { ...props });
}, 'personalizationTagsLiveContentUpdate');
/**
 * Replace written personalization tags with HTML comments in real-time.
 */
function activatePersonalizationTagsReplacing() {
    (0, hooks_1.addFilter)('editor.BlockEdit', 'fincommerce-email-editor/with-live-content-update', personalizationTagsLiveContentUpdate);
}
