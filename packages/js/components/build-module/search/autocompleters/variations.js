/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { createElement, Fragment } from '@wordpress/element';
import { getQuery } from '@fincommerce/navigation';
/**
 * Internal dependencies
 */
import { computeSuggestionMatch } from './utils';
import ProductImage from '../../product-image';
/**
 * Create a variation name by concatenating each of the variation's
 * attribute option strings.
 *
 * @param {Object} variation            - variation returned by the api
 * @param {Array}  variation.attributes - attribute objects, with option property.
 * @param {string} variation.name       - name of variation.
 * @return {string} - formatted variation name
 */
function getVariationName({ attributes, name, }) {
    const separator = window.wcSettings.variationTitleAttributesSeparator || ' - ';
    if (name.indexOf(separator) > -1) {
        return name;
    }
    const attributeList = attributes
        .map(({ option }) => option)
        .join(', ');
    return attributeList ? name + separator + attributeList : name;
}
const completer = {
    name: 'variations',
    className: 'fincommerce-search__product-result',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 30,
                _fields: [
                    'attributes',
                    'description',
                    'id',
                    'name',
                    'sku',
                ],
            }
            : {};
        const product = getQuery().products;
        // Product was specified, search only its variations.
        if (product) {
            if (product.includes(',')) {
                // eslint-disable-next-line no-console
                console.warn('Invalid product id supplied to Variations autocompleter');
            }
            return apiFetch({
                path: addQueryArgs(`/wc-analytics/products/${product}/variations`, query),
            });
        }
        // Product was not specified, search all variations.
        return apiFetch({
            path: addQueryArgs('/wc-analytics/variations', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(variation) {
        return variation.id;
    },
    getOptionKeywords(variation) {
        return [getVariationName(variation), variation.sku];
    },
    getOptionLabel(variation, query) {
        const match = computeSuggestionMatch(getVariationName(variation), query);
        return (createElement(Fragment, null,
            createElement(ProductImage, { key: "thumbnail", className: "fincommerce-search__result-thumbnail", product: variation, width: 18, alt: "" }),
            createElement("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": variation.description },
                match?.suggestionBeforeMatch,
                createElement("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
                match?.suggestionAfterMatch)));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(variation) {
        return {
            key: variation.id,
            label: getVariationName(variation),
        };
    },
};
export default completer;
