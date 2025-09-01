/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { createElement, Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { recordEvent } from '@fincommerce/tracks';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
import { useCustomFields } from '../../hooks/use-custom-fields';
import { CreateModal } from './create-modal';
import { EditModal } from './edit-modal';
import { EmptyState } from '../empty-state';
import { getEmptyStateSequentialNames } from '../../utils';
export function CustomFields({ className, renderActionButtonsWrapper = (buttons) => buttons, ...props }) {
    const { customFields, addCustomFields, updateCustomField, removeCustomField, } = useCustomFields();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCustomFieldIndex, setSelectedCustomFieldIndex] = useState();
    function handleAddNewButtonClick() {
        setShowCreateModal(true);
        recordEvent('product_custom_fields_show_add_modal', {
            source: TRACKS_SOURCE,
        });
    }
    function customFieldEditButtonClickHandler(customFieldIndex) {
        return function handleCustomFieldEditButtonClick() {
            setSelectedCustomFieldIndex(customFieldIndex);
            const customField = customFields[customFieldIndex];
            recordEvent('product_custom_fields_show_edit_modal', {
                source: TRACKS_SOURCE,
                custom_field_id: customField.id,
                custom_field_name: customField.key,
            });
        };
    }
    function customFieldRemoveButtonClickHandler(customField) {
        return function handleCustomFieldRemoveButtonClick() {
            removeCustomField(customField);
            recordEvent('product_custom_fields_remove_button_click', {
                source: TRACKS_SOURCE,
                custom_field_id: customField.id,
                custom_field_name: customField.key,
            });
        };
    }
    function handleCreateModalCreate(value) {
        addCustomFields(value);
        setShowCreateModal(false);
    }
    function handleCreateModalCancel() {
        setShowCreateModal(false);
        recordEvent('product_custom_fields_cancel_add_modal', {
            source: TRACKS_SOURCE,
        });
    }
    function handleEditModalUpdate(customField) {
        updateCustomField(customField, selectedCustomFieldIndex);
        setSelectedCustomFieldIndex(undefined);
    }
    function handleEditModalCancel() {
        setSelectedCustomFieldIndex(undefined);
        recordEvent('product_custom_fields_cancel_edit_modal', {
            source: TRACKS_SOURCE,
        });
    }
    return (createElement(Fragment, null,
        renderActionButtonsWrapper(createElement(Button, { variant: "secondary", onClick: handleAddNewButtonClick }, __('Add new', 'fincommerce'))),
        customFields.length === 0 ? (createElement(EmptyState, { names: getEmptyStateSequentialNames(__('Custom field', 'fincommerce'), 3) })) : (createElement("table", { ...props, className: clsx('fincommerce-product-custom-fields__table', className) },
            createElement("thead", null,
                createElement("tr", { className: "fincommerce-product-custom-fields__table-row" },
                    createElement("th", null, __('Name', 'fincommerce')),
                    createElement("th", null, __('Value', 'fincommerce')),
                    createElement("th", null, __('Actions', 'fincommerce')))),
            createElement("tbody", null, customFields.map((customField, index) => (createElement("tr", { className: "fincommerce-product-custom-fields__table-row", key: customField.id ?? customField.key },
                createElement("td", { className: "fincommerce-product-custom-fields__table-datacell" }, customField.key),
                createElement("td", { className: "fincommerce-product-custom-fields__table-datacell" }, customField.value),
                createElement("td", { className: "fincommerce-product-custom-fields__table-datacell" },
                    createElement(Button, { variant: "tertiary", onClick: customFieldEditButtonClickHandler(index) }, __('Edit', 'fincommerce')),
                    createElement(Button, { icon: closeSmall, onClick: customFieldRemoveButtonClickHandler(customField), "aria-label": __('Remove custom field', 'fincommerce') })))))))),
        showCreateModal && (createElement(CreateModal, { values: customFields, onCreate: handleCreateModalCreate, onCancel: handleCreateModalCancel })),
        selectedCustomFieldIndex !== undefined && (createElement(EditModal, { initialValue: customFields[selectedCustomFieldIndex], values: customFields, onUpdate: handleEditModalUpdate, onCancel: handleEditModalCancel }))));
}
