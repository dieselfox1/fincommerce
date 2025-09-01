/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Modal, TextareaControl, TextControl, } from '@wordpress/components';
import { useState, createElement, Fragment } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { cleanForSlug } from '@wordpress/url';
import { Form } from '@fincommerce/components';
import { recordEvent } from '@fincommerce/tracks';
import { experimentalProductAttributeTermsStore, } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
export const CreateAttributeTermModal = ({ initialAttributeTermName, attributeId, onCancel = () => { }, onCreated = () => { }, }) => {
    const { createNotice } = useDispatch('core/notices');
    const [isCreating, setIsCreating] = useState(false);
    const { createProductAttributeTerm } = useDispatch(experimentalProductAttributeTermsStore);
    const onAdd = async (attribute) => {
        recordEvent('product_attribute_term_add', {
            source: TRACKS_SOURCE,
        });
        setIsCreating(true);
        try {
            const newAttribute = await createProductAttributeTerm({
                ...attribute,
                attribute_id: attributeId,
            });
            recordEvent('product_attribute_term_add_success', {
                source: TRACKS_SOURCE,
            });
            setIsCreating(false);
            onCreated(newAttribute);
        }
        catch (e) {
            recordEvent('product_attribute_term_add_failed', {
                source: TRACKS_SOURCE,
            });
            createNotice('error', __('Failed to create attribute term.', 'fincommerce'));
            setIsCreating(false);
            onCancel();
        }
    };
    function validateForm(values) {
        const errors = {};
        if (!values.name?.length) {
            errors.name = __('The attribute term name is required.', 'fincommerce');
        }
        return errors;
    }
    return (createElement(Modal, { title: __('Create attribute', 'fincommerce'), onRequestClose: (event) => {
            event?.stopPropagation();
            onCancel();
        }, className: "fincommerce-create-attribute-term-modal" },
        createElement(Form, { initialValues: {
                name: initialAttributeTermName,
                slug: cleanForSlug(initialAttributeTermName),
                description: '',
            }, validate: validateForm, errors: {}, onSubmit: onAdd }, ({ getInputProps, handleSubmit, isValidForm, setValue, values, }) => {
            const nameInputProps = getInputProps('name');
            return (createElement(Fragment, null,
                createElement(TextControl, { label: __('Name', 'fincommerce'), ...nameInputProps, onBlur: () => {
                        nameInputProps.onBlur();
                        setValue('slug', cleanForSlug(values.name));
                    } }),
                createElement(TextControl, { label: __('Slug', 'fincommerce'), ...getInputProps('slug'), help: __('The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.', 'fincommerce') }),
                createElement(TextareaControl, { label: __('Description', 'fincommerce'), ...getInputProps('description') }),
                createElement("div", { className: "fincommerce-create-attribute-term-modal__buttons" },
                    createElement(Button, { isSecondary: true, label: __('Cancel', 'fincommerce'), onClick: () => onCancel() }, __('Cancel', 'fincommerce')),
                    createElement(Button, { isPrimary: true, isBusy: isCreating, label: __('Add attribute', 'fincommerce'), disabled: !isValidForm || isCreating, onClick: handleSubmit }, __('Add', 'fincommerce')))));
        })));
};
