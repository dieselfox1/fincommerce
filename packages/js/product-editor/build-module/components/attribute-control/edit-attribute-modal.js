/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, Modal, CheckboxControl, TextControl, } from '@wordpress/components';
import { useState, createElement, Fragment, useMemo } from '@wordpress/element';
import { __experimentalTooltip as Tooltip, __experimentalSelectControlMenuSlot as SelectControlMenuSlot, } from '@fincommerce/components';
/**
 * Internal dependencies
 */
import { AttributeTermInputField, CustomAttributeTermInputField, } from '../attribute-term-input-field';
import { Notice } from '../notice';
import { getAttributeId } from './utils';
export const EditAttributeModal = ({ title = __('Edit attribute', 'fincommerce'), nameLabel = __('Name', 'fincommerce'), globalAttributeHelperMessage, customAttributeHelperMessage = __('Your customers will see this on the product page', 'fincommerce'), termsLabel = __('Values', 'fincommerce'), termsPlaceholder = __('Search or create value', 'fincommerce'), isDefaultLabel = __('Set default value', 'fincommerce'), isDefaultTooltip = __('Check to preselect the first choice when customers enter the product page.', 'fincommerce'), useAsFilterLabel = __('Use as filter', 'fincommerce'), useAsFilterTooltip = __('Check to allow customers to search and filter by this option in your store.', 'fincommerce'), visibleLabel = __('Show in product details', 'fincommerce'), visibleTooltip = __('Check to show this option and its values in the product details section on the product page.', 'fincommerce'), cancelAccessibleLabel = __('Cancel', 'fincommerce'), cancelLabel = __('Cancel', 'fincommerce'), updateAccessibleLabel = __('Edit attribute', 'fincommerce'), updateLabel = __('Update', 'fincommerce'), onCancel, onEdit, attribute, attributes, }) => {
    const [editableAttribute, setEditableAttribute] = useState({ ...attribute });
    const isCustomAttribute = editableAttribute?.id === 0;
    const { additions, deletions } = useMemo(() => {
        if (!attribute.variation) {
            return {};
        }
        const variationsSubTotal = attributes
            .filter((otherAttribute) => getAttributeId(otherAttribute) !==
            getAttributeId(attribute))
            .reduce((subTotal, { terms }) => subTotal * (terms?.length ?? 1), 1);
        const currentAttributeTermsCount = attribute.terms?.length ?? 0;
        const variationsTotal = variationsSubTotal * currentAttributeTermsCount;
        const addedTermsCount = editableAttribute?.terms?.filter((editedTerm) => !attribute.terms?.some((currentTerm) => currentTerm.id === editedTerm.id))?.length ?? 0;
        const addedTermsTotal = currentAttributeTermsCount + addedTermsCount || 1;
        const remainedTermsCount = attribute.terms?.filter((currentTerm) => editableAttribute?.terms?.some((editedTerm) => currentTerm.id === editedTerm.id))?.length ?? 0;
        return {
            additions: Math.abs(variationsTotal - variationsSubTotal * addedTermsTotal),
            deletions: Math.abs(variationsTotal - variationsSubTotal * remainedTermsCount),
        };
    }, [attributes, attribute, editableAttribute]);
    function getNoticeMessage() {
        const additionsMessage = sprintf(
        // translators: %d is the amount of variations to be added
        __('%d variations will be added', 'fincommerce'), additions);
        const deletionsMessage = sprintf(
        // translators: %d is the amount of variations to be removed
        __('%d variations will be removed', 'fincommerce'), deletions);
        if (additions && deletions) {
            return sprintf('%1$s, %2$s.', additionsMessage, deletionsMessage);
        }
        else if (additions) {
            return sprintf('%s.', additionsMessage);
        }
        return sprintf('%s.', deletionsMessage);
    }
    return (createElement(Fragment, null,
        createElement(Modal, { title: title, onRequestClose: () => onCancel(), className: "fincommerce-edit-attribute-modal" },
            createElement("div", { className: "fincommerce-edit-attribute-modal__body" },
                createElement(TextControl, { label: nameLabel, disabled: !isCustomAttribute, value: editableAttribute?.name
                        ? editableAttribute?.name
                        : '', onChange: (val) => setEditableAttribute({
                        ...editableAttribute,
                        name: val,
                    }) }),
                createElement("p", { className: "fincommerce-edit-attribute-modal__helper-text" }, !isCustomAttribute
                    ? globalAttributeHelperMessage
                    : customAttributeHelperMessage),
                attribute.terms ? (createElement(AttributeTermInputField, { label: termsLabel, placeholder: editableAttribute?.terms &&
                        editableAttribute?.terms.length > 0
                        ? ''
                        : termsPlaceholder, value: editableAttribute?.terms, attributeId: editableAttribute?.id, onChange: (val) => {
                        setEditableAttribute({
                            ...editableAttribute,
                            terms: val,
                        });
                    } })) : (createElement(CustomAttributeTermInputField, { label: termsLabel, placeholder: editableAttribute?.options &&
                        editableAttribute?.options.length > 0
                        ? ''
                        : termsPlaceholder, disabled: !attribute?.name, value: editableAttribute?.options, onChange: (val) => {
                        setEditableAttribute({
                            ...editableAttribute,
                            options: val,
                        });
                    } })),
                createElement("div", { className: "fincommerce-edit-attribute-modal__options" },
                    attribute.variation && (createElement("div", { className: "fincommerce-edit-attribute-modal__option-container" },
                        createElement(CheckboxControl, { onChange: (checked) => setEditableAttribute({
                                ...editableAttribute,
                                isDefault: checked,
                            }), checked: editableAttribute?.isDefault, label: isDefaultLabel }),
                        createElement(Tooltip, { className: "fincommerce-edit-attribute-modal__tooltip-set-default-value", text: isDefaultTooltip }))),
                    createElement("div", { className: "fincommerce-edit-attribute-modal__option-container" },
                        createElement(CheckboxControl, { onChange: (val) => setEditableAttribute({
                                ...editableAttribute,
                                visible: val,
                            }), checked: editableAttribute?.visible, label: visibleLabel }),
                        createElement(Tooltip, { className: "fincommerce-edit-attribute-modal__tooltip-show-in-product-details", text: visibleTooltip })),
                    attribute.id !== 0 && (
                    /* Only supported for global attributes, and disabled for now as the 'Filter by Attributes' block does not support this yet. */
                    createElement("div", { className: "fincommerce-edit-attribute-modal__option-container" },
                        createElement(CheckboxControl, { disabled: true, onChange: () => {
                                // Disabled.
                            }, checked: true, label: useAsFilterLabel }),
                        createElement(Tooltip, { className: "fincommerce-edit-attribute-modal__tooltip-use-as-filter", text: useAsFilterTooltip })))),
                Boolean(additions || deletions) && (createElement(Notice, null, getNoticeMessage()))),
            createElement("div", { className: "fincommerce-edit-attribute-modal__buttons" },
                createElement(Button, { isSecondary: true, label: cancelAccessibleLabel, onClick: () => onCancel() }, cancelLabel),
                createElement(Button, { isPrimary: true, label: updateAccessibleLabel, onClick: () => {
                        onEdit(editableAttribute);
                    } }, updateLabel))),
        createElement(SelectControlMenuSlot, null)));
};
