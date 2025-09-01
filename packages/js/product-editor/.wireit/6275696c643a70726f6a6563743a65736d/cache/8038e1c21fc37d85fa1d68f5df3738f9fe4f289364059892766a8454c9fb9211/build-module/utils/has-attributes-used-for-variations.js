/**
 * Determine if any attribute in the list is used for variations.
 *
 * @param {Array} attributeList - List of product attributes.
 * @return {boolean} True if any attribute is used for variations.
 */
export const hasAttributesUsedForVariations = (attributeList) => {
    if (!Array.isArray(attributeList) || !attributeList.length) {
        return false;
    }
    return attributeList.some(({ variation }) => variation);
};
