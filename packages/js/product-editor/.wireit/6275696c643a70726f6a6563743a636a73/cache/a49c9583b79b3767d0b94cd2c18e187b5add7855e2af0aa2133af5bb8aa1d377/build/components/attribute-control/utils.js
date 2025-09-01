"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAttributeFilledOut = exports.hasTermsOrOptions = exports.getAttributeId = void 0;
exports.getAttributeKey = getAttributeKey;
exports.reorderSortableProductAttributePositions = reorderSortableProductAttributePositions;
/**
 * Returns the attribute key. The key will be the `id` or the `name` when the id is 0.
 *
 * @param { ProductProductAttribute } attribute product attribute.
 * @return string|number
 */
function getAttributeKey(attribute) {
    return attribute.id !== 0 ? attribute.id : attribute.name;
}
/**
 * Get an attribute ID that works universally across global and local attributes.
 *
 * @param attribute Product attribute.
 * @return string
 */
const getAttributeId = (attribute) => `${attribute.id}-${attribute.name}`;
exports.getAttributeId = getAttributeId;
/**
 * Updates the position of a product attribute from the new items list.
 *
 * @param { Object } items              key value pair of list items positions.
 * @param { Object } attributeKeyValues key value pair of product attributes.
 */
function reorderSortableProductAttributePositions(items, attributeKeyValues) {
    return Object.keys(attributeKeyValues).map((attributeKey) => {
        if (!isNaN(items[attributeKey])) {
            return {
                ...attributeKeyValues[attributeKey],
                position: items[attributeKey],
            };
        }
        return {
            ...attributeKeyValues[attributeKey],
        };
    });
}
/**
 * Checks if the given attribute has
 * either terms (global attributes) or options (local attributes).
 *
 * @param {EnhancedProductAttribute} attribute - The attribute to check.
 * @return {boolean} True if the attribute has terms or options, false otherwise.
 */
const hasTermsOrOptions = (attribute) => !!(attribute?.terms?.length || attribute?.options?.length);
exports.hasTermsOrOptions = hasTermsOrOptions;
/**
 * Checks if the given attribute is filled out,
 * meaning it has a name and either terms or options.
 *
 * @param {EnhancedProductAttribute | null} attribute - The attribute to check.
 * @return {attribute is EnhancedProductAttribute} - True if the attribute is filled out, otherwise false.
 */
const isAttributeFilledOut = (attribute) => !!attribute?.name.length && (0, exports.hasTermsOrOptions)(attribute);
exports.isAttributeFilledOut = isAttributeFilledOut;
