import { PartialProduct, ProductVariation } from '@fincommerce/data';
/**
 * Labels for product stock statuses.
 */
export declare enum PRODUCT_STOCK_STATUS_KEYS {
    instock = "instock",
    onbackorder = "onbackorder",
    outofstock = "outofstock"
}
/**
 * Product stock status colors.
 */
export declare enum PRODUCT_STOCK_STATUS_CLASSES {
    instock = "green",
    onbackorder = "yellow",
    outofstock = "red"
}
/**
 * Labels for product stock statuses.
 */
export declare const PRODUCT_STOCK_STATUS_LABELS: {
    instock: string;
    onbackorder: string;
    outofstock: string;
};
/**
 * Get the product stock quantity or stock status label.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STOCK_STATUS_KEYS|number} Product stock quantity or product status key.
 */
export declare const getProductStockStatus: (product: PartialProduct | Partial<ProductVariation>) => string | number;
/**
 * Get the product stock status class.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STOCK_STATUS_CLASSES} Product stock status class.
 */
export declare const getProductStockStatusClass: (product: PartialProduct | Partial<ProductVariation>) => string;
//# sourceMappingURL=get-product-stock-status.d.ts.map