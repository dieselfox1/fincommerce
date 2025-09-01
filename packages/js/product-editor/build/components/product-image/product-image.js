"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductImageStyle = getProductImageStyle;
exports.ProductImage = ProductImage;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
function getProductImageStyle(product) {
    return product.images.length > 0
        ? {
            backgroundImage: `url(${product.images[0].src})`,
        }
        : undefined;
}
function ProductImage({ product, className, style, ...props }) {
    return ((0, element_1.createElement)("div", { "aria-hidden": "true", ...props, className: (0, clsx_1.default)('fincommerce-product-image', className), style: { ...style, ...getProductImageStyle(product) } }));
}
