"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const placeholder_1 = require("./placeholder");
/**
 * Use `ProductImage` to display a product's or variation's featured image.
 * If no image can be found, a placeholder matching the front-end image
 * placeholder will be displayed.
 */
const ProductImage = ({ product, width = 33, height = 'auto', className = '', alt, ...props }) => {
    // The first returned image from the API is the featured/product image.
    const productImage = (0, lodash_1.get)(product, ['images', 0]) || (0, lodash_1.get)(product, ['image']);
    const src = (productImage && productImage.src) || false;
    const altText = alt || (productImage && productImage.alt) || '';
    const classes = (0, clsx_1.default)('fincommerce-product-image', className, {
        'is-placeholder': !src,
    });
    return ((0, element_1.createElement)("img", { className: classes, src: src || placeholder_1.placeholderWhiteBackground, width: width, height: height, alt: altText, ...props, style: {
            maxHeight: typeof width === 'number' ? width * 3 : undefined,
            ...props.style,
        } }));
};
exports.default = ProductImage;
