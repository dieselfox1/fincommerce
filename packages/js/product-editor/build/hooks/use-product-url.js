"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductURL = useProductURL;
/**
 * External dependencies
 */
const core_data_1 = require("@wordpress/core-data");
const element_1 = require("@wordpress/element");
function useProductURL(productType) {
    const [permalink] = (0, core_data_1.useEntityProp)('postType', productType, 'permalink');
    const getProductURL = (0, element_1.useCallback)((isPreview) => {
        if (!permalink)
            return undefined;
        const productURL = new URL(permalink);
        if (isPreview) {
            productURL.searchParams.append('preview', 'true');
        }
        return productURL.toString();
    }, [permalink]);
    return { getProductURL };
}
