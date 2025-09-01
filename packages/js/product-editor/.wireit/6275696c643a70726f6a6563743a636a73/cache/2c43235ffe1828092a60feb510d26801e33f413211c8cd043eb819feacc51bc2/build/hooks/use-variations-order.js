"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVariationsOrder = void 0;
/**
 * External dependencies
 */
const components_1 = require("@fincommerce/components");
const KEY_SEPARATOR = ':';
function getVariationKey(variation) {
    return `${variation.id}${KEY_SEPARATOR}${variation.menu_order}`;
}
function getVariationId({ key }) {
    return typeof key === 'string'
        ? Number.parseInt(key.split(KEY_SEPARATOR)[0], 10)
        : 0;
}
function getVariationOrder({ key }) {
    return typeof key === 'string'
        ? Number.parseInt(key.split(KEY_SEPARATOR)[1], 10)
        : Number.MAX_SAFE_INTEGER;
}
function sort(variations, currentPage, { variationsOrder }) {
    if (!variationsOrder || !variationsOrder[currentPage])
        return variations;
    const currentPageVariationsOrder = variationsOrder[currentPage];
    return [...variations].sort((a, b) => {
        if (!currentPageVariationsOrder[a.id] ||
            !currentPageVariationsOrder[b.id])
            return 0;
        return (currentPageVariationsOrder[a.id] -
            currentPageVariationsOrder[b.id]);
    });
}
const useVariationsOrder = ({ variations, currentPage, }) => {
    const { setValue, values } = (0, components_1.useFormContext)();
    function onOrderChange(items) {
        const minOrder = Math.min(...items.map(getVariationOrder));
        setValue('variationsOrder', {
            ...values.variationsOrder,
            [currentPage]: items.reduce((prev, item, index) => {
                const id = getVariationId(item);
                return {
                    ...prev,
                    [id]: minOrder + index,
                };
            }, {}),
        });
    }
    return {
        sortedVariations: sort(variations, currentPage, values),
        getVariationKey,
        onOrderChange,
    };
};
exports.useVariationsOrder = useVariationsOrder;
