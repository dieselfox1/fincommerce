/**
 * External dependencies
 */
import { getQuery } from '@fincommerce/navigation';
export const isProductEditor = () => {
    const query = getQuery();
    return (query?.page === 'wc-admin' &&
        ['/add-product', '/product/'].some((path) => query?.path?.startsWith(path)));
};
