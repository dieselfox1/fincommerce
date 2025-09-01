"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsNameField = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const i18n_1 = require("@wordpress/i18n");
const url_1 = require("@wordpress/url");
const components_2 = require("@fincommerce/components");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const edit_product_link_modal_1 = require("../edit-product-link-modal");
const use_product_helper_1 = require("../../hooks/use-product-helper");
const utils_1 = require("../../utils");
const DetailsNameField = ({}) => {
    const { updateProductWithStatus } = (0, use_product_helper_1.useProductHelper)();
    const [showProductLinkEditModal, setShowProductLinkEditModal] = (0, element_1.useState)(false);
    const { getInputProps, values, touched, errors, setValue, resetForm } = (0, components_2.useFormContext)();
    const { prefix: permalinkPrefix, suffix: permalinkSuffix } = (0, utils_1.getPermalinkParts)(values);
    const hasNameError = () => {
        return Boolean(touched.name) && Boolean(errors.name);
    };
    const setSkuIfEmpty = () => {
        if (values.sku || !values.name?.length) {
            return;
        }
        setValue('sku', (0, url_1.cleanForSlug)(values.name));
    };
    return ((0, element_1.createElement)("div", null,
        (0, element_1.createElement)(components_1.TextControl, { label: (0, element_1.createInterpolateElement)((0, i18n_1.__)('Name <required />', 'fincommerce'), {
                required: ((0, element_1.createElement)("span", { className: "fincommerce-product-form__optional-input" }, (0, i18n_1.__)('(required)', 'fincommerce'))),
            }), name: `${constants_1.PRODUCT_DETAILS_SLUG}-name`, placeholder: (0, i18n_1.__)('e.g. 12 oz Coffee Mug', 'fincommerce'), ...getInputProps('name', {
                onBlur: setSkuIfEmpty,
            }) }),
        values.id && !hasNameError() && permalinkPrefix && ((0, element_1.createElement)("span", { className: "fincommerce-product-form__secondary-text product-details-section__product-link" },
            (0, i18n_1.__)('Product link', 'fincommerce'),
            ":\u00A0",
            (0, element_1.createElement)("a", { href: values.permalink, target: "_blank", rel: "noreferrer" },
                permalinkPrefix,
                values.slug || (0, url_1.cleanForSlug)(values.name),
                permalinkSuffix),
            (0, element_1.createElement)(components_1.Button, { variant: "link", onClick: () => setShowProductLinkEditModal(true) }, (0, i18n_1.__)('Edit', 'fincommerce')))),
        showProductLinkEditModal && ((0, element_1.createElement)(edit_product_link_modal_1.EditProductLinkModal, { permalinkPrefix: permalinkPrefix || '', permalinkSuffix: permalinkSuffix || '', product: values, onCancel: () => setShowProductLinkEditModal(false), onSaved: () => setShowProductLinkEditModal(false), saveHandler: async (slug) => {
                const updatedProduct = await updateProductWithStatus(values.id, {
                    slug,
                }, values.status, true);
                if (updatedProduct && updatedProduct.id) {
                    // only reset the updated slug and permalink fields.
                    resetForm({
                        ...values,
                        slug: updatedProduct.slug,
                        permalink: updatedProduct.permalink,
                    }, touched, errors);
                    return {
                        slug: updatedProduct.slug,
                        permalink: updatedProduct.permalink,
                    };
                }
            } }))));
};
exports.DetailsNameField = DetailsNameField;
