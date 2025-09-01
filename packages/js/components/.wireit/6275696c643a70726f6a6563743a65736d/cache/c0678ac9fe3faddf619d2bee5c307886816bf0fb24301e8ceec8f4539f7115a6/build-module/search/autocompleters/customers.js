/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import interpolateComponents from '@automattic/interpolate-components';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { computeSuggestionMatch } from './utils';
const completer = {
    name: 'customers',
    className: 'fincommerce-search__customers-result',
    options(name) {
        const query = name
            ? {
                search: name,
                searchby: 'name',
                per_page: 10,
            }
            : {};
        return apiFetch({
            path: addQueryArgs('/wc-analytics/customers', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(customer) {
        return customer.id;
    },
    getOptionKeywords(customer) {
        return [customer.name];
    },
    getFreeTextOptions(query) {
        const label = (createElement("span", { key: "name", className: "fincommerce-search__result-name" }, interpolateComponents({
            mixedString: __('All customers with names that include {{query /}}', 'fincommerce'),
            components: {
                query: (createElement("strong", { className: "components-form-token-field__suggestion-match" }, query)),
            },
        })));
        const nameOption = {
            key: 'name',
            label,
            value: { id: query, name: query },
        };
        return [nameOption];
    },
    getOptionLabel(customer, query) {
        const match = computeSuggestionMatch(customer.name, query);
        return (createElement("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": customer.name },
            match?.suggestionBeforeMatch,
            createElement("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(customer) {
        return {
            key: customer.id,
            label: customer.name,
        };
    },
};
export default completer;
