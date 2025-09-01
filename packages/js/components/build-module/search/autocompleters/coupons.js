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
    name: 'coupons',
    className: 'fincommerce-search__coupon-result',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 10,
            }
            : {};
        return apiFetch({
            path: addQueryArgs('/wc-analytics/coupons', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(coupon) {
        return coupon.id;
    },
    getOptionKeywords(coupon) {
        return [coupon.code];
    },
    getFreeTextOptions(query) {
        const label = (createElement("span", { key: "name", className: "fincommerce-search__result-name" }, interpolateComponents({
            mixedString: __('All coupons with codes that include {{query /}}', 'fincommerce'),
            components: {
                query: (createElement("strong", { className: "components-form-token-field__suggestion-match" }, query)),
            },
        })));
        const codeOption = {
            key: 'code',
            label,
            value: { id: query, code: query },
        };
        return [codeOption];
    },
    getOptionLabel(coupon, query) {
        const match = computeSuggestionMatch(coupon.code, query);
        return (createElement("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": coupon.code },
            match?.suggestionBeforeMatch,
            createElement("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(coupon) {
        const value = {
            key: coupon.id,
            label: coupon.code,
        };
        return value;
    },
};
export default completer;
