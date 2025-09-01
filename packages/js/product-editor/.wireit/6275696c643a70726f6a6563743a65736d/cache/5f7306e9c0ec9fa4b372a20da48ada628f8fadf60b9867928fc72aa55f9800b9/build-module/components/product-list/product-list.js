/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall, external } from '@wordpress/icons';
import { getNewPath } from '@fincommerce/navigation';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { FormattedPrice } from '../formatted-price';
import { ProductImage } from '../product-image';
export function ProductList({ products, onRemove, onEdit, onPreview, className, ...props }) {
    function nameLinkClickHandler(product) {
        return function handleNameLinkClick() {
            if (onEdit) {
                onEdit(product);
            }
        };
    }
    function previewLinkClickHandler(product) {
        return function handlePreviewLinkClick() {
            if (onPreview) {
                onPreview(product);
            }
        };
    }
    function removeClickHandler(product) {
        return function handleRemoveClick() {
            if (onRemove) {
                onRemove(product);
            }
        };
    }
    return (createElement("div", { ...props, className: clsx('fincommerce-product-list', className) },
        createElement("div", { role: "table" },
            createElement("div", { role: "rowgroup" },
                createElement("div", { role: "rowheader" },
                    createElement("div", { role: "columnheader" }, __('Product', 'fincommerce')),
                    createElement("div", { role: "columnheader", "aria-label": __('Actions', 'fincommerce') }))),
            createElement("div", { role: "rowgroup" }, products.map((product) => (createElement("div", { role: "row", key: product.id },
                createElement("div", { role: "cell" },
                    createElement(ProductImage, { product: product, className: "fincommerce-product-list__product-image" }),
                    createElement("div", { className: "fincommerce-product-list__product-info" },
                        createElement("a", { className: "fincommerce-product-list__product-name", href: getNewPath({}, `/product/${product.id}`, {}), target: "_blank", rel: "noreferrer", onClick: nameLinkClickHandler(product) }, product.name),
                        createElement(FormattedPrice, { product: product, className: "fincommerce-product-list__product-price" }))),
                createElement("div", { role: "cell", className: "fincommerce-product-list__actions" },
                    createElement(Button, { icon: external, "aria-label": __('See product page', 'fincommerce'), href: product.permalink, target: "_blank", rel: "noreferrer", onClick: previewLinkClickHandler(product) }),
                    createElement(Button, { icon: closeSmall, "aria-label": __('Remove product', 'fincommerce'), onClick: removeClickHandler(product) })))))))));
}
