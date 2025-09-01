/**
 * External dependencies
 */
import clsx from 'clsx';
import { get } from 'lodash';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { placeholderWhiteBackground as placeholder } from './placeholder';
/**
 * Use `ProductImage` to display a product's or variation's featured image.
 * If no image can be found, a placeholder matching the front-end image
 * placeholder will be displayed.
 */
const ProductImage = ({ product, width = 33, height = 'auto', className = '', alt, ...props }) => {
    // The first returned image from the API is the featured/product image.
    const productImage = get(product, ['images', 0]) || get(product, ['image']);
    const src = (productImage && productImage.src) || false;
    const altText = alt || (productImage && productImage.alt) || '';
    const classes = clsx('fincommerce-product-image', className, {
        'is-placeholder': !src,
    });
    return (createElement("img", { className: classes, src: src || placeholder, width: width, height: height, alt: altText, ...props, style: {
            maxHeight: typeof width === 'number' ? width * 3 : undefined,
            ...props.style,
        } }));
};
export default ProductImage;
