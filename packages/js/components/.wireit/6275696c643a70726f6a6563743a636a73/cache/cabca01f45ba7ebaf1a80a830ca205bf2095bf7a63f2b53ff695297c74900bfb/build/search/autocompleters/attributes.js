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
    name: 'attributes',
    className: 'fincommerce-search__product-result',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 10,
                orderby: 'count',
            }
            : {};
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/products/attributes', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(attribute) {
        return attribute.id;
    },
    getOptionKeywords(attribute) {
        return [attribute.name];
    },
    getFreeTextOptions(query) {
        const label = ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name" }, (0, interpolate_components_1.default)({
            mixedString: (0, i18n_1.__)('All attributes with names that include {{query /}}', 'fincommerce'),
            components: {
                query: ((0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, query)),
            },
        })));
        const nameOption = {
            key: 'name',
            label,
            value: { id: query, name: query },
        };
        return [nameOption];
    },
    getOptionLabel(attribute, query) {
        const match = (0, utils_1.computeSuggestionMatch)(attribute.name, query);
        return ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": attribute.name },
            match?.suggestionBeforeMatch,
            (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(attribute) {
        const value = {
            key: attribute.id,
            label: attribute.name,
        };
        return value;
    },
};
exports.default = completer;
