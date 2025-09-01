"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const html_entities_1 = require("@wordpress/html-entities");
const element_1 = require("@wordpress/element");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const flag_1 = __importDefault(require("../../flag"));
// Cache countries to avoid repeated requests.
let allCountries = null;
const isCountries = (value) => {
    return (Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === 'object' &&
        typeof value[0].code === 'string' &&
        typeof value[0].name === 'string');
};
const completer = {
    name: 'countries',
    className: 'fincommerce-search__country-result',
    isDebounced: true,
    options() {
        // Returned cached countries if we've already received them.
        if (allCountries) {
            return Promise.resolve(allCountries);
        }
        // Make the request for country data.
        return (0, api_fetch_1.default)({ path: '/wc-analytics/data/countries' }).then((result) => {
            if (isCountries(result)) {
                // Cache the response.
                allCountries = result;
                return allCountries;
            }
            // If the response is not valid, return an empty array.
            // eslint-disable-next-line no-console
            console.warn('Invalid countries response', result);
            return [];
        });
    },
    getOptionIdentifier(country) {
        return country.code;
    },
    getSearchExpression(query) {
        return '^' + query;
    },
    getOptionKeywords(country) {
        return [country.code, (0, html_entities_1.decodeEntities)(country.name)];
    },
    getOptionLabel(country, query) {
        const name = (0, html_entities_1.decodeEntities)(country.name);
        const match = (0, utils_1.computeSuggestionMatch)(name, query);
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(flag_1.default, { key: "thumbnail", className: "fincommerce-search__result-thumbnail", code: country.code, 
                // @ts-expect-error TODO: migrate Flag component.
                size: 18, hideFromScreenReader: true }),
            (0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": name }, query ? ((0, element_1.createElement)(element_1.Fragment, null,
                match?.suggestionBeforeMatch,
                (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
                match?.suggestionAfterMatch)) : (name))));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(country) {
        const value = {
            key: country.code,
            label: (0, html_entities_1.decodeEntities)(country.name),
        };
        return value;
    },
};
exports.default = completer;
