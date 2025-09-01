import { PartialProduct } from '@fincommerce/data';
/**
 * Labels for product statuses.
 */
export declare enum PRODUCT_STATUS_KEYS {
    unsaved = "unsaved",
    draft = "draft",
    instock = "instock",
    outofstock = "outofstock"
}
/**
 * Labels for product statuses.
 */
export declare const PRODUCT_STATUS_LABELS: {
    unsaved: string;
    draft: string;
    instock: string;
    outofstock: string;
};
/**
 * Get the product status for use in the header.
 *
 * @param  product Product instance.
 * @return {PRODUCT_STATUS_KEYS} Product status key.
 */
export declare const getProductStatus: (product: PartialProduct | undefined) => PRODUCT_STATUS_KEYS;
//# sourceMappingURL=get-product-status.d.ts.map