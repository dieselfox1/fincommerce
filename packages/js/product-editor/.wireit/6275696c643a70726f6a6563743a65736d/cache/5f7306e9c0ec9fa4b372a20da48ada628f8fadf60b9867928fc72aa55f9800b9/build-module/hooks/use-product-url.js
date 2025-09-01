/**
 * External dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { useCallback } from '@wordpress/element';
export function useProductURL(productType) {
    const [permalink] = useEntityProp('postType', productType, 'permalink');
    const getProductURL = useCallback((isPreview) => {
        if (!permalink)
            return undefined;
        const productURL = new URL(permalink);
        if (isPreview) {
            productURL.searchParams.append('preview', 'true');
        }
        return productURL.toString();
    }, [permalink]);
    return { getProductURL };
}
