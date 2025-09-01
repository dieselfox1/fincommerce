/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { computeSuggestionMatch } from './utils';
const completer = {
    name: 'download-ips',
    className: 'fincommerce-search__download-ip-result',
    options(match) {
        const query = match
            ? {
                match,
            }
            : {};
        return apiFetch({
            path: addQueryArgs('/wc-analytics/data/download-ips', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(download) {
        return download.user_ip_address;
    },
    getOptionKeywords(download) {
        return [download.user_ip_address];
    },
    getOptionLabel(download, query) {
        const match = computeSuggestionMatch(download.user_ip_address, query);
        return (createElement("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": download.user_ip_address },
            match?.suggestionBeforeMatch,
            createElement("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    getOptionCompletion(download) {
        return {
            key: download.user_ip_address,
            label: download.user_ip_address,
        };
    },
};
export default completer;
