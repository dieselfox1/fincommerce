/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Modal, TextControl } from '@wordpress/components';
import { useState, createElement, createInterpolateElement, } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { cleanForSlug } from '@wordpress/url';
import { recordEvent } from '@fincommerce/tracks';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
export const EditProductLinkModal = ({ product, permalinkPrefix, permalinkSuffix, onCancel, onSaved, saveHandler, }) => {
    const { createNotice } = useDispatch('core/notices');
    const [isSaving, setIsSaving] = useState(false);
    const [slug, setSlug] = useState(product.slug || cleanForSlug(product.name));
    const onSave = async () => {
        recordEvent('product_update_slug', {
            source: TRACKS_SOURCE,
            product_id: product.id,
            product_type: product.type,
        });
        const { slug: updatedSlug, permalink: updatedPermalink } = (await saveHandler(slug)) ?? {};
        if (updatedSlug) {
            createNotice(updatedSlug === cleanForSlug(slug) ? 'success' : 'info', updatedSlug === cleanForSlug(slug)
                ? __('Product link successfully updated.', 'fincommerce')
                : __('Product link already existed, updated to ', 'fincommerce') + updatedPermalink);
        }
        else {
            createNotice('error', __('Failed to update product link.', 'fincommerce'));
        }
        onSaved();
    };
    const newProductLinkLabel = permalinkPrefix + cleanForSlug(slug) + permalinkSuffix;
    return (createElement(Modal, { title: __('Edit product link', 'fincommerce'), onRequestClose: () => onCancel(), className: "fincommerce-product-link-edit-modal" },
        createElement("div", { className: "fincommerce-product-link-edit-modal__wrapper" },
            createElement("p", { className: "fincommerce-product-link-edit-modal__description" }, __("Create a unique link for this product. Use simple, descriptive words and numbers. We'll replace spaces with hyphens (-).", 'fincommerce')),
            createElement(TextControl, { label: __('Product link', 'fincommerce'), name: "slug", value: slug, onChange: setSlug, hideLabelFromVision: true, help: createInterpolateElement(__('Preview: <link />', 'fincommerce'), {
                    link: createElement("strong", null, newProductLinkLabel),
                }) }),
            createElement("div", { className: "fincommerce-product-link-edit-modal__buttons" },
                createElement(Button, { isSecondary: true, onClick: () => onCancel() }, __('Cancel', 'fincommerce')),
                createElement(Button, { isPrimary: true, isBusy: isSaving, disabled: isSaving || slug === product.slug, onClick: async () => {
                        setIsSaving(true);
                        await onSave();
                        setIsSaving(false);
                    } }, __('Save', 'fincommerce'))))));
};
