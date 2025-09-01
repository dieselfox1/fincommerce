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
import { computeSuggestionMatch, getTaxCode } from './utils';
const completer = {
    name: 'taxes',
    className: 'fincommerce-search__tax-result',
    options(search) {
        const query = search
            ? {
                code: search,
                per_page: 10,
            }
            : {};
        return apiFetch({
            path: addQueryArgs('/wc-analytics/taxes', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(tax) {
        return tax.id;
    },
    getOptionKeywords(tax) {
        return [tax.id, getTaxCode(tax)];
    },
    getFreeTextOptions(query) {
        const label = (createElement("span", { key: "name", className: "fincommerce-search__result-name" }, interpolateComponents({
            mixedString: __('All taxes with codes that include {{query /}}', 'fincommerce'),
            components: {
                query: (createElement("strong", { className: "components-form-token-field__suggestion-match" }, query)),
            },
        })));
        const codeOption = {
            key: 'code',
            label,
            value: { id: query, name: query },
        };
        return [codeOption];
    },
    getOptionLabel(tax, query) {
        const match = computeSuggestionMatch(getTaxCode(tax), query);
        return (createElement("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": tax.code },
            match?.suggestionBeforeMatch,
            createElement("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(tax) {
        const value = {
            key: tax.id,
            label: getTaxCode(tax),
        };
        return value;
    },
};
export default completer;
