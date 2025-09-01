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
const element_1 = require("@wordpress/element");
const interpolate_components_1 = __importDefault(require("@automattic/interpolate-components"));
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const product_image_1 = __importDefault(require("../../product-image"));
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
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/products', query),
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
        const label = ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name" }, (0, interpolate_components_1.default)({
            mixedString: (0, i18n_1.__)('All products with titles that include {{query /}}', 'fincommerce'),
            components: {
                query: ((0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, query)),
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
        const match = (0, utils_1.computeSuggestionMatch)(product.name, query);
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(product_image_1.default, { key: "thumbnail", className: "fincommerce-search__result-thumbnail", product: product, width: 18, alt: "" }),
            (0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": product.name },
                match?.suggestionBeforeMatch,
                (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
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
exports.default = completer;
