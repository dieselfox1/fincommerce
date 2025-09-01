"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewShippingClassModal = AddNewShippingClassModal;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@fincommerce/components");
const url_1 = require("@wordpress/url");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const components_2 = require("@wordpress/components");
function ShippingClassForm({ onAdd, onCancel }) {
    const { errors, getInputProps, isValidForm } = (0, components_1.useFormContext)();
    const [isLoading, setIsLoading] = (0, element_1.useState)(false);
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
    const [isRequestingSlug, setIsRequestingSlug] = (0, element_1.useState)(false);
    // Get the shipping class name value.
    const shippingNameInputValue = String(getInputProps('name').value);
    const [prevNameValue, setPrevNameValue] = (0, element_1.useState)(shippingNameInputValue);
    // Get the reference of the name field
    const nameRef = (0, element_1.useRef)(null);
    // Focus in the name field when the component is mounted.
    (0, element_1.useEffect)(() => {
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
        const slug = await (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)(url, { name: shippingNameInputValue }),
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
    return ((0, element_1.createElement)("div", { className: "fincommerce-add-new-shipping-class-modal__wrapper" },
        (0, element_1.createElement)(components_2.TextControl, { ...getInputProps('name'), placeholder: (0, i18n_1.__)('e.g. Fragile products', 'fincommerce'), label: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Name <required />', 'fincommerce'), {
                required: ((0, element_1.createElement)("span", { className: "fincommerce-add-new-shipping-class-modal__optional-input" }, (0, i18n_1.__)('(required)', 'fincommerce'))),
            }), onBlur: getSlugSuggestion, ref: nameRef }),
        (0, element_1.createElement)(components_2.__experimentalInputControl, { ...getInputProps('slug'), label: (0, i18n_1.__)('Slug', 'fincommerce'), onChange: (value) => {
                setPrevNameValue(''); // clean the previous name value.
                getInputProps('slug').onChange(value ?? '');
            }, disabled: isRequestingSlug, help: (0, i18n_1.__)('Set a custom slug or generate it by clicking the button.', 'fincommerce'), prefix: (0, element_1.createElement)(components_2.__experimentalInputControlPrefixWrapper, null,
                (0, element_1.createElement)(components_2.Button, { disabled: isGenerateButtonDisabled, variant: "secondary", onClick: pullAndUpdateSlugInputField, isBusy: isRequestingSlug, isSmall: true }, (0, i18n_1.__)('Generate', 'fincommerce'))) }),
        (0, element_1.createElement)(components_2.TextControl, { ...getInputProps('description'), label: (0, i18n_1.__)('Description', 'fincommerce'), help: errors?.description ??
                (0, i18n_1.__)('Describe how you and other store administrators can use this shipping class.', 'fincommerce') }),
        (0, element_1.createElement)("div", { className: "fincommerce-add-new-shipping-class-modal__buttons" },
            (0, element_1.createElement)(components_2.Button, { variant: "secondary", onClick: onCancel }, (0, i18n_1.__)('Cancel', 'fincommerce')),
            (0, element_1.createElement)(components_2.Button, { variant: "primary", isBusy: isLoading, disabled: !isValidForm || isLoading, onClick: handleAdd }, (0, i18n_1.__)('Add', 'fincommerce')))));
}
function validateForm(values) {
    const errors = {};
    if (!values.name?.length) {
        errors.name = (0, i18n_1.__)('The shipping class name is required.', 'fincommerce');
    }
    return errors;
}
const INITIAL_VALUES = { name: '', slug: '', description: '' };
function AddNewShippingClassModal({ shippingClass, onAdd, onCancel, }) {
    function handleSubmit(values) {
        return onAdd(Object.entries(values).reduce(function removeEmptyValue(current, [name, value]) {
            return {
                ...current,
                [name]: value === '' ? undefined : value,
            };
        }, {}));
    }
    return ((0, element_1.createElement)(components_2.Modal, { title: (0, i18n_1.__)('New shipping class', 'fincommerce'), className: "fincommerce-add-new-shipping-class-modal", onRequestClose: onCancel },
        (0, element_1.createElement)(components_1.Form, { initialValues: shippingClass ?? INITIAL_VALUES, validate: validateForm, errors: {}, onSubmit: handleSubmit }, (childrenProps) => ((0, element_1.createElement)(ShippingClassForm, { onAdd: childrenProps.handleSubmit, onCancel: onCancel })))));
}
