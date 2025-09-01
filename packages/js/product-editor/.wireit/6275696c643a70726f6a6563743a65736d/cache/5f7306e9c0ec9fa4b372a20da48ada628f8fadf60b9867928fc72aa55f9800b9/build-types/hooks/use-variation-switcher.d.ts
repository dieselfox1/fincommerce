type VariationSwitcherProps = {
    parentProductType?: string;
    variationId?: number;
    parentId?: number;
};
export declare function useVariationSwitcher({ variationId, parentId, parentProductType, }: VariationSwitcherProps): {
    invalidateVariationList: () => void;
    goToVariation: (id: number) => void;
    goToNextVariation: () => boolean;
    goToPreviousVariation: () => boolean;
    activeVariationIndex?: undefined;
    nextVariationIndex?: undefined;
    previousVariationIndex?: undefined;
    numberOfVariations?: undefined;
    previousVariationId?: undefined;
    nextVariationId?: undefined;
} | {
    invalidateVariationList: () => void;
    goToVariation: (id: number) => void;
    goToNextVariation: () => boolean;
    goToPreviousVariation: () => boolean;
    activeVariationIndex: any;
    nextVariationIndex: any;
    previousVariationIndex: number | null;
    numberOfVariations: any;
    previousVariationId: any;
    nextVariationId: any;
};
export {};
//# sourceMappingURL=use-variation-switcher.d.ts.map