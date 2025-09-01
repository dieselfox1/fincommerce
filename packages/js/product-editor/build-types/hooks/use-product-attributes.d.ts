/**
 * External dependencies
 */
import { type ProductProductAttribute, ProductAttributeTerm, ProductDefaultAttribute } from '@fincommerce/data';
export type EnhancedProductAttribute = ProductProductAttribute & {
    isDefault?: boolean;
    terms?: ProductAttributeTerm[];
    visible?: boolean;
};
type useProductAttributesProps = {
    allAttributes: ProductProductAttribute[];
    isVariationAttributes?: boolean;
    onChange: (attributes: ProductProductAttribute[], defaultAttributes: ProductDefaultAttribute[]) => void;
    productId?: number;
};
export declare function useProductAttributes({ allAttributes, isVariationAttributes, onChange, productId, }: useProductAttributesProps): {
    attributes: EnhancedProductAttribute[];
    fetchAttributes: () => void;
    handleChange: (newAttributes: EnhancedProductAttribute[]) => void;
    setAttributes: import("react").Dispatch<import("react").SetStateAction<EnhancedProductAttribute[]>>;
};
export {};
//# sourceMappingURL=use-product-attributes.d.ts.map