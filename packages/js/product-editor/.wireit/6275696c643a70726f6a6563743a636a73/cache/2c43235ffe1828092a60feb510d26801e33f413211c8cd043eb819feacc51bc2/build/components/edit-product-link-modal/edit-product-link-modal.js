"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProductLinkModal = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const url_1 = require("@wordpress/url");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const EditProductLinkModal = ({ product, permalinkPrefix, permalinkSuffix, onCancel, onSaved, saveHandler, }) => {
    const { createNotice } = (0, data_1.useDispatch)('core/notices');
    const [isSaving, setIsSaving] = (0, element_1.useState)(false);
    const [slug, setSlug] = (0, element_1.useState)(product.slug || (0, url_1.cleanForSlug)(product.name));
    const onSave = async () => {
        (0, tracks_1.recordEvent)('product_update_slug', {
            source: constants_1.TRACKS_SOURCE,
            product_id: product.id,
            product_type: product.type,
        });
        const { slug: updatedSlug, permalink: updatedPermalink } = (await saveHandler(slug)) ?? {};
        if (updatedSlug) {
            createNotice(updatedSlug === (0, url_1.cleanForSlug)(slug) ? 'success' : 'info', updatedSlug === (0, url_1.cleanForSlug)(slug)
                ? (0, i18n_1.__)('Product link successfully updated.', 'fincommerce')
                : (0, i18n_1.__)('Product link already existed, updated to ', 'fincommerce') + updatedPermalink);
        }
        else {
            createNotice('error', (0, i18n_1.__)('Failed to update product link.', 'fincommerce'));
        }
        onSaved();
    };
    const newProductLinkLabel = permalinkPrefix + (0, url_1.cleanForSlug)(slug) + permalinkSuffix;
    return ((0, element_1.createElement)(components_1.Modal, { title: (0, i18n_1.__)('Edit product link', 'fincommerce'), onRequestClose: () => onCancel(), className: "fincommerce-product-link-edit-modal" },
        (0, element_1.createElement)("div", { className: "fincommerce-product-link-edit-modal__wrapper" },
            (0, element_1.createElement)("p", { className: "fincommerce-product-link-edit-modal__description" }, (0, i18n_1.__)("Create a unique link for this product. Use simple, descriptive words and numbers. We'll replace spaces with hyphens (-).", 'fincommerce')),
            (0, element_1.createElement)(components_1.TextControl, { label: (0, i18n_1.__)('Product link', 'fincommerce'), name: "slug", value: slug, onChange: setSlug, hideLabelFromVision: true, help: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Preview: <link />', 'fincommerce'), {
                    link: (0, element_1.createElement)("strong", null, newProductLinkLabel),
                }) }),
            (0, element_1.createElement)("div", { className: "fincommerce-product-link-edit-modal__buttons" },
                (0, element_1.createElement)(components_1.Button, { isSecondary: true, onClick: () => onCancel() }, (0, i18n_1.__)('Cancel', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { isPrimary: true, isBusy: isSaving, disabled: isSaving || slug === product.slug, onClick: async () => {
                        setIsSaving(true);
                        await onSave();
                        setIsSaving(false);
                    } }, (0, i18n_1.__)('Save', 'fincommerce'))))));
};
exports.EditProductLinkModal = EditProductLinkModal;
