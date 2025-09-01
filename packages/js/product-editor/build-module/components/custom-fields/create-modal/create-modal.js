/**
 * External dependencies
 */
import { Button, Modal } from '@wordpress/components';
import { createElement, useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { recordEvent } from '@fincommerce/tracks';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../../constants';
import { TextControl } from '../../text-control';
import { validate, } from '../utils/validations';
import { CustomFieldNameControl } from '../custom-field-name-control';
const DEFAULT_CUSTOM_FIELD = {
    id: 1,
    key: '',
    value: '',
};
export function CreateModal({ values, onCreate, onCancel, ...props }) {
    const [customFields, setCustomFields] = useState([DEFAULT_CUSTOM_FIELD]);
    const [validationError, setValidationError] = useState({});
    const inputRefs = useRef({});
    useEffect(function focusFirstNameInputOnMount() {
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
            const error = validate({
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
        recordEvent('product_custom_fields_add_another_button_click', {
            source: TRACKS_SOURCE,
        });
    }
    function handleAddButtonClick() {
        const { errors, hasErrors } = customFields.reduce((prev, customField) => {
            const _errors = validate(customField, [
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
        recordEvent('product_custom_fields_add_new_button_click', {
            source: TRACKS_SOURCE,
            custom_field_names: customFields.map((customField) => customField.key),
            total: customFields.length,
        });
    }
    return (createElement(Modal, { shouldCloseOnClickOutside: false, title: __('Add custom fields', 'fincommerce'), onRequestClose: onCancel, ...props, className: clsx('fincommerce-product-custom-fields__create-modal', props.className) },
        createElement("div", { role: "table" },
            createElement("div", { role: "rowgroup" },
                createElement("div", { role: "rowheader" },
                    createElement("div", { role: "columnheader" }, __('Name', 'fincommerce')),
                    createElement("div", { role: "columnheader" }, __('Value', 'fincommerce')),
                    createElement("div", { role: "columnheader", "aria-label": __('Actions', 'fincommerce') }))),
            createElement("div", { role: "rowgroup" }, customFields.map((customField) => (createElement("div", { key: customField.id, role: "row" },
                createElement("div", { role: "cell" },
                    createElement(CustomFieldNameControl, { ref: getRef(customField, 'key'), label: __('Name', 'fincommerce'), hideLabelFromVision: true, allowReset: false, help: getValidationError(customField, 'key'), value: customField.key, onChange: changeHandler(customField, 'key'), onBlur: blurHandler(customField, 'key'), className: clsx({
                            'has-error': getValidationError(customField, 'key'),
                        }) })),
                createElement("div", { role: "cell" },
                    createElement(TextControl, { ref: getRef(customField, 'value'), label: '', "aria-label": __('Value', 'fincommerce'), error: getValidationError(customField, 'value'), value: customField.value, onChange: changeHandler(customField, 'value'), onBlur: blurHandler(customField, 'value') })),
                createElement("div", { role: "cell" },
                    createElement(Button, { icon: closeSmall, disabled: customFields.length <= 1, "aria-label": __('Remove custom field', 'fincommerce'), onClick: removeCustomFieldButtonClickHandler(customField) }))))))),
        createElement("div", { className: "fincommerce-product-custom-fields__create-modal-add-another" },
            createElement(Button, { variant: "tertiary", onClick: handleAddAnotherButtonClick }, __('+ Add another', 'fincommerce'))),
        createElement("div", { className: "fincommerce-product-custom-fields__create-modal-actions" },
            createElement(Button, { variant: "secondary", onClick: onCancel }, __('Cancel', 'fincommerce')),
            createElement(Button, { variant: "primary", onClick: handleAddButtonClick }, __('Add', 'fincommerce')))));
}
