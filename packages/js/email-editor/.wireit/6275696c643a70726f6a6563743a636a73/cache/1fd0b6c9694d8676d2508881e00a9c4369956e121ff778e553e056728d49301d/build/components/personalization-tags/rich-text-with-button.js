"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextWithButton = RichTextWithButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const rich_text_1 = require("@wordpress/rich-text");
const block_editor_1 = require("@wordpress/block-editor");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const personalization_tags_modal_1 = require("./personalization-tags-modal");
const rich_text_utils_1 = require("./rich-text-utils");
const store_1 = require("../../store");
const personalization_tags_popover_1 = require("./personalization-tags-popover");
const events_1 = require("../../events");
function RichTextWithButton({ label, labelSuffix, help, placeholder, attributeName, attributeValue, updateProperty = () => { }, }) {
    const [selectionRange, setSelectionRange] = (0, element_1.useState)(null);
    const [isModalOpened, setIsModalOpened] = (0, element_1.useState)(false);
    const list = (0, data_1.useSelect)((select) => select(store_1.storeName).getPersonalizationTagsList(), []);
    const richTextRef = (0, element_1.useRef)(null);
    const handleInsertPersonalizationTag = (0, element_1.useCallback)((tagName, currentValue, currentSelectionRange) => {
        // Ensure selection range is within bounds
        const start = currentSelectionRange?.start ?? currentValue.length;
        const end = currentSelectionRange?.end ?? currentValue.length;
        let richTextValue = (0, rich_text_1.create)({ html: currentValue });
        richTextValue = (0, rich_text_1.insert)(richTextValue, (0, rich_text_1.create)({ html: `<!--${tagName}-->` }), start, end);
        const updatedValue = (0, rich_text_1.toHTMLString)({ value: richTextValue });
        // Update the corresponding property
        updateProperty(attributeName, updatedValue);
        setSelectionRange(null);
    }, [attributeName, updateProperty]);
    const finalLabel = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { children: label }), (0, jsx_runtime_1.jsx)(components_1.Button, { className: "fincommerce-settings-panel-personalization-tags-button", icon: "shortcode", title: (0, i18n_1.__)('Personalization Tags', 'fincommerce'), onClick: () => {
                    setIsModalOpened(true);
                    (0, events_1.recordEvent)('rich_text_with_button_personalization_tags_shortcode_icon_clicked', {
                        attributeName,
                        label,
                    });
                } }), labelSuffix] }));
    if (!attributeName) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(components_1.BaseControl, { id: "" // See https://github.com/mailpoet/mailpoet/pull/6089#discussion_r1952126850 to understand why the ID is empty
        , label: finalLabel, className: `fincommerce-settings-panel-${attributeName}-text`, help: help, __nextHasNoMarginBottom // To avoid warning about deprecation in console
        : true, children: [(0, jsx_runtime_1.jsx)(personalization_tags_modal_1.PersonalizationTagsModal, { isOpened: isModalOpened, onInsert: (value) => {
                    handleInsertPersonalizationTag(value, attributeValue ?? '', selectionRange);
                    setIsModalOpened(false);
                    (0, events_1.recordEvent)('rich_text_with_button_personalization_tags_inserted', {
                        attributeName,
                        value,
                    });
                }, closeCallback: () => setIsModalOpened(false), openedBy: "RichTextWithButton-BaseControl" }), (0, jsx_runtime_1.jsx)(personalization_tags_popover_1.PersonalizationTagsPopover, { contentRef: richTextRef, onUpdate: (originalTag, updatedTag) => {
                    const currentValue = attributeValue ?? '';
                    // When we update the tag, we need to add brackets to the tag, because the popover removes them
                    const updatedContent = currentValue.replace(`<!--[${originalTag}]-->`, `<!--[${updatedTag}]-->`);
                    updateProperty(attributeName, updatedContent);
                } }), (0, jsx_runtime_1.jsx)(block_editor_1.RichText, { ref: richTextRef, className: "fincommerce-settings-panel-richtext", placeholder: placeholder, onFocus: () => {
                    setSelectionRange((0, rich_text_utils_1.getCursorPosition)(richTextRef, attributeValue ?? ''));
                }, onKeyUp: () => {
                    setSelectionRange((0, rich_text_utils_1.getCursorPosition)(richTextRef, attributeValue ?? ''));
                }, onClick: () => {
                    setSelectionRange((0, rich_text_utils_1.getCursorPosition)(richTextRef, attributeValue ?? ''));
                }, onChange: (value) => {
                    value = (0, rich_text_utils_1.replacePersonalizationTagsWithHTMLComments)(value ?? '', list);
                    updateProperty(attributeName, value);
                    (0, events_1.recordEventOnce)('rich_text_with_button_input_field_updated', {
                        attributeName,
                    });
                }, value: attributeValue ?? '', "data-automation-id": `email_${attributeName}` })] }));
}
