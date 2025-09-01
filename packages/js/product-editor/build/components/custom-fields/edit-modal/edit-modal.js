"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditModal = EditModal;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const tracks_1 = require("@fincommerce/tracks");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
const text_control_1 = require("../../text-control");
const validations_1 = require("../utils/validations");
const custom_field_name_control_1 = require("../custom-field-name-control");
function EditModal({ initialValue, values, onUpdate, onCancel, ...props }) {
    const [customField, setCustomField] = (0, element_1.useState)(initialValue);
    const [validationError, setValidationError] = (0, element_1.useState)();
    const keyInputRef = (0, element_1.useRef)(null);
    const valueInputRef = (0, element_1.useRef)(null);
    (0, element_1.useEffect)(function focusNameInputOnMount() {
        keyInputRef.current?.focus();
    }, []);
    function renderTitle() {
        return (0, i18n_1.sprintf)(
        /* translators: %s: the name of the custom field */
        (0, i18n_1.__)('Edit %s', 'fincommerce'), customField.key);
    }
    function changeHandler(prop) {
        return function handleChange(value) {
            setCustomField((current) => ({
                ...current,
                [prop]: value,
            }));
        };
    }
    function blurHandler(prop) {
        return function handleBlur(event) {
            const error = (0, validations_1.validate)({
                ...customField,
                [prop]: event.target.value,
            }, values);
            setValidationError(error);
        };
    }
    function handleUpdateButtonClick() {
        const errors = (0, validations_1.validate)(customField, values);
        if (errors.key || errors.value) {
            setValidationError(errors);
            if (errors.key) {
                keyInputRef.current?.focus();
                return;
            }
            valueInputRef.current?.focus();
            return;
        }
        onUpdate({
            ...customField,
            key: customField.key.trim(),
            value: customField.value?.trim(),
        });
        (0, tracks_1.recordEvent)('product_custom_fields_update_button_click', {
            source: constants_1.TRACKS_SOURCE,
            custom_field_id: customField.id,
            custom_field_name: customField.key,
            prev_custom_field_name: initialValue.key,
        });
    }
    return ((0, element_1.createElement)(components_1.Modal, { shouldCloseOnClickOutside: false, ...props, title: renderTitle(), onRequestClose: onCancel, className: (0, clsx_1.default)('fincommerce-product-custom-fields__edit-modal', props.className) },
        (0, element_1.createElement)(custom_field_name_control_1.CustomFieldNameControl, { ref: keyInputRef, label: (0, i18n_1.__)('Name', 'fincommerce'), allowReset: false, help: validationError?.key, value: customField.key, onChange: changeHandler('key'), onBlur: blurHandler('key'), className: (0, clsx_1.default)({
                'has-error': validationError?.key,
            }) }),
        (0, element_1.createElement)(text_control_1.TextControl, { ref: valueInputRef, label: (0, i18n_1.__)('Value', 'fincommerce'), error: validationError?.value, value: customField.value, onChange: changeHandler('value'), onBlur: blurHandler('value') }),
        (0, element_1.createElement)("div", { className: "fincommerce-product-custom-fields__edit-modal-actions" },
            (0, element_1.createElement)(components_1.Button, { variant: "secondary", onClick: onCancel }, (0, i18n_1.__)('Cancel', 'fincommerce')),
            (0, element_1.createElement)(components_1.Button, { variant: "primary", onClick: handleUpdateButtonClick }, (0, i18n_1.__)('Update', 'fincommerce')))));
}
