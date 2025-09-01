"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPublishTitle = PostPublishTitle;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const core_data_1 = require("@wordpress/core-data");
const use_product_url_1 = require("../../../hooks/use-product-url");
const use_product_scheduled_1 = require("../../../hooks/use-product-scheduled");
function PostPublishTitle({ productType = 'product', }) {
    const { getProductURL } = (0, use_product_url_1.useProductURL)(productType);
    const { isScheduled, formattedDate } = (0, use_product_scheduled_1.useProductScheduled)(productType);
    const [editedProductName] = (0, core_data_1.useEntityProp)('postType', productType, 'name');
    const productURLString = getProductURL(false);
    const getPostPublishedTitle = () => {
        if (isScheduled) {
            return (0, element_1.createInterpolateElement)((0, i18n_1.sprintf)(
            /* translators: %s is the date when the product will be published */
            (0, i18n_1.__)('<productURL /> is now scheduled. It will go live on %s', 'fincommerce'), formattedDate), {
                productURL: ((0, element_1.createElement)("a", { className: "fincommerce-product-list__product-name", href: productURLString, target: "_blank", rel: "noreferrer" }, editedProductName)),
            });
        }
        return (0, element_1.createInterpolateElement)((0, i18n_1.__)('<productURL /> is now live.', 'fincommerce'), {
            productURL: ((0, element_1.createElement)("a", { className: "fincommerce-product-list__product-name", href: productURLString, target: "_blank", rel: "noreferrer" }, editedProductName)),
        });
    };
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-publish-panel__published" }, getPostPublishedTitle()));
}
