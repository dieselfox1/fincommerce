/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, createElement, Fragment, createInterpolateElement, } from '@wordpress/element';
import { Button, Notice } from '@wordpress/components';
import { Sortable, __experimentalSelectControlMenuSlot as SelectControlMenuSlot, Link, } from '@fincommerce/components';
import { getAdminLink } from '@fincommerce/settings';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { EditAttributeModal } from './edit-attribute-modal';
import { getAttributeId, getAttributeKey, reorderSortableProductAttributePositions, } from './utils';
import { AttributeListItem } from '../attribute-list-item';
import { NewAttributeModal } from './new-attribute-modal';
import { RemoveConfirmationModal } from '../remove-confirmation-modal';
import { TRACKS_SOURCE } from '../../constants';
import { EmptyState } from '../empty-state';
import { SectionActions } from '../block-slot-fill';
import { getEmptyStateSequentialNames } from '../../utils';
export const AttributeControl = ({ value, onAdd = () => { }, onAddAnother = () => { }, onRemoveItem = () => { }, onChange, onEdit = () => { }, onNewModalCancel = () => { }, onNewModalClose = () => { }, onNewModalOpen = () => { }, onEditModalCancel = () => { }, onEditModalClose = () => { }, onEditModalOpen = () => { }, onRemove = () => { }, onRemoveCancel = () => { }, onNoticeDismiss = () => { }, renderCustomEmptyState, uiStrings, createNewAttributesAsGlobal = false, useRemoveConfirmationModal = false, disabledAttributeIds = [], termsAutoSelection, defaultVisibility = false, }) => {
    uiStrings = {
        newAttributeListItemLabel: __('Add new', 'fincommerce'),
        globalAttributeHelperMessage: __(`You can change the attribute's name in <link>Attributes</link>.`, 'fincommerce'),
        attributeRemoveConfirmationMessage: __('Remove this attribute?', 'fincommerce'),
        ...uiStrings,
    };
    const [isNewModalVisible, setIsNewModalVisible] = useState(false);
    const [defaultAttributeSearch, setDefaultAttributeSearch] = useState();
    const [removingAttribute, setRemovingAttribute] = useState();
    const [currentAttributeId, setCurrentAttributeId] = useState(null);
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
        handleChange(value.filter((attr) => getAttributeId(attr) !== getAttributeId(attribute)));
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
        recordEvent('product_options_edit', {
            source: TRACKS_SOURCE,
            attribute: attribute.name,
        });
        setCurrentAttributeId(getAttributeId(attribute));
        onEditModalOpen(attribute);
    };
    const closeEditModal = (attribute) => {
        setCurrentAttributeId(null);
        onEditModalClose(attribute);
    };
    const handleAdd = (newAttributes) => {
        const addedAttributesOnly = newAttributes.filter((newAttr) => !value.some((current) => getAttributeId(newAttr) === getAttributeId(current)));
        handleChange([...value, ...addedAttributesOnly]);
        onAdd(newAttributes);
        closeNewModal();
    };
    const handleEdit = (updatedAttribute) => {
        recordEvent('product_options_update', {
            source: TRACKS_SOURCE,
            attribute: updatedAttribute.name,
            values: updatedAttribute.terms?.map((term) => term.name),
            default: updatedAttribute.isDefault,
            visible: updatedAttribute.visible,
            filter: true, // default true until attribute filter gets implemented
        });
        const updatedAttributes = value.map((attr) => {
            if (getAttributeId(attr) === getAttributeId(updatedAttribute)) {
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
        keyValue[getAttributeKey(attribute)] = attribute;
        return keyValue;
    }, {});
    const currentAttribute = value.find((attr) => getAttributeId(attr) === currentAttributeId);
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
        return (createElement(EmptyState, { names: getEmptyStateSequentialNames(__('Attribute', 'fincommerce'), 3) }));
    }
    function renderSectionActions() {
        if (renderCustomEmptyState && value.length === 0)
            return null;
        return (createElement(SectionActions, null, uiStrings?.newAttributeListItemLabel && (createElement(Button, { variant: "secondary", className: "fincommerce-add-attribute-list-item__add-button", onClick: openNewModal }, uiStrings.newAttributeListItemLabel))));
    }
    return (createElement("div", { className: "fincommerce-attribute-field" },
        renderSectionActions(),
        uiStrings.notice && (createElement(Notice, { isDismissible: true, status: "warning", className: "fincommerce-attribute-field__notice", onRemove: onNoticeDismiss },
            createElement("p", null, uiStrings.notice))),
        Boolean(value.length) && (createElement(Sortable, { onOrderChange: (items) => {
                const itemPositions = items.reduce((positions, { props }, index) => {
                    positions[getAttributeKey(props.attribute)] = index;
                    return positions;
                }, {});
                onChange(reorderSortableProductAttributePositions(itemPositions, attributeKeyValues));
            } }, sortedAttributes.map((attr) => (createElement(AttributeListItem, { attribute: attr, removeLabel: uiStrings?.attributeRemoveLabel, key: getAttributeId(attr), onEditClick: () => openEditModal(attr), onRemoveClick: () => showRemoveConfirmation(attr) }))))),
        isNewModalVisible && (createElement(NewAttributeModal, { title: uiStrings.newAttributeModalTitle, description: uiStrings.newAttributeModalDescription, onCancel: () => {
                closeNewModal();
                onNewModalCancel();
            }, onAdd: handleAdd, onAddAnother: onAddAnother, onRemoveItem: onRemoveItem, selectedAttributeIds: value.map((attr) => attr.id), createNewAttributesAsGlobal: createNewAttributesAsGlobal, disabledAttributeIds: disabledAttributeIds, disabledAttributeMessage: uiStrings.disabledAttributeMessage, termsAutoSelection: termsAutoSelection, defaultVisibility: defaultVisibility, defaultSearch: defaultAttributeSearch })),
        createElement(SelectControlMenuSlot, null),
        currentAttribute && (createElement(EditAttributeModal, { title: sprintf(
            /* translators: %s is the attribute name */
            __('Edit %s', 'fincommerce'), currentAttribute.name), customAttributeHelperMessage: uiStrings.customAttributeHelperMessage, globalAttributeHelperMessage: uiStrings.globalAttributeHelperMessage
                ? createInterpolateElement(uiStrings.globalAttributeHelperMessage, {
                    link: (createElement(Link, { href: getAdminLink('edit.php?post_type=product&page=product_attributes'), target: "_blank", type: "wp-admin" },
                        createElement(Fragment, null))),
                })
                : undefined, onCancel: () => {
                closeEditModal(currentAttribute);
                onEditModalCancel(currentAttribute);
            }, onEdit: (updatedAttribute) => {
                handleEdit(updatedAttribute);
            }, attribute: currentAttribute, attributes: value })),
        removingAttribute && (createElement(RemoveConfirmationModal, { title: sprintf(
            /* translators: %s is the attribute name that is being removed */
            __('Delete %(attributeName)s', 'fincommerce'), { attributeName: removingAttribute.name }), description: createElement("p", null, uiStrings.attributeRemoveConfirmationModalMessage), onRemove: () => handleRemove(removingAttribute), onCancel: () => {
                onRemoveCancel(removingAttribute);
                setRemovingAttribute(null);
            } })),
        renderEmptyState()));
};
