import { Product } from '@fincommerce/data';
export declare function useProductManager<T = Product>(postType: string): {
    isValidating: boolean;
    isDirty: any;
    isSaving: boolean;
    isPublishing: boolean;
    isTrashing: boolean;
    save: (extraProps?: Partial<T>) => Promise<T>;
    publish: (extraProps?: Partial<T>) => Promise<T>;
    trash: (force?: boolean) => Promise<T>;
    copyToDraft: () => Promise<T>;
};
//# sourceMappingURL=use-product-manager.d.ts.map