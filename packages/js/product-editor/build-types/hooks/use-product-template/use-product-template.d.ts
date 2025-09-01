/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
/**
 * Internal dependencies
 */
import { ProductTemplate } from '../../types';
export declare const useProductTemplate: (productTemplateId: string | undefined, product: Partial<Product> | null) => {
    productTemplate: null;
    isResolving: boolean;
} | {
    productTemplate: ProductTemplate | undefined;
    isResolving: boolean;
};
//# sourceMappingURL=use-product-template.d.ts.map