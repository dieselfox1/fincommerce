"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeControl = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const components_2 = require("@fincommerce/components");
const settings_1 = require("@fincommerce/settings");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const edit_attribute_modal_1 = require("./edit-attribute-modal");
const utils_1 = require("./utils");
const attribute_list_item_1 = require("../attribute-list-item");
const new_attribute_modal_1 = require("./new-attribute-modal");
const remove_confirmation_modal_1 = require("../remove-confirmation-modal");
const constants_1 = require("../../constants");
const empty_state_1 = require("../empty-state");
const block_slot_fill_1 = require("../block-slot-fill");
const utils_2 = require("../../utils");
const AttributeControl = ({ value, onAdd = () => { }, onAddAnother = () => { }, onRemoveItem = () => { }, onChange, onEdit = () => { }, onNewModalCancel = () => { }, onNewModalClose = () => { }, onNewModalOpen = () => { }, onEditModalCancel = () => { }, onEditModalClose = () => { }, onEditModalOpen = () => { }, onRemove = () => { }, onRemoveCancel = () => { }, onNoticeDismiss = () => { }, renderCustomEmptyState, uiStrings, createNewAttributesAsGlobal = false, useRemoveConfirmationModal = false, disabledAttributeIds = [], termsAutoSelection, defaultVisibility = false, }) => {
    uiStrings = {
        newAttributeListItemLabel: (0, i18n_1.__)('Add new', 'fincommerce'),
        globalAttributeHelperMessage: (0, i18n_1.__)(`You can change the attribute's name in <link>Attributes</link>.`, 'fincommerce'),
        attributeRemoveConfirmationMessage: (0, i18n_1.__)('Remove this attribute?', 'fincommerce'),
        ...uiStrings,
    };
    const [isNewModalVisible, setIsNewModalVisible] = (0, element_1.useState)(false);
    const [defaultAttributeSearch, setDefaultAttributeSearch] = (0, element_1.useState)();
    const [removingAttribute, setRemovingAttribute] = (0, element_1.useState)();
    const [currentAttributeId, setCurrentAttributeId] = (0, element_1.useState)(null);
    const handleChange = (newAttributes) => {
        onChange(newAttributes.map((attr) => {
            return {
                ...attr,
                options: attr.terms
                    ? attr.terms.map((term) => term.name)
                    : attr.options,
                terms: undefined,
                visible: attr.visible || false,
            };
        }));
    };
    const handleRemove = (attribute) => {
        handleChange(value.filter((attr) => (0, utils_1.getAttributeId)(attr) !== (0, utils_1.getAttributeId)(attribute)));
        onRemove(attribute);
        setRemovingAttribute(null);
    };
    const showRemoveConfirmation = (attribute) => {
        if (useRemoveConfirmationModal) {
            setRemovingAttribute(attribute);
            return;
        }
        // eslint-disable-next-line no-alert
        if (window.confirm(uiStrings?.attributeRemoveConfirmationMessage)) {
            handleRemove(attribute);
            return;
        }
        onRemoveCancel(attribute);
    };
    const openNewModal = () => {
        setIsNewModalVisible(true);
        onNewModalOpen();
    };
    const closeNewModal = () => {
        setIsNewModalVisible(false);
        setDefaultAttributeSearch(undefined);
        onNewModalClose();
    };
    const openEditModal = (attribute) => {
        (0, tracks_1.recordEvent)('product_options_edit', {
            source: constants_1.TRACKS_SOURCE,
            attribute: attribute.name,
        });
        setCurrentAttributeId((0, utils_1.getAttributeId)(attribute));
        onEditModalOpen(attribute);
    };
    const closeEditModal = (attribute) => {
        setCurrentAttributeId(null);
        onEditModalClose(attribute);
    };
    const handleAdd = (newAttributes) => {
        const addedAttributesOnly = newAttributes.filter((newAttr) => !value.some((current) => (0, utils_1.getAttributeId)(newAttr) === (0, utils_1.getAttributeId)(current)));
        handleChange([...value, ...addedAttributesOnly]);
        onAdd(newAttributes);
        closeNewModal();
    };
    const handleEdit = (updatedAttribute) => {
        (0, tracks_1.recordEvent)('product_options_update', {
            source: constants_1.TRACKS_SOURCE,
            attribute: updatedAttribute.name,
            values: updatedAttribute.terms?.map((term) => term.name),
            default: updatedAttribute.isDefault,
            visible: updatedAttribute.visible,
            filter: true, // default true until attribute filter gets implemented
        });
        const updatedAttributes = value.map((attr) => {
            if ((0, utils_1.getAttributeId)(attr) === (0, utils_1.getAttributeId)(updatedAttribute)) {
                return updatedAttribute;
            }
            return attr;
        });
        onEdit(updatedAttribute);
        handleChange(updatedAttributes);
        closeEditModal(updatedAttribute);
    };
    const sortedAttributes = value.sort((a, b) => a.position - b.position);
    const attributeKeyValues = value.reduce((keyValue, attribute) => {
        keyValue[(0, utils_1.getAttributeKey)(attribute)] = attribute;
        return keyValue;
    }, {});
    const currentAttribute = value.find((attr) => (0, utils_1.getAttributeId)(attr) === currentAttributeId);
    function renderEmptyState() {
        if (value.length)
            return null;
        if (renderCustomEmptyState) {
            return renderCustomEmptyState({
                addAttribute(search) {
                    setDefaultAttributeSearch(search);
                    openNewModal();
                },
            });
        }
        return ((0, element_1.createElement)(empty_state_1.EmptyState, { names: (0, utils_2.getEmptyStateSequentialNames)((0, i18n_1.__)('Attribute', 'fincommerce'), 3) }));
    }
    function renderSectionActions() {
        if (renderCustomEmptyState && value.length === 0)
            return null;
        return ((0, element_1.createElement)(block_slot_fill_1.SectionActions, null, uiStrings?.newAttributeListItemLabel && ((0, element_1.createElement)(components_1.Button, { variant: "secondary", className: "fincommerce-add-attribute-list-item__add-button", onClick: openNewModal }, uiStrings.newAttributeListItemLabel))));
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-attribute-field" },
        renderSectionActions(),
        uiStrings.notice && ((0, element_1.createElement)(components_1.Notice, { isDismissible: true, status: "warning", className: "fincommerce-attribute-field__notice", onRemove: onNoticeDismiss },
            (0, element_1.createElement)("p", null, uiStrings.notice))),
        Boolean(value.length) && ((0, element_1.createElement)(components_2.Sortable, { onOrderChange: (items) => {
                const itemPositions = items.reduce((positions, { props }, index) => {
                    positions[(0, utils_1.getAttributeKey)(props.attribute)] = index;
                    return positions;
                }, {});
                onChange((0, utils_1.reorderSortableProductAttributePositions)(itemPositions, attributeKeyValues));
            } }, sortedAttributes.map((attr) => ((0, element_1.createElement)(attribute_list_item_1.AttributeListItem, { attribute: attr, removeLabel: uiStrings?.attributeRemoveLabel, key: (0, utils_1.getAttributeId)(attr), onEditClick: () => openEditModal(attr), onRemoveClick: () => showRemoveConfirmation(attr) }))))),
        isNewModalVisible && ((0, element_1.createElement)(new_attribute_modal_1.NewAttributeModal, { title: uiStrings.newAttributeModalTitle, description: uiStrings.newAttributeModalDescription, onCancel: () => {
                closeNewModal();
                onNewModalCancel();
            }, onAdd: handleAdd, onAddAnother: onAddAnother, onRemoveItem: onRemoveItem, selectedAttributeIds: value.map((attr) => attr.id), createNewAttributesAsGlobal: createNewAttributesAsGlobal, disabledAttributeIds: disabledAttributeIds, disabledAttributeMessage: uiStrings.disabledAttributeMessage, termsAutoSelection: termsAutoSelection, defaultVisibility: defaultVisibility, defaultSearch: defaultAttributeSearch })),
        (0, element_1.createElement)(components_2.__experimentalSelectControlMenuSlot, null),
        currentAttribute && ((0, element_1.createElement)(edit_attribute_modal_1.EditAttributeModal, { title: (0, i18n_1.sprintf)(
            /* translators: %s is the attribute name */
            (0, i18n_1.__)('Edit %s', 'fincommerce'), currentAttribute.name), customAttributeHelperMessage: uiStrings.customAttributeHelperMessage, globalAttributeHelperMessage: uiStrings.globalAttributeHelperMessage
                ? (0, element_1.createInterpolateElement)(uiStrings.globalAttributeHelperMessage, {
                    link: ((0, element_1.createElement)(components_2.Link, { href: (0, settings_1.getAdminLink)('edit.php?post_type=product&page=product_attributes'), target: "_blank", type: "wp-admin" },
                        (0, element_1.createElement)(element_1.Fragment, null))),
                })
                : undefined, onCancel: () => {
                closeEditModal(currentAttribute);
                onEditModalCancel(currentAttribute);
            }, onEdit: (updatedAttribute) => {
                handleEdit(updatedAttribute);
            }, attribute: currentAttribute, attributes: value })),
        removingAttribute && ((0, element_1.createElement)(remove_confirmation_modal_1.RemoveConfirmationModal, { title: (0, i18n_1.sprintf)(
            /* translators: %s is the attribute name that is being removed */
            (0, i18n_1.__)('Delete %(attributeName)s', 'fincommerce'), { attributeName: removingAttribute.name }), description: (0, element_1.createElement)("p", null, uiStrings.attributeRemoveConfirmationModalMessage), onRemove: () => handleRemove(removingAttribute), onCancel: () => {
                onRemoveCancel(removingAttribute);
                setRemovingAttribute(null);
            } })),
        renderEmptyState()));
};
exports.AttributeControl = AttributeControl;
