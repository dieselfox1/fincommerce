"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAttributeModal = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const components_1 = require("@fincommerce/components");
const data_2 = require("@fincommerce/data");
const components_2 = require("@wordpress/components");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const attribute_table_row_1 = require("./attribute-table-row");
const utils_1 = require("./utils");
/*
 * Sort criteria for the attributes.
 */
const attributeSortCriteria = { order_by: 'name' };
const NewAttributeModal = ({ title = (0, i18n_1.__)('Add attributes', 'fincommerce'), description = '', notice, attributeLabel = (0, i18n_1.__)('Attribute', 'fincommerce'), valueLabel = (0, i18n_1.__)('Values', 'fincommerce'), attributePlaceholder = (0, i18n_1.__)('Search or create attribute', 'fincommerce'), termPlaceholder = (0, i18n_1.__)('Search or create value', 'fincommerce'), removeLabel = (0, i18n_1.__)('Remove attribute', 'fincommerce'), addAnotherAccessibleLabel = (0, i18n_1.__)('Add another attribute', 'fincommerce'), addAnotherLabel = (0, i18n_1.__)('+ Add another', 'fincommerce'), cancelLabel = (0, i18n_1.__)('Cancel', 'fincommerce'), addAccessibleLabel = (0, i18n_1.__)('Add attributes', 'fincommerce'), addLabel = (0, i18n_1.__)('Add', 'fincommerce'), onCancel, onAdd, onAddAnother = () => { }, onRemoveItem = () => { }, selectedAttributeIds = [], createNewAttributesAsGlobal = false, disabledAttributeIds = [], disabledAttributeMessage = (0, i18n_1.__)('Already used in Attributes', 'fincommerce'), termsAutoSelection, defaultVisibility = false, defaultSearch, }) => {
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
            if ((0, utils_1.isAttributeFilledOut)(attr)) {
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
    (0, element_1.useEffect)(function focusFirstAttributeField() {
        const firstAttributeFieldLabel = document.querySelector('.fincommerce-new-attribute-modal__table-row .fincommerce-attribute-input-field label');
        const timeoutId = setTimeout(() => {
            firstAttributeFieldLabel?.focus();
        }, 100);
        return () => clearTimeout(timeoutId);
    }, []);
    const initialAttribute = {
        name: defaultSearch,
    };
    const { attributes, isLoadingAttributes } = (0, data_1.useSelect)(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (select) => {
        const { getProductAttributes: getAttributes, hasFinishedResolution: hasLoadedAttributes, } = select(data_2.EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME);
        return {
            isLoadingAttributes: !hasLoadedAttributes('getProductAttributes', [attributeSortCriteria]),
            attributes: getAttributes(attributeSortCriteria),
        };
    }, []);
    const { createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    const { createProductAttribute } = (0, data_1.useDispatch)(data_2.experimentalProductAttributesStore);
    return ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)(components_1.Form, { initialValues: {
                attributes: [defaultSearch ? initialAttribute : null],
            } }, ({ values, setValue, }) => {
            const isAddButtonDisabled = !values.attributes.every((attr) => (0, utils_1.isAttributeFilledOut)(attr));
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
                (0, tracks_1.recordEvent)('product_attribute_add_custom_attribute', {
                    source: constants_1.TRACKS_SOURCE,
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
                    let message = (0, i18n_1.__)('Failed to create new attribute.', 'fincommerce');
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
            return ((0, element_1.createElement)(components_2.Modal, { title: title, onRequestClose: (event) => {
                    if (!event?.isPropagationStopped()) {
                        onCancel();
                    }
                }, className: "fincommerce-new-attribute-modal", 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                size: "medium" },
                notice && ((0, element_1.createElement)(components_2.Notice, { isDismissible: false },
                    (0, element_1.createElement)("p", null, notice))),
                description && (0, element_1.createElement)("p", null, description),
                (0, element_1.createElement)("div", { className: "fincommerce-new-attribute-modal__body" },
                    (0, element_1.createElement)("table", { className: "fincommerce-new-attribute-modal__table" },
                        (0, element_1.createElement)("thead", null,
                            (0, element_1.createElement)("tr", { className: "fincommerce-new-attribute-modal__table-header" },
                                (0, element_1.createElement)("th", null, attributeLabel),
                                (0, element_1.createElement)("th", null, valueLabel))),
                        (0, element_1.createElement)("tbody", null, values.attributes.map((attribute, index) => ((0, element_1.createElement)(attribute_table_row_1.AttributeTableRow, { key: index, index: index, attribute: attribute, attributePlaceholder: attributePlaceholder, disabledAttributeMessage: disabledAttributeMessage, isLoadingAttributes: isLoadingAttributes, attributes: availableAttributes, onNewAttributeAdd: addNewAttribute, onAttributeSelect: selectAttribute, termPlaceholder: termPlaceholder, removeLabel: removeLabel, onTermsSelect: selectTerms, onRemove: (removedIndex) => onRemove(removedIndex, values, setValue), termsAutoSelection: termsAutoSelection })))))),
                (0, element_1.createElement)("div", null,
                    (0, element_1.createElement)(components_2.Button, { className: "fincommerce-new-attribute-modal__add-attribute", variant: "tertiary", label: addAnotherAccessibleLabel, onClick: () => {
                            addAnother(values, setValue);
                        } }, addAnotherLabel)),
                (0, element_1.createElement)("div", { className: "fincommerce-new-attribute-modal__buttons" },
                    (0, element_1.createElement)(components_2.Button, { isSecondary: true, label: cancelLabel, onClick: () => onCancel() }, cancelLabel),
                    (0, element_1.createElement)(components_2.Tooltip, { text: isAddButtonDisabled
                            ? (0, i18n_1.__)('Add at least one attribute and one value. Press Enter to select.', 'fincommerce')
                            : '' },
                        (0, element_1.createElement)("div", null,
                            (0, element_1.createElement)(components_2.Button, { variant: "primary", label: addAccessibleLabel, showTooltip: true, disabled: isAddButtonDisabled, onClick: () => onAddingAttributes(values) }, addLabel))))));
        }),
        (0, element_1.createElement)(components_1.__experimentalSelectControlMenuSlot, null)));
};
exports.NewAttributeModal = NewAttributeModal;
