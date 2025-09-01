import { Product, ProductStatus, ReadOnlyProperties } from '@fincommerce/data';
export declare function useProductHelper(): {
    createProductWithStatus: (product: Omit<Product, ReadOnlyProperties>, status: ProductStatus, skipNotice?: boolean) => Promise<any>;
    updateProductWithStatus: (productId: number, product: Partial<Product>, status: ProductStatus, skipNotice?: boolean) => Promise<Product>;
    copyProductWithStatus: (product: Product, status?: ProductStatus) => Promise<any>;
    deleteProductAndRedirect: (id: number) => Promise<any>;
    sanitizePrice: (price: string) => string;
    formatNumber: (value: string) => string;
    parseNumber: (value: string) => string;
    isUpdatingDraft: boolean;
    isUpdatingPublished: boolean;
    isDeleting: boolean;
};
//# sourceMappingURL=use-product-helper.d.ts.map