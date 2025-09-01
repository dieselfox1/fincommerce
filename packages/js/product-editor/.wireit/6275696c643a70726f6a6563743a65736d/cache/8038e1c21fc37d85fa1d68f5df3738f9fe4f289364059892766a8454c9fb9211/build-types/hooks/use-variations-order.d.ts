import type { ProductVariation } from '@fincommerce/data';
export declare const useVariationsOrder: ({ variations, currentPage, }: UseVariationsOrderInput) => UseVariationsOrderOutput;
export type UseVariationsOrderInput = {
    variations: ProductVariation[];
    currentPage: number;
};
export type UseVariationsOrderOutput = {
    sortedVariations: ProductVariation[];
    getVariationKey(variation: ProductVariation): string;
    onOrderChange(items: JSX.Element[]): void;
};
export type ProductVariationsOrder = {
    variationsOrder?: {
        [page: number]: {
            [variationId: number]: number;
        };
    };
};
//# sourceMappingURL=use-variations-order.d.ts.map