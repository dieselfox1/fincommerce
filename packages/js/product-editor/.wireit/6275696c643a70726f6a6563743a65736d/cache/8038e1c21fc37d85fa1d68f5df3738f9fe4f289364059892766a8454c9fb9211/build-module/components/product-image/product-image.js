/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import clsx from 'clsx';
export function getProductImageStyle(product) {
    return product.images.length > 0
        ? {
            backgroundImage: `url(${product.images[0].src})`,
        }
        : undefined;
}
export function ProductImage({ product, className, style, ...props }) {
    return (createElement("div", { "aria-hidden": "true", ...props, className: clsx('fincommerce-product-image', className), style: { ...style, ...getProductImageStyle(product) } }));
}
