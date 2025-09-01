"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductVariationsHelper = useProductVariationsHelper;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const navigation_1 = require("@fincommerce/navigation");
const data_2 = require("@fincommerce/data");
const hooks_1 = require("@wordpress/hooks");
const core_data_1 = require("@wordpress/core-data");
async function getDefaultVariationValues(productId) {
    try {
        // @ts-expect-error TODO react-18-upgrade: core.getEntityRecord type is not typed yet
        const { attributes } = await (0, data_1.resolveSelect)('core').getEntityRecord('postType', 'product', productId);
        const alreadyHasVariableAttribute = attributes.some((attr) => attr.variation);
        if (!alreadyHasVariableAttribute) {
            return {};
        }
        const products = await (0, data_1.resolveSelect)(data_2.experimentalProductVariationsStore).getProductVariations({
            product_id: productId,
            per_page: 1,
            has_price: true,
        });
        if (products && products.length > 0 && products[0].regular_price) {
            return {
                regular_price: products[0].regular_price,
                stock_quantity: products[0].stock_quantity ?? undefined,
                stock_status: products[0].stock_status,
                manage_stock: products[0].manage_stock,
                low_stock_amount: products[0].low_stock_amount ?? undefined,
            };
        }
        return {};
    }
    catch {
        return {};
    }
}
function useProductVariationsHelper() {
    const [productId] = (0, core_data_1.useEntityProp)('postType', 'product', 'id');
    const { editedRecord: product } = (0, core_data_1.useEntityRecord)('postType', 'product', productId);
    const [_isGenerating, setIsGenerating] = (0, element_1.useState)(false);
    const { isGeneratingVariations, generateError } = (0, data_1.useSelect)((select) => {
        const { isGeneratingVariations: getIsGeneratingVariations, generateProductVariationsError, } = select(data_2.experimentalProductVariationsStore);
        return {
            isGeneratingVariations: getIsGeneratingVariations({
                product_id: productId,
            }),
            generateError: generateProductVariationsError({
                product_id: productId,
            }),
        };
    }, [productId]);
    const isGenerating = (0, element_1.useMemo)(() => _isGenerating || Boolean(isGeneratingVariations), [_isGenerating, isGeneratingVariations]);
    const generateProductVariations = (0, element_1.useCallback)(async function onGenerate(attributes, defaultAttributes) {
        setIsGenerating(true);
        // @ts-expect-error TODO react-18-upgrade: core.getEntityRecord type is not typed yet
        const { status: lastStatus, variations } = await (0, data_1.resolveSelect)('core').getEditedEntityRecord('postType', 'product', productId);
        const hasVariableAttribute = attributes.some((attr) => attr.variation);
        const defaultVariationValues = await getDefaultVariationValues(productId);
        await Promise.all(variations.map((variationId) => 
        // @ts-expect-error invalidateResolution is not typed correctly because we are overriding the type definition. https://github.com/dieselfox1/fincommerce/blob/eeaf58e20064d837412d6c455e69cc5a5e2678b4/packages/js/product-editor/typings/index.d.ts#L15-L35
        (0, data_1.dispatch)(core_data_1.store).invalidateResolution('getEntityRecord', [
            'postType',
            'product_variation',
            variationId,
        ])));
        await (0, data_1.dispatch)(data_2.experimentalProductVariationsStore).invalidateResolutionForStore();
        /**
         * Filters the meta_data array for generated variations.
         *
         * @filter fincommerce.product.variations.generate.meta_data
         * @param {Object} product Main product object.
         * @return {Object} meta_data array for variations.
         */
        const meta_data = (0, hooks_1.applyFilters)('fincommerce.product.variations.generate.meta_data', [], product);
        return (0, data_1.dispatch)(data_2.experimentalProductVariationsStore)
            .generateProductVariations({
            product_id: productId,
        }, {
            type: hasVariableAttribute ? 'variable' : 'simple',
            attributes,
            default_attributes: defaultAttributes,
        }, {
            delete: true,
            default_values: defaultVariationValues,
            meta_data: meta_data,
        })
            .then(async (response) => {
            // @ts-expect-error invalidateResolution is not typed correctly because we are overriding the type definition. https://github.com/dieselfox1/fincommerce/blob/eeaf58e20064d837412d6c455e69cc5a5e2678b4/packages/js/product-editor/typings/index.d.ts#L15-L35
            await (0, data_1.dispatch)(core_data_1.store).invalidateResolution('getEntityRecord', ['postType', 'product', productId]);
            await (0, data_1.resolveSelect)(core_data_1.store).getEntityRecord('postType', 'product', productId);
            await (0, data_1.dispatch)(data_2.experimentalProductVariationsStore).invalidateResolutionForStore();
            return response;
        })
            .finally(() => {
            setIsGenerating(false);
            if (lastStatus === 'auto-draft' &&
                (0, navigation_1.getPath)().endsWith('add-product')) {
                const url = (0, navigation_1.getNewPath)({}, `/product/${productId}`);
                (0, navigation_1.navigateTo)({ url });
            }
        });
    }, []);
    return {
        generateProductVariations,
        isGenerating,
        generateError,
    };
}
