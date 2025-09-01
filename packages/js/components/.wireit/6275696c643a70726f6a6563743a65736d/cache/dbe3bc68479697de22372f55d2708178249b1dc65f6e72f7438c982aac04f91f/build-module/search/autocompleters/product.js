/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { createElement, Fragment } from '@wordpress/element';
import interpolateComponents from '@automattic/interpolate-components';
/**
 * Internal dependencies
 */
import { computeSuggestionMatch } from './utils';
import ProductImage from '../../product-image';
const completer = {
    name: 'products',
    className: 'fincommerce-search__product-result',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 10,
                orderby: 'popularity',
            }
            : {};
        return apiFetch({
            path: addQueryArgs('/wc-analytics/products', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(product) {
        return product.id;
    },
    getOptionKeywords(product) {
        return [product.name, product.sku];
    },
    getFreeTextOptions(query) {
        const label = (createElement("span", { key: "name", className: "fincommerce-search__result-name" }, interpolateComponents({
            mixedString: __('All products with titles that include {{query /}}', 'fincommerce'),
            components: {
                query: (createElement("strong", { className: "components-form-token-field__suggestion-match" }, query)),
            },
        })));
        const titleOption = {
            key: 'title',
            label,
            value: { id: query, name: query },
        };
        return [titleOption];
    },
    getOptionLabel(product, query) {
        const match = computeSuggestionMatch(product.name, query);
        return (createElement(Fragment, null,
            createElement(ProductImage, { key: "thumbnail", className: "fincommerce-search__result-thumbnail", product: product, width: 18, alt: "" }),
            createElement("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": product.name },
                match?.suggestionBeforeMatch,
                createElement("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
                match?.suggestionAfterMatch)));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(product) {
        const value = {
            key: product.id,
            label: product.name,
        };
        return value;
    },
};
export default completer;
