/**
 * External dependencies
 */
import { PartialProductVariation, ProductProductAttribute, ProductVariation } from '@fincommerce/data';
import { UseVariationsProps } from './types';
export declare function useVariations({ productId }: UseVariationsProps): {
    isLoading: boolean;
    variations: ProductVariation[];
    totalCount: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    onFilter: (attribute: ProductProductAttribute) => (options: string[]) => void;
    getFilters: (attribute: ProductProductAttribute) => string[];
    hasFilters: () => boolean;
    clearFilters: () => Promise<void>;
    selected: ProductVariation[];
    isSelectingAll: boolean;
    selectedCount: number;
    areAllSelected: boolean;
    areSomeSelected: boolean;
    isSelected: (variation: ProductVariation) => boolean;
    onSelect: (variation: ProductVariation) => (checked: boolean) => void;
    onSelectPage: (checked: boolean) => void;
    onSelectAll: () => Promise<number>;
    onClearSelection: () => void;
    isUpdating: Record<number, boolean>;
    onUpdate: ({ id: variationId, ...variation }: PartialProductVariation) => Promise<ProductVariation | undefined>;
    onDelete: (variationId: number) => Promise<ProductVariation | undefined>;
    onBatchUpdate: (values: PartialProductVariation[]) => Promise<{
        update: ProductVariation[];
    }>;
    onBatchDelete: (values: PartialProductVariation[]) => Promise<{
        delete: ProductVariation[];
    }>;
    isGenerating: boolean;
    onGenerate: (attributes: import("../../../hooks/use-product-attributes").EnhancedProductAttribute[], defaultAttributes?: import("@fincommerce/data").ProductDefaultAttribute[]) => Promise<import("@fincommerce/data/build-types/crud/types").Item>;
    variationsError: unknown;
    getCurrentVariations: () => void;
};
//# sourceMappingURL=use-variations.d.ts.map