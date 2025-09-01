/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { useEntityProp } from '@wordpress/core-data';
import { useProductURL } from '../../../hooks/use-product-url';
import { useProductScheduled } from '../../../hooks/use-product-scheduled';
export function PostPublishTitle({ productType = 'product', }) {
    const { getProductURL } = useProductURL(productType);
    const { isScheduled, formattedDate } = useProductScheduled(productType);
    const [editedProductName] = useEntityProp('postType', productType, 'name');
    const productURLString = getProductURL(false);
    const getPostPublishedTitle = () => {
        if (isScheduled) {
            return createInterpolateElement(sprintf(
            /* translators: %s is the date when the product will be published */
            __('<productURL /> is now scheduled. It will go live on %s', 'fincommerce'), formattedDate), {
                productURL: (createElement("a", { className: "fincommerce-product-list__product-name", href: productURLString, target: "_blank", rel: "noreferrer" }, editedProductName)),
            });
        }
        return createInterpolateElement(__('<productURL /> is now live.', 'fincommerce'), {
            productURL: (createElement("a", { className: "fincommerce-product-list__product-name", href: productURLString, target: "_blank", rel: "noreferrer" }, editedProductName)),
        });
    };
    return (createElement("div", { className: "fincommerce-product-publish-panel__published" }, getPostPublishedTitle()));
}
