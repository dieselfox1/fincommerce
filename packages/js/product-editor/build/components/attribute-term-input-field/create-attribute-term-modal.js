"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttributeTermModal = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const url_1 = require("@wordpress/url");
const components_2 = require("@fincommerce/components");
const tracks_1 = require("@fincommerce/tracks");
const data_2 = require("@fincommerce/data");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const CreateAttributeTermModal = ({ initialAttributeTermName, attributeId, onCancel = () => { }, onCreated = () => { }, }) => {
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const [isCreating, setIsCreating] = (0, element_1.useState)(false);
    const { createProductAttributeTerm } = (0, data_1.useDispatch)(data_2.experimentalProductAttributeTermsStore);
    const onAdd = async (attribute) => {
        (0, tracks_1.recordEvent)('product_attribute_term_add', {
            source: constants_1.TRACKS_SOURCE,
        });
        setIsCreating(true);
        try {
            const newAttribute = await createProductAttributeTerm({
                ...attribute,
                attribute_id: attributeId,
            });
            (0, tracks_1.recordEvent)('product_attribute_term_add_success', {
                source: constants_1.TRACKS_SOURCE,
            });
            setIsCreating(false);
            onCreated(newAttribute);
        }
        catch (e) {
            (0, tracks_1.recordEvent)('product_attribute_term_add_failed', {
                source: constants_1.TRACKS_SOURCE,
            });
            createNotice('error', (0, i18n_1.__)('Failed to create attribute term.', 'fincommerce'));
            setIsCreating(false);
            onCancel();
        }
    };
    function validateForm(values) {
        const errors = {};
        if (!values.name?.length) {
            errors.name = (0, i18n_1.__)('The attribute term name is required.', 'fincommerce');
        }
        return errors;
    }
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Create attribute', 'fincommerce'), onRequestClose: (event) => {
            event?.stopPropagation();
            onCancel();
        }, className: "fincommerce-create-attribute-term-modal" },
        (0, element_1.createElement)(components_2.Form, { initialValues: {
                name: initialAttributeTermName,
                slug: (0, url_1.cleanForSlug)(initialAttributeTermName),
                description: '',
            }, validate: validateForm, errors: {}, onSubmit: onAdd }, ({ getInputProps, handleSubmit, isValidForm, setValue, values, }) => {
            const nameInputProps = getInputProps('name');
            return ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)(components_1.TextControl, { label: (0, i18n_1.__)('Name', 'fincommerce'), ...nameInputProps, onBlur: () => {
                        nameInputProps.onBlur();
                        setValue('slug', (0, url_1.cleanForSlug)(values.name));
                    } }),
                (0, element_1.createElement)(components_1.TextControl, { label: (0, i18n_1.__)('Slug', 'fincommerce'), ...getInputProps('slug'), help: (0, i18n_1.__)('The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.', 'fincommerce') }),
                (0, element_1.createElement)(components_1.TextareaControl, { label: (0, i18n_1.__)('Description', 'fincommerce'), ...getInputProps('description') }),
                (0, element_1.createElement)("div", { className: "fincommerce-create-attribute-term-modal__buttons" },
                    (0, element_1.createElement)(components_1.Button, { isSecondary: true, label: (0, i18n_1.__)('Cancel', 'fincommerce'), onClick: () => onCancel() }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                    (0, element_1.createElement)(components_1.Button, { isPrimary: true, isBusy: isCreating, label: (0, i18n_1.__)('Add attribute', 'fincommerce'), disabled: !isValidForm || isCreating, onClick: handleSubmit }, (0, i18n_1.__)('Add', 'fincommerce')))));
        })));
};
exports.CreateAttributeTermModal = CreateAttributeTermModal;
