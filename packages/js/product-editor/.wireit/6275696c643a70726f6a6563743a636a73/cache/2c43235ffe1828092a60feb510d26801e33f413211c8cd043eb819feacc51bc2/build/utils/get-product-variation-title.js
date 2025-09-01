"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTruncatedProductVariationTitle = exports.getProductVariationTitle = void 0;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Get the product variation title for use in the header.
 *
 * @param productVariation The product variation.
 * @return string
 */
const getProductVariationTitle = (productVariation) => {
    if (!productVariation?.attributes?.length) {
        return '#' + productVariation.id;
    }
    return productVariation.attributes
        .map((attribute) => {
        return attribute.option;
    })
        .join(', ');
};
exports.getProductVariationTitle = getProductVariationTitle;
/**
 * Get the truncated product variation title.
 *
 * @param productVariation The product variation.
 * @return string
 */
const getTruncatedProductVariationTitle = (productVariation) => {
    const title = (0, exports.getProductVariationTitle)(productVariation);
    if (title.length > constants_1.PRODUCT_VARIATION_TITLE_LIMIT) {
        return title.substring(0, constants_1.PRODUCT_VARIATION_TITLE_LIMIT) + '…';
    }
    return title;
};
exports.getTruncatedProductVariationTitle = getTruncatedProductVariationTitle;
