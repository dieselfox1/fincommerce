import { ProductDefaultAttribute } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { EnhancedProductAttribute } from './use-product-attributes';
export declare function useProductVariationsHelper(): {
    generateProductVariations: (attributes: EnhancedProductAttribute[], defaultAttributes?: ProductDefaultAttribute[]) => Promise<import("@fincommerce/data/build-types/crud/types").Item>;
    isGenerating: boolean;
    generateError: unknown;
};
//# sourceMappingURL=use-product-variations-helper.d.ts.map