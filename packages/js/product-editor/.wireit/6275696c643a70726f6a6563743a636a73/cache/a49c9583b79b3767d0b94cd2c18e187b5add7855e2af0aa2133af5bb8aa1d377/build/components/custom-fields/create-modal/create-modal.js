"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModal = CreateModal;
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
const constants_1 = require("../../../constants");
const text_control_1 = require("../../text-control");
const validations_1 = require("../utils/validations");
const custom_field_name_control_1 = require("../custom-field-name-control");
const DEFAULT_CUSTOM_FIELD = {
    id: 1,
    key: '',
    value: '',
};
function CreateModal({ values, onCreate, onCancel, ...props }) {
    const [customFields, setCustomFields] = (0, element_1.useState)([DEFAULT_CUSTOM_FIELD]);
    const [validationError, setValidationError] = (0, element_1.useState)({});
    const inputRefs = (0, element_1.useRef)({});
    (0, element_1.useEffect)(function focusFirstNameInputOnMount() {
        const firstRef = inputRefs.current[DEFAULT_CUSTOM_FIELD.id];
        firstRef?.key?.focus();
    }, []);
    function getRef(customField, prop) {
        return function setRef(element) {
            const id = String(customField.id);
            inputRefs.current[id] = {
                ...inputRefs.current[id],
                [prop]: element,
            };
        };
    }
    function getValidationError(customField, prop) {
        return validationError[String(customField.id)]?.[prop];
    }
    function changeHandler(customField, prop) {
        return function handleChange(value) {
            setCustomFields((current) => current.map((field) => field.id === customField.id
                ? { ...field, [prop]: value }
                : field));
        };
    }
    function blurHandler(customField, prop) {
        return function handleBlur(event) {
            const error = (0, validations_1.validate)({
                ...customField,
                [prop]: event.target.value,
            }, [...customFields, ...values]);
            const id = String(customField.id);
            setValidationError((current) => ({
                ...current,
                [id]: {
                    ...current[id],
                    [prop]: error[prop],
                },
            }));
        };
    }
    function removeCustomFieldButtonClickHandler(customField) {
        if (customFields.length <= 1) {
            return undefined;
        }
        return function handleRemoveCustomFieldButtonClick() {
            setCustomFields((current) => current.filter(({ id }) => customField.id !== id));
            setValidationError((current) => ({
                ...current,
                [`${customField.id}`]: undefined,
            }));
        };
    }
    function handleAddAnotherButtonClick() {
        setCustomFields((current) => {
            const lastField = current[current.length - 1];
            return [
                ...current,
                { ...DEFAULT_CUSTOM_FIELD, id: (lastField.id ?? 0) + 1 },
            ];
        });
        (0, tracks_1.recordEvent)('product_custom_fields_add_another_button_click', {
            source: constants_1.TRACKS_SOURCE,
        });
    }
    function handleAddButtonClick() {
        const { errors, hasErrors } = customFields.reduce((prev, customField) => {
            const _errors = (0, validations_1.validate)(customField, [
                ...customFields,
                ...values,
            ]);
            prev.errors[String(customField.id)] = _errors;
            if (_errors.key) {
                if (!prev.hasErrors) {
                    inputRefs.current[String(customField.id)]?.key?.focus();
                }
                prev.hasErrors = true;
            }
            if (_errors.value) {
                if (!prev.hasErrors) {
                    inputRefs.current[String(customField.id)]?.value?.focus();
                }
                prev.hasErrors = true;
            }
            return prev;
        }, { errors: {}, hasErrors: false });
        if (hasErrors) {
            setValidationError(errors);
            return;
        }
        onCreate(customFields.map(({ id, ...customField }) => ({
            key: customField.key.trim(),
            value: customField.value?.trim(),
        })));
        (0, tracks_1.recordEvent)('product_custom_fields_add_new_button_click', {
            source: constants_1.TRACKS_SOURCE,
            custom_field_names: customFields.map((customField) => customField.key),
            total: customFields.length,
        });
    }
    return ((0, element_1.createElement)(components_1.Modal, { shouldCloseOnClickOutside: false, title: (0, i18n_1.__)('Add custom fields', 'fincommerce'), onRequestClose: onCancel, ...props, className: (0, clsx_1.default)('fincommerce-product-custom-fields__create-modal', props.className) },
        (0, element_1.createElement)("div", { role: "table" },
            (0, element_1.createElement)("div", { role: "rowgroup" },
                (0, element_1.createElement)("div", { role: "rowheader" },
                    (0, element_1.createElement)("div", { role: "columnheader" }, (0, i18n_1.__)('Name', 'fincommerce')),
                    (0, element_1.createElement)("div", { role: "columnheader" }, (0, i18n_1.__)('Value', 'fincommerce')),
                    (0, element_1.createElement)("div", { role: "columnheader", "aria-label": (0, i18n_1.__)('Actions', 'fincommerce') }))),
            (0, element_1.createElement)("div", { role: "rowgroup" }, customFields.map((customField) => ((0, element_1.createElement)("div", { key: customField.id, role: "row" },
                (0, element_1.createElement)("div", { role: "cell" },
                    (0, element_1.createElement)(custom_field_name_control_1.CustomFieldNameControl, { ref: getRef(customField, 'key'), label: (0, i18n_1.__)('Name', 'fincommerce'), hideLabelFromVision: true, allowReset: false, help: getValidationError(customField, 'key'), value: customField.key, onChange: changeHandler(customField, 'key'), onBlur: blurHandler(customField, 'key'), className: (0, clsx_1.default)({
                            'has-error': getValidationError(customField, 'key'),
                        }) })),
                (0, element_1.createElement)("div", { role: "cell" },
                    (0, element_1.createElement)(text_control_1.TextControl, { ref: getRef(customField, 'value'), label: '', "aria-label": (0, i18n_1.__)('Value', 'fincommerce'), error: getValidationError(customField, 'value'), value: customField.value, onChange: changeHandler(customField, 'value'), onBlur: blurHandler(customField, 'value') })),
                (0, element_1.createElement)("div", { role: "cell" },
                    (0, element_1.createElement)(components_1.Button, { icon: icons_1.closeSmall, disabled: customFields.length <= 1, "aria-label": (0, i18n_1.__)('Remove custom field', 'fincommerce'), onClick: removeCustomFieldButtonClickHandler(customField) }))))))),
        (0, element_1.createElement)("div", { className: "fincommerce-product-custom-fields__create-modal-add-another" },
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: handleAddAnotherButtonClick }, (0, i18n_1.__)('+ Add another', 'fincommerce'))),
        (0, element_1.createElement)("div", { className: "fincommerce-product-custom-fields__create-modal-actions" },
            (0, element_1.createElement)(components_1.Button, { variant: "secondary", onClick: onCancel }, (0, i18n_1.__)('Cancel', 'fincommerce')),
            (0, element_1.createElement)(components_1.Button, { variant: "primary", onClick: handleAddButtonClick }, (0, i18n_1.__)('Add', 'fincommerce')))));
}
