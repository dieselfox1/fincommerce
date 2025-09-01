/**
 * External dependencies
 */
import { useState, createElement, createInterpolateElement, useRef, useEffect, } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Form, useFormContext } from '@fincommerce/components';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { Button, Modal, TextControl, __experimentalInputControl as InputControl, __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper, } from '@wordpress/components';
function ShippingClassForm({ onAdd, onCancel }) {
    const { errors, getInputProps, isValidForm } = useFormContext();
    const [isLoading, setIsLoading] = useState(false);
    function handleAdd() {
        setIsLoading(true);
        onAdd()
            .then(() => {
            setIsLoading(false);
            onCancel();
        })
            .catch(() => {
            setIsLoading(false);
        });
    }
    // State to control the automatic slug generation.
    const [isRequestingSlug, setIsRequestingSlug] = useState(false);
    // Get the shipping class name value.
    const shippingNameInputValue = String(getInputProps('name').value);
    const [prevNameValue, setPrevNameValue] = useState(shippingNameInputValue);
    // Get the reference of the name field
    const nameRef = useRef(null);
    // Focus in the name field when the component is mounted.
    useEffect(() => {
        nameRef.current?.focus();
    }, []);
    /**
     * Pull the slug suggestion from the server,
     * and update the slug input field.
     */
    async function pullAndUpdateSlugInputField() {
        setIsRequestingSlug(true);
        // Avoid making the request if the name has not changed.
        if (prevNameValue === shippingNameInputValue) {
            return;
        }
        setIsRequestingSlug(true);
        setPrevNameValue(shippingNameInputValue);
        const url = `/wc/v3/products/shipping_classes/slug-suggestion`;
        const slug = await apiFetch({
            path: addQueryArgs(url, { name: shippingNameInputValue }),
            method: 'GET',
        });
        setIsRequestingSlug(false);
        getInputProps('slug').onChange(slug);
    }
    const isGenerateButtonDisabled = isRequestingSlug ||
        !shippingNameInputValue?.length ||
        prevNameValue === shippingNameInputValue;
    /**
     * Get a slug suggestion based on the shipping class name.
     * This function is called when the name field is blurred.
     */
    function getSlugSuggestion() {
        if (!isRequestingSlug) {
            return;
        }
        pullAndUpdateSlugInputField();
    }
    return (createElement("div", { className: "fincommerce-add-new-shipping-class-modal__wrapper" },
        createElement(TextControl, { ...getInputProps('name'), placeholder: __('e.g. Fragile products', 'fincommerce'), label: createInterpolateElement(__('Name <required />', 'fincommerce'), {
                required: (createElement("span", { className: "fincommerce-add-new-shipping-class-modal__optional-input" }, __('(required)', 'fincommerce'))),
            }), onBlur: getSlugSuggestion, ref: nameRef }),
        createElement(InputControl, { ...getInputProps('slug'), label: __('Slug', 'fincommerce'), onChange: (value) => {
                setPrevNameValue(''); // clean the previous name value.
                getInputProps('slug').onChange(value ?? '');
            }, disabled: isRequestingSlug, help: __('Set a custom slug or generate it by clicking the button.', 'fincommerce'), prefix: createElement(InputControlPrefixWrapper, null,
                createElement(Button, { disabled: isGenerateButtonDisabled, variant: "secondary", onClick: pullAndUpdateSlugInputField, isBusy: isRequestingSlug, isSmall: true }, __('Generate', 'fincommerce'))) }),
        createElement(TextControl, { ...getInputProps('description'), label: __('Description', 'fincommerce'), help: errors?.description ??
                __('Describe how you and other store administrators can use this shipping class.', 'fincommerce') }),
        createElement("div", { className: "fincommerce-add-new-shipping-class-modal__buttons" },
            createElement(Button, { variant: "secondary", onClick: onCancel }, __('Cancel', 'fincommerce')),
            createElement(Button, { variant: "primary", isBusy: isLoading, disabled: !isValidForm || isLoading, onClick: handleAdd }, __('Add', 'fincommerce')))));
}
function validateForm(values) {
    const errors = {};
    if (!values.name?.length) {
        errors.name = __('The shipping class name is required.', 'fincommerce');
    }
    return errors;
}
const INITIAL_VALUES = { name: '', slug: '', description: '' };
export function AddNewShippingClassModal({ shippingClass, onAdd, onCancel, }) {
    function handleSubmit(values) {
        return onAdd(Object.entries(values).reduce(function removeEmptyValue(current, [name, value]) {
            return {
                ...current,
                [name]: value === '' ? undefined : value,
            };
        }, {}));
    }
    return (createElement(Modal, { title: __('New shipping class', 'fincommerce'), className: "fincommerce-add-new-shipping-class-modal", onRequestClose: onCancel },
        createElement(Form, { initialValues: shippingClass ?? INITIAL_VALUES, validate: validateForm, errors: {}, onSubmit: handleSubmit }, (childrenProps) => (createElement(ShippingClassForm, { onAdd: childrenProps.handleSubmit, onCancel: onCancel })))));
}
