import type { PartialProduct, Product } from '@fincommerce/data';
type getRelatedProductsOptions = {
    fallbackToRandomProducts?: boolean;
};
/**
 * Return related products for a given product ID.
 * If fallbackToRandomProducts is true,
 * return random products if no related products are found.
 *
 * @param {number}                    productId - Product ID.
 * @param {getRelatedProductsOptions} options   - Options.
 * @return {Promise<Product[] | undefined>} Related products.
 */
export default function getRelatedProducts(productId: number, options?: getRelatedProductsOptions): Promise<Product[] | undefined>;
type getSuggestedProductsForOptions = {
    postId: number;
    postType?: 'product' | 'post' | 'page';
    forceRequest?: boolean;
    exclude?: number[];
};
/**
 * Get suggested products for a given post ID.
 *
 *
 * @param { getSuggestedProductsForOptions } options - Options.
 * @return { Promise<Product[] | undefined> } Suggested products.
 */
export declare function getSuggestedProductsFor({ postId, postType, forceRequest, exclude, }: getSuggestedProductsForOptions): Promise<PartialProduct[] | undefined>;
export {};
//# sourceMappingURL=index.d.ts.map