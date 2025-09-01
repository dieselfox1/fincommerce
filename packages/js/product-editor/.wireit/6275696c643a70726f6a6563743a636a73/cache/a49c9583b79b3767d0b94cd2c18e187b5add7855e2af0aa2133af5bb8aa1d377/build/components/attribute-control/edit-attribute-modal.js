"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAttributeModal = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const components_2 = require("@fincommerce/components");
/**
 * Internal dependencies
 */
const attribute_term_input_field_1 = require("../attribute-term-input-field");
const notice_1 = require("../notice");
const utils_1 = require("./utils");
const EditAttributeModal = ({ title = (0, i18n_1.__)('Edit attribute', 'fincommerce'), nameLabel = (0, i18n_1.__)('Name', 'fincommerce'), globalAttributeHelperMessage, customAttributeHelperMessage = (0, i18n_1.__)('Your customers will see this on the product page', 'fincommerce'), termsLabel = (0, i18n_1.__)('Values', 'fincommerce'), termsPlaceholder = (0, i18n_1.__)('Search or create value', 'fincommerce'), isDefaultLabel = (0, i18n_1.__)('Set default value', 'fincommerce'), isDefaultTooltip = (0, i18n_1.__)('Check to preselect the first choice when customers enter the product page.', 'fincommerce'), useAsFilterLabel = (0, i18n_1.__)('Use as filter', 'fincommerce'), useAsFilterTooltip = (0, i18n_1.__)('Check to allow customers to search and filter by this option in your store.', 'fincommerce'), visibleLabel = (0, i18n_1.__)('Show in product details', 'fincommerce'), visibleTooltip = (0, i18n_1.__)('Check to show this option and its values in the product details section on the product page.', 'fincommerce'), cancelAccessibleLabel = (0, i18n_1.__)('Cancel', 'fincommerce'), cancelLabel = (0, i18n_1.__)('Cancel', 'fincommerce'), updateAccessibleLabel = (0, i18n_1.__)('Edit attribute', 'fincommerce'), updateLabel = (0, i18n_1.__)('Update', 'fincommerce'), onCancel, onEdit, attribute, attributes, }) => {
    const [editableAttribute, setEditableAttribute] = (0, element_1.useState)({ ...attribute });
    const isCustomAttribute = editableAttribute?.id === 0;
    const { additions, deletions } = (0, element_1.useMemo)(() => {
        if (!attribute.variation) {
            return {};
        }
        const variationsSubTotal = attributes
            .filter((otherAttribute) => (0, utils_1.getAttributeId)(otherAttribute) !==
            (0, utils_1.getAttributeId)(attribute))
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
        const additionsMessage = (0, i18n_1.sprintf)(
        // translators: %d is the amount of variations to be added
        (0, i18n_1.__)('%d variations will be added', 'fincommerce'), additions);
        const deletionsMessage = (0, i18n_1.sprintf)(
        // translators: %d is the amount of variations to be removed
        (0, i18n_1.__)('%d variations will be removed', 'fincommerce'), deletions);
        if (additions && deletions) {
            return (0, i18n_1.sprintf)('%1$s, %2$s.', additionsMessage, deletionsMessage);
        }
        else if (additions) {
            return (0, i18n_1.sprintf)('%s.', additionsMessage);
        }
        return (0, i18n_1.sprintf)('%s.', deletionsMessage);
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.Modal, { title: title, onRequestClose: () => onCancel(), className: "fincommerce-edit-attribute-modal" },
            (0, element_1.createElement)("div", { className: "fincommerce-edit-attribute-modal__body" },
                (0, element_1.createElement)(components_1.TextControl, { label: nameLabel, disabled: !isCustomAttribute, value: editableAttribute?.name
                        ? editableAttribute?.name
                        : '', onChange: (val) => setEditableAttribute({
                        ...editableAttribute,
                        name: val,
                    }) }),
                (0, element_1.createElement)("p", { className: "fincommerce-edit-attribute-modal__helper-text" }, !isCustomAttribute
                    ? globalAttributeHelperMessage
                    : customAttributeHelperMessage),
                attribute.terms ? ((0, element_1.createElement)(attribute_term_input_field_1.AttributeTermInputField, { label: termsLabel, placeholder: editableAttribute?.terms &&
                        editableAttribute?.terms.length > 0
                        ? ''
                        : termsPlaceholder, value: editableAttribute?.terms, attributeId: editableAttribute?.id, onChange: (val) => {
                        setEditableAttribute({
                            ...editableAttribute,
                            terms: val,
                        });
                    } })) : ((0, element_1.createElement)(attribute_term_input_field_1.CustomAttributeTermInputField, { label: termsLabel, placeholder: editableAttribute?.options &&
                        editableAttribute?.options.length > 0
                        ? ''
                        : termsPlaceholder, disabled: !attribute?.name, value: editableAttribute?.options, onChange: (val) => {
                        setEditableAttribute({
                            ...editableAttribute,
                            options: val,
                        });
                    } })),
                (0, element_1.createElement)("div", { className: "fincommerce-edit-attribute-modal__options" },
                    attribute.variation && ((0, element_1.createElement)("div", { className: "fincommerce-edit-attribute-modal__option-container" },
                        (0, element_1.createElement)(components_1.CheckboxControl, { onChange: (checked) => setEditableAttribute({
                                ...editableAttribute,
                                isDefault: checked,
                            }), checked: editableAttribute?.isDefault, label: isDefaultLabel }),
                        (0, element_1.createElement)(components_2.__experimentalTooltip, { className: "fincommerce-edit-attribute-modal__tooltip-set-default-value", text: isDefaultTooltip }))),
                    (0, element_1.createElement)("div", { className: "fincommerce-edit-attribute-modal__option-container" },
                        (0, element_1.createElement)(components_1.CheckboxControl, { onChange: (val) => setEditableAttribute({
                                ...editableAttribute,
                                visible: val,
                            }), checked: editableAttribute?.visible, label: visibleLabel }),
                        (0, element_1.createElement)(components_2.__experimentalTooltip, { className: "fincommerce-edit-attribute-modal__tooltip-show-in-product-details", text: visibleTooltip })),
                    attribute.id !== 0 && (
                    /* Only supported for global attributes, and disabled for now as the 'Filter by Attributes' block does not support this yet. */
                    (0, element_1.createElement)("div", { className: "fincommerce-edit-attribute-modal__option-container" },
                        (0, element_1.createElement)(components_1.CheckboxControl, { disabled: true, onChange: () => {
                                // Disabled.
                            }, checked: true, label: useAsFilterLabel }),
                        (0, element_1.createElement)(components_2.__experimentalTooltip, { className: "fincommerce-edit-attribute-modal__tooltip-use-as-filter", text: useAsFilterTooltip })))),
                Boolean(additions || deletions) && ((0, element_1.createElement)(notice_1.Notice, null, getNoticeMessage()))),
            (0, element_1.createElement)("div", { className: "fincommerce-edit-attribute-modal__buttons" },
                (0, element_1.createElement)(components_1.Button, { isSecondary: true, label: cancelAccessibleLabel, onClick: () => onCancel() }, cancelLabel),
                (0, element_1.createElement)(components_1.Button, { isPrimary: true, label: updateAccessibleLabel, onClick: () => {
                        onEdit(editableAttribute);
                    } }, updateLabel))),
        (0, element_1.createElement)(components_2.__experimentalSelectControlMenuSlot, null)));
};
exports.EditAttributeModal = EditAttributeModal;
