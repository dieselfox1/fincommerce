"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAttributesUsedForVariations = void 0;
/**
 * Determine if any attribute in the list is used for variations.
 *
 * @param {Array} attributeList - List of product attributes.
 * @return {boolean} True if any attribute is used for variations.
 */
const hasAttributesUsedForVariations = (attributeList) => {
    if (!Array.isArray(attributeList) || !attributeList.length) {
        return false;
    }
    return attributeList.some(({ variation }) => variation);
};
exports.hasAttributesUsedForVariations = hasAttributesUsedForVariations;
