"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const url_1 = require("@wordpress/url");
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const completer = {
    name: 'usernames',
    className: 'fincommerce-search__usernames-result',
    options(search) {
        const query = search
            ? {
                search,
                searchby: 'username',
                per_page: 10,
            }
            : {};
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/customers', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(customer) {
        return customer.id;
    },
    getOptionKeywords(customer) {
        return [customer.username];
    },
    getOptionLabel(customer, query) {
        const match = (0, utils_1.computeSuggestionMatch)(customer.username, query);
        return ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": customer.username },
            match?.suggestionBeforeMatch,
            (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    // This is slightly different than gutenberg/Autocomplete, we don't support different methods
    // of replace/insertion, so we can just return the value.
    getOptionCompletion(customer) {
        return {
            key: customer.id,
            label: customer.username,
        };
    },
};
exports.default = completer;
