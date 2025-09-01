"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFields = CustomFields;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const tracks_1 = require("@fincommerce/tracks");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const use_custom_fields_1 = require("../../hooks/use-custom-fields");
const create_modal_1 = require("./create-modal");
const edit_modal_1 = require("./edit-modal");
const empty_state_1 = require("../empty-state");
const utils_1 = require("../../utils");
function CustomFields({ className, renderActionButtonsWrapper = (buttons) => buttons, ...props }) {
    const { customFields, addCustomFields, updateCustomField, removeCustomField, } = (0, use_custom_fields_1.useCustomFields)();
    const [showCreateModal, setShowCreateModal] = (0, element_1.useState)(false);
    const [selectedCustomFieldIndex, setSelectedCustomFieldIndex] = (0, element_1.useState)();
    function handleAddNewButtonClick() {
        setShowCreateModal(true);
        (0, tracks_1.recordEvent)('product_custom_fields_show_add_modal', {
            source: constants_1.TRACKS_SOURCE,
        });
    }
    function customFieldEditButtonClickHandler(customFieldIndex) {
        return function handleCustomFieldEditButtonClick() {
            setSelectedCustomFieldIndex(customFieldIndex);
            const customField = customFields[customFieldIndex];
            (0, tracks_1.recordEvent)('product_custom_fields_show_edit_modal', {
                source: constants_1.TRACKS_SOURCE,
                custom_field_id: customField.id,
                custom_field_name: customField.key,
            });
        };
    }
    function customFieldRemoveButtonClickHandler(customField) {
        return function handleCustomFieldRemoveButtonClick() {
            removeCustomField(customField);
            (0, tracks_1.recordEvent)('product_custom_fields_remove_button_click', {
                source: constants_1.TRACKS_SOURCE,
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
        (0, tracks_1.recordEvent)('product_custom_fields_cancel_add_modal', {
            source: constants_1.TRACKS_SOURCE,
        });
    }
    function handleEditModalUpdate(customField) {
        updateCustomField(customField, selectedCustomFieldIndex);
        setSelectedCustomFieldIndex(undefined);
    }
    function handleEditModalCancel() {
        setSelectedCustomFieldIndex(undefined);
        (0, tracks_1.recordEvent)('product_custom_fields_cancel_edit_modal', {
            source: constants_1.TRACKS_SOURCE,
        });
    }
    return ((0, element_1.createElement)(element_1.Fragment, null,
        renderActionButtonsWrapper((0, element_1.createElement)(components_1.Button, { variant: "secondary", onClick: handleAddNewButtonClick }, (0, i18n_1.__)('Add new', 'fincommerce'))),
        customFields.length === 0 ? ((0, element_1.createElement)(empty_state_1.EmptyState, { names: (0, utils_1.getEmptyStateSequentialNames)((0, i18n_1.__)('Custom field', 'fincommerce'), 3) })) : ((0, element_1.createElement)("table", { ...props, className: (0, clsx_1.default)('fincommerce-product-custom-fields__table', className) },
            (0, element_1.createElement)("thead", null,
                (0, element_1.createElement)("tr", { className: "fincommerce-product-custom-fields__table-row" },
                    (0, element_1.createElement)("th", null, (0, i18n_1.__)('Name', 'fincommerce')),
                    (0, element_1.createElement)("th", null, (0, i18n_1.__)('Value', 'fincommerce')),
                    (0, element_1.createElement)("th", null, (0, i18n_1.__)('Actions', 'fincommerce')))),
            (0, element_1.createElement)("tbody", null, customFields.map((customField, index) => ((0, element_1.createElement)("tr", { className: "fincommerce-product-custom-fields__table-row", key: customField.id ?? customField.key },
                (0, element_1.createElement)("td", { className: "fincommerce-product-custom-fields__table-datacell" }, customField.key),
                (0, element_1.createElement)("td", { className: "fincommerce-product-custom-fields__table-datacell" }, customField.value),
                (0, element_1.createElement)("td", { className: "fincommerce-product-custom-fields__table-datacell" },
                    (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: customFieldEditButtonClickHandler(index) }, (0, i18n_1.__)('Edit', 'fincommerce')),
                    (0, element_1.createElement)(components_1.Button, { icon: icons_1.closeSmall, onClick: customFieldRemoveButtonClickHandler(customField), "aria-label": (0, i18n_1.__)('Remove custom field', 'fincommerce') })))))))),
        showCreateModal && ((0, element_1.createElement)(create_modal_1.CreateModal, { values: customFields, onCreate: handleCreateModalCreate, onCancel: handleCreateModalCancel })),
        selectedCustomFieldIndex !== undefined && ((0, element_1.createElement)(edit_modal_1.EditModal, { initialValue: customFields[selectedCustomFieldIndex], values: customFields, onUpdate: handleEditModalUpdate, onCancel: handleEditModalCancel }))));
}
