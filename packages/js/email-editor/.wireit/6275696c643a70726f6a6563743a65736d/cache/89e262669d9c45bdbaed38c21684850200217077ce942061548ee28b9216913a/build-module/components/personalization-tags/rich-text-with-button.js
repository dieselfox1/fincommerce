import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseControl, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useCallback, useRef, useState } from '@wordpress/element';
import { create, insert, toHTMLString } from '@wordpress/rich-text';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { PersonalizationTagsModal } from './personalization-tags-modal';
import { getCursorPosition, replacePersonalizationTagsWithHTMLComments, } from './rich-text-utils';
import { storeName } from '../../store';
import { PersonalizationTagsPopover } from './personalization-tags-popover';
import { recordEvent, recordEventOnce } from '../../events';
export function RichTextWithButton({ label, labelSuffix, help, placeholder, attributeName, attributeValue, updateProperty = () => { }, }) {
    const [selectionRange, setSelectionRange] = useState(null);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const list = useSelect((select) => select(storeName).getPersonalizationTagsList(), []);
    const richTextRef = useRef(null);
    const handleInsertPersonalizationTag = useCallback((tagName, currentValue, currentSelectionRange) => {
        // Ensure selection range is within bounds
        const start = currentSelectionRange?.start ?? currentValue.length;
        const end = currentSelectionRange?.end ?? currentValue.length;
        let richTextValue = create({ html: currentValue });
        richTextValue = insert(richTextValue, create({ html: `<!--${tagName}-->` }), start, end);
        const updatedValue = toHTMLString({ value: richTextValue });
        // Update the corresponding property
        updateProperty(attributeName, updatedValue);
        setSelectionRange(null);
    }, [attributeName, updateProperty]);
    const finalLabel = (_jsxs(_Fragment, { children: [_jsx("span", { children: label }), _jsx(Button, { className: "fincommerce-settings-panel-personalization-tags-button", icon: "shortcode", title: __('Personalization Tags', 'fincommerce'), onClick: () => {
                    setIsModalOpened(true);
                    recordEvent('rich_text_with_button_personalization_tags_shortcode_icon_clicked', {
                        attributeName,
                        label,
                    });
                } }), labelSuffix] }));
    if (!attributeName) {
        return null;
    }
    return (_jsxs(BaseControl, { id: "" // See https://github.com/mailpoet/mailpoet/pull/6089#discussion_r1952126850 to understand why the ID is empty
        , label: finalLabel, className: `fincommerce-settings-panel-${attributeName}-text`, help: help, __nextHasNoMarginBottom // To avoid warning about deprecation in console
        : true, children: [_jsx(PersonalizationTagsModal, { isOpened: isModalOpened, onInsert: (value) => {
                    handleInsertPersonalizationTag(value, attributeValue ?? '', selectionRange);
                    setIsModalOpened(false);
                    recordEvent('rich_text_with_button_personalization_tags_inserted', {
                        attributeName,
                        value,
                    });
                }, closeCallback: () => setIsModalOpened(false), openedBy: "RichTextWithButton-BaseControl" }), _jsx(PersonalizationTagsPopover, { contentRef: richTextRef, onUpdate: (originalTag, updatedTag) => {
                    const currentValue = attributeValue ?? '';
                    // When we update the tag, we need to add brackets to the tag, because the popover removes them
                    const updatedContent = currentValue.replace(`<!--[${originalTag}]-->`, `<!--[${updatedTag}]-->`);
                    updateProperty(attributeName, updatedContent);
                } }), _jsx(RichText, { ref: richTextRef, className: "fincommerce-settings-panel-richtext", placeholder: placeholder, onFocus: () => {
                    setSelectionRange(getCursorPosition(richTextRef, attributeValue ?? ''));
                }, onKeyUp: () => {
                    setSelectionRange(getCursorPosition(richTextRef, attributeValue ?? ''));
                }, onClick: () => {
                    setSelectionRange(getCursorPosition(richTextRef, attributeValue ?? ''));
                }, onChange: (value) => {
                    value = replacePersonalizationTagsWithHTMLComments(value ?? '', list);
                    updateProperty(attributeName, value);
                    recordEventOnce('rich_text_with_button_input_field_updated', {
                        attributeName,
                    });
                }, value: attributeValue ?? '', "data-automation-id": `email_${attributeName}` })] }));
}
