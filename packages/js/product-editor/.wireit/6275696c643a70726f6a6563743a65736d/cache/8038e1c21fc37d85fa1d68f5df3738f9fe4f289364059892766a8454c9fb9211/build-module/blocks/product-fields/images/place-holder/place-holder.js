/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { Products } from './imgs/products';
import { Product } from './imgs/product';
export function PlaceHolder({ multiple = true }) {
    return (createElement("div", { className: "fincommerce-image-placeholder__wrapper" },
        multiple ? createElement(Products, null) : createElement(Product, null),
        createElement("p", null, multiple
            ? __('For best results, offer a variety of product images, like close-up details, lifestyle scenes, and color variations.', 'fincommerce')
            : __('Add an image which displays the unique characteristics of this variation.', 'fincommerce'))));
}
