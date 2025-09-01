/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createElement, Fragment, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { Form, __experimentalSelectControlMenuSlot as SelectControlMenuSlot, } from '@fincommerce/components';
import { EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME, experimentalProductAttributesStore, } from '@fincommerce/data';
import { Button, Modal, Notice, Tooltip } from '@wordpress/components';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
import { AttributeTableRow } from './attribute-table-row';
import { isAttributeFilledOut } from './utils';
/*
 * Sort criteria for the attributes.
 */
const attributeSortCriteria = { order_by: 'name' };
export const NewAttributeModal = ({ title = __('Add attributes', 'fincommerce'), description = '', notice, attributeLabel = __('Attribute', 'fincommerce'), valueLabel = __('Values', 'fincommerce'), attributePlaceholder = __('Search or create attribute', 'fincommerce'), termPlaceholder = __('Search or create value', 'fincommerce'), removeLabel = __('Remove attribute', 'fincommerce'), addAnotherAccessibleLabel = __('Add another attribute', 'fincommerce'), addAnotherLabel = __('+ Add another', 'fincommerce'), cancelLabel = __('Cancel', 'fincommerce'), addAccessibleLabel = __('Add attributes', 'fincommerce'), addLabel = __('Add', 'fincommerce'), onCancel, onAdd, onAddAnother = () => { }, onRemoveItem = () => { }, selectedAttributeIds = [], createNewAttributesAsGlobal = false, disabledAttributeIds = [], disabledAttributeMessage = __('Already used in Attributes', 'fincommerce'), termsAutoSelection, defaultVisibility = false, defaultSearch, }) => {
    const scrollAttributeIntoView = (index) => {
        setTimeout(() => {
            const attributeRow = document.querySelector(`.fincommerce-new-attribute-modal__table-row-${index}`);
            attributeRow?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };
    const addAnother = (values, setValue) => {
        setValue('attributes', [...values.attributes, null]);
        scrollAttributeIntoView(values.attributes.length);
        onAddAnother();
    };
    const isGlobalAttribute = (attribute) => {
        return attribute.id !== 0;
    };
    const mapTermsToOptions = (terms) => {
        if (!terms) {
            return [];
        }
        return terms.map((term) => term.name);
    };
    const getOptions = (attribute) => {
        return isGlobalAttribute(attribute)
            ? mapTermsToOptions(attribute.terms)
            : attribute.options;
    };
    const getVisibleOrTrue = (attribute) => attribute.visible !== undefined ? attribute.visible : defaultVisibility;
    const onAddingAttributes = (values) => {
        const newAttributesToAdd = [];
        values.attributes.forEach((attr) => {
            if (isAttributeFilledOut(attr)) {
                newAttributesToAdd.push({
                    ...attr,
                    visible: getVisibleOrTrue(attr),
                    options: getOptions(attr),
                });
            }
        });
        onAdd(newAttributesToAdd);
    };
    const onRemove = (index, values, setValue) => {
        onRemoveItem();
        if (values.attributes.length > 1) {
            setValue('attributes', values.attributes.filter((val, i) => i !== index));
        }
        else {
            setValue(`attributes[${index}]`, null);
        }
    };
    useEffect(function focusFirstAttributeField() {
        const firstAttributeFieldLabel = document.querySelector('.fincommerce-new-attribute-modal__table-row .fincommerce-attribute-input-field label');
        const timeoutId = setTimeout(() => {
            firstAttributeFieldLabel?.focus();
        }, 100);
        return () => clearTimeout(timeoutId);
    }, []);
    const initialAttribute = {
        name: defaultSearch,
    };
    const { attributes, isLoadingAttributes } = useSelect(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (select) => {
        const { getProductAttributes: getAttributes, hasFinishedResolution: hasLoadedAttributes, } = select(EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME);
        return {
            isLoadingAttributes: !hasLoadedAttributes('getProductAttributes', [attributeSortCriteria]),
            attributes: getAttributes(attributeSortCriteria),
        };
    }, []);
    const { createErrorNotice } = useDispatch('core/notices');
    const { createProductAttribute } = useDispatch(experimentalProductAttributesStore);
    return (createElement(Fragment, null,
        createElement(Form, { initialValues: {
                attributes: [defaultSearch ? initialAttribute : null],
            } }, ({ values, setValue, }) => {
            const isAddButtonDisabled = !values.attributes.every((attr) => isAttributeFilledOut(attr));
            /**
             * Select the attribute in the form field.
             * If the attribute does not exist, create it.
             * ToDo: Improve Id. Adding a attribute with id -99
             * does not seem a good idea.
             *
             * @param {AttributesComboboxControlItem} nextAttribute - The attribute to select.
             * @param { number }                      index         - The index of the attribute in the form field.
             * @return { void }
             */
            function selectAttribute(nextAttribute, index) {
                recordEvent('product_attribute_add_custom_attribute', {
                    source: TRACKS_SOURCE,
                });
                return setValue(`attributes[${index}]`, nextAttribute);
            }
            /**
             * Create a new attribute and fill the form field with it.
             * If the attribute is not global, create it locally.
             *
             * @param {string} newAttributeName - The name of the new attribute.
             * @param {number} index            - The index of the attribute in the form field.
             * @return {void}
             */
            function addNewAttribute(newAttributeName, index) {
                if (!createNewAttributesAsGlobal) {
                    return setValue(`attributes[${index}]`, {
                        id: 0,
                        name: newAttributeName,
                        slug: newAttributeName,
                    });
                }
                createProductAttribute({
                    name: newAttributeName,
                    generate_slug: true,
                }, {
                    optimisticQueryUpdate: attributeSortCriteria,
                })
                    .then((newAttribute) => {
                    setValue(`attributes[${index}]`, newAttribute);
                })
                    .catch((error) => {
                    let message = __('Failed to create new attribute.', 'fincommerce');
                    if (error.code ===
                        'fincommerce_rest_cannot_create') {
                        message = error.message;
                    }
                    createErrorNotice(message, {
                        explicitDismiss: true,
                    });
                });
            }
            /**
             * Set the attribute terms in the form field.
             *
             * @param {ProductAttributeTerm[] | string[]} terms     - The terms to set.
             * @param {number}                            index     - The index of the attribute in the form field.
             * @param {EnhancedProductAttribute}          attribute - The attribute to set the terms.
             */
            function selectTerms(terms, index, attribute) {
                const attributeTermPropName = attribute && isGlobalAttribute(attribute)
                    ? 'terms'
                    : 'options';
                const fieldName = `attributes[${index}].${attributeTermPropName}`;
                setValue(fieldName, terms);
            }
            /*
             * Get the attribute ids that are already selected
             * by other form fields.
             */
            const attributeBelongTo = values.attributes
                .map((attr) => (attr ? attr.id : null))
                .filter((id) => typeof id === 'number');
            /*
             * Compute the available attributes to show in the attribute input field,
             * filtering out the ignored attributes,
             * marking the disabled ones,
             * and setting the `takenBy` property.
             */
            const availableAttributes = attributes
                ?.filter((attribute) => !selectedAttributeIds.includes(attribute.id))
                ?.map((attribute) => ({
                ...attribute,
                isDisabled: disabledAttributeIds.includes(attribute.id),
                takenBy: attributeBelongTo.indexOf(attribute.id),
            }));
            return (createElement(Modal, { title: title, onRequestClose: (event) => {
                    if (!event?.isPropagationStopped()) {
                        onCancel();
                    }
                }, className: "fincommerce-new-attribute-modal", 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                size: "medium" },
                notice && (createElement(Notice, { isDismissible: false },
                    createElement("p", null, notice))),
                description && createElement("p", null, description),
                createElement("div", { className: "fincommerce-new-attribute-modal__body" },
                    createElement("table", { className: "fincommerce-new-attribute-modal__table" },
                        createElement("thead", null,
                            createElement("tr", { className: "fincommerce-new-attribute-modal__table-header" },
                                createElement("th", null, attributeLabel),
                                createElement("th", null, valueLabel))),
                        createElement("tbody", null, values.attributes.map((attribute, index) => (createElement(AttributeTableRow, { key: index, index: index, attribute: attribute, attributePlaceholder: attributePlaceholder, disabledAttributeMessage: disabledAttributeMessage, isLoadingAttributes: isLoadingAttributes, attributes: availableAttributes, onNewAttributeAdd: addNewAttribute, onAttributeSelect: selectAttribute, termPlaceholder: termPlaceholder, removeLabel: removeLabel, onTermsSelect: selectTerms, onRemove: (removedIndex) => onRemove(removedIndex, values, setValue), termsAutoSelection: termsAutoSelection })))))),
                createElement("div", null,
                    createElement(Button, { className: "fincommerce-new-attribute-modal__add-attribute", variant: "tertiary", label: addAnotherAccessibleLabel, onClick: () => {
                            addAnother(values, setValue);
                        } }, addAnotherLabel)),
                createElement("div", { className: "fincommerce-new-attribute-modal__buttons" },
                    createElement(Button, { isSecondary: true, label: cancelLabel, onClick: () => onCancel() }, cancelLabel),
                    createElement(Tooltip, { text: isAddButtonDisabled
                            ? __('Add at least one attribute and one value. Press Enter to select.', 'fincommerce')
                            : '' },
                        createElement("div", null,
                            createElement(Button, { variant: "primary", label: addAccessibleLabel, showTooltip: true, disabled: isAddButtonDisabled, onClick: () => onAddingAttributes(values) }, addLabel))))));
        }),
        createElement(SelectControlMenuSlot, null)));
};
