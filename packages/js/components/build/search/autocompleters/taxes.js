"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const url_1 = require("@wordpress/url");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const interpolate_components_1 = __importDefault(require("@automattic/interpolate-components"));
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
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
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/taxes', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(tax) {
        return tax.id;
    },
    getOptionKeywords(tax) {
        return [tax.id, (0, utils_1.getTaxCode)(tax)];
    },
    getFreeTextOptions(query) {
        const label = ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name" }, (0, interpolate_components_1.default)({
            mixedString: (0, i18n_1.__)('All taxes with codes that include {{query /}}', 'fincommerce'),
            components: {
                query: ((0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, query)),
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
        const match = (0, utils_1.computeSuggestionMatch)((0, utils_1.getTaxCode)(tax), query);
        return ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": tax.code },
            match?.suggestionBeforeMatch,
            (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(tax) {
        const value = {
            key: tax.id,
            label: (0, utils_1.getTaxCode)(tax),
        };
        return value;
    },
};
exports.default = completer;
