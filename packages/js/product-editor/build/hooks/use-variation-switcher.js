"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVariationSwitcher = useVariationSwitcher;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const data_2 = require("@fincommerce/data");
const navigation_1 = require("@fincommerce/navigation");
function useVariationSwitcher({ variationId, parentId, parentProductType, }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { invalidateResolution } = (0, data_1.useDispatch)('core');
    const { invalidateResolutionForStoreSelector } = (0, data_1.useDispatch)(data_2.EXPERIMENTAL_PRODUCT_VARIATIONS_STORE_NAME);
    const variationValues = (0, data_1.useSelect)((select) => {
        if (parentId === undefined) {
            return {};
        }
        const { getEntityRecord } = select('core');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const parentProduct = getEntityRecord('postType', parentProductType || 'product', parentId);
        if (variationId !== undefined &&
            parentProduct &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            parentProduct.variations) {
            const activeVariationIndex = 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            parentProduct.variations.indexOf(variationId);
            const previousVariationIndex = activeVariationIndex > 0 ? activeVariationIndex - 1 : null;
            const nextVariationIndex = 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            activeVariationIndex !== parentProduct.variations.length - 1
                ? activeVariationIndex + 1
                : null;
            return {
                activeVariationIndex,
                nextVariationIndex,
                previousVariationIndex,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                numberOfVariations: parentProduct.variations.length,
                previousVariationId: previousVariationIndex !== null
                    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        parentProduct.variations[previousVariationIndex]
                    : null,
                nextVariationId: nextVariationIndex !== null
                    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        parentProduct.variations[nextVariationIndex]
                    : null,
            };
        }
        return {};
    }, [variationId, parentId]);
    function invalidateVariationList() {
        invalidateResolution('getEntityRecord', [
            'postType',
            parentProductType || 'product',
            parentId,
        ]);
        invalidateResolutionForStoreSelector('getProductVariations');
        invalidateResolutionForStoreSelector('getProductVariationsTotalCount');
    }
    function goToVariation(id) {
        (0, navigation_1.navigateTo)({
            url: (0, navigation_1.getNewPath)({}, `/product/${parentId}/variation/${id}`),
        });
    }
    function goToNextVariation() {
        if (variationValues.nextVariationId === undefined ||
            variationValues.nextVariationId === null) {
            return false;
        }
        goToVariation(variationValues.nextVariationId);
        return true;
    }
    function goToPreviousVariation() {
        if (variationValues.previousVariationId === undefined ||
            variationValues.previousVariationId === null) {
            return false;
        }
        goToVariation(variationValues.previousVariationId);
        return true;
    }
    return {
        ...variationValues,
        invalidateVariationList,
        goToVariation,
        goToNextVariation,
        goToPreviousVariation,
    };
}
