"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attributes = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const attribute_control_1 = require("../attribute-control");
/**
 * This component is no longer in active use.
 * It is kept here for backward compatibility because is being used in the `AttributesField` component, under
 * `plugins/fincommerce-admin/client/products/fills/attributes-section/attributes-field.tsx`.
 */
const Attributes = ({ value, onChange, attributeList = [], }) => {
    return ((0, element_1.createElement)(attribute_control_1.AttributeControl, { value: attributeList, disabledAttributeIds: value
            .filter((attr) => !!attr.variation)
            .map((attr) => attr.id), uiStrings: {
            disabledAttributeMessage: (0, i18n_1.__)('Already used in Variations', 'fincommerce'),
        }, onAdd: () => {
            (0, tracks_1.recordEvent)('product_add_attributes_modal_add_button_click');
        }, onChange: onChange, onNewModalCancel: () => {
            (0, tracks_1.recordEvent)('product_add_attributes_modal_cancel_button_click');
        }, onNewModalOpen: () => {
            if (!attributeList.length) {
                (0, tracks_1.recordEvent)('product_add_first_attribute_button_click');
                return;
            }
            (0, tracks_1.recordEvent)('product_add_attribute_button');
        }, onAddAnother: () => {
            (0, tracks_1.recordEvent)('product_add_attributes_modal_add_another_attribute_button_click');
        }, onRemoveItem: () => {
            (0, tracks_1.recordEvent)('product_add_attributes_modal_remove_attribute_button_click');
        }, onRemove: () => (0, tracks_1.recordEvent)('product_remove_attribute_confirmation_confirm_click'), onRemoveCancel: () => (0, tracks_1.recordEvent)('product_remove_attribute_confirmation_cancel_click'), termsAutoSelection: "first", defaultVisibility: true }));
};
exports.Attributes = Attributes;
