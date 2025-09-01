/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */
import productsAutocompleter from './product';
const completer = {
    ...productsAutocompleter,
    name: 'products',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 10,
                orderby: 'popularity',
                type: 'variable',
            }
            : {};
        return apiFetch({
            path: addQueryArgs('/wc-analytics/products', query),
        });
    },
};
export default completer;
