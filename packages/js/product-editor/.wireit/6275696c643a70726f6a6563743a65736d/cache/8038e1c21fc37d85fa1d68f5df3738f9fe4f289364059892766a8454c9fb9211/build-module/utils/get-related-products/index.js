/**
 * External dependencies
 */
import { select, resolveSelect, dispatch } from '@wordpress/data';
import { productsStore } from '@fincommerce/data';
const POSTS_NUMBER_TO_RANDOMIZE = 30;
const POSTS_NUMBER_TO_PICK = 3;
const POSTS_NUMBER_TO_DISPLAY = 4;
/**
 * Return related products for a given product ID.
 * If fallbackToRandomProducts is true,
 * return random products if no related products are found.
 *
 * @param {number}                    productId - Product ID.
 * @param {getRelatedProductsOptions} options   - Options.
 * @return {Promise<Product[] | undefined>} Related products.
 */
export default async function getRelatedProducts(productId, options = {}) {
    const { getEntityRecord } = select('core');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const product = getEntityRecord('postType', 'product', productId);
    if (!product) {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let relatedProductIds = product?.related_ids;
    if (!relatedProductIds?.length) {
        if (!options?.fallbackToRandomProducts) {
            return;
        }
        // Pick the last `POSTS_NUMBER_TO_RANDOMIZE` posts
        const lastPost = (await resolveSelect('core').getEntityRecords('postType', 'product', {
            _fields: ['id'],
            per_page: POSTS_NUMBER_TO_RANDOMIZE,
        }));
        if (!lastPost?.length) {
            return;
        }
        const lastPostIds = lastPost.map((post) => post.id);
        // Pick POSTS_NUMBER_TO_PICK random post IDs
        relatedProductIds = lastPostIds
            .sort(() => Math.random() - 0.5)
            .slice(0, POSTS_NUMBER_TO_PICK);
    }
    return (await resolveSelect('core').getEntityRecords('postType', 'product', {
        include: relatedProductIds,
    }));
}
/**
 * Get suggested products for a given post ID.
 *
 *
 * @param { getSuggestedProductsForOptions } options - Options.
 * @return { Promise<Product[] | undefined> } Suggested products.
 */
export async function getSuggestedProductsFor({ postId, postType = 'product', forceRequest = false, exclude = [], }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { getEditedEntityRecord } = select('core');
    const data = getEditedEntityRecord('postType', postType, postId);
    const options = {
        categories: data?.categories
            ? data.categories.map((cat) => cat.id)
            : [],
        tags: data?.tags ? data.tags.map((tag) => tag.id) : [],
        exclude: exclude?.length ? exclude : [postId],
        limit: POSTS_NUMBER_TO_DISPLAY,
    };
    if (forceRequest) {
        await dispatch(productsStore).invalidateResolution('getSuggestedProducts', [options]);
    }
    return await resolveSelect(productsStore).getSuggestedProducts(options);
}
