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
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const product_image_1 = __importDefault(require("../../product-image"));
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
        const product = (0, navigation_1.getQuery)().products;
        // Product was specified, search only its variations.
        if (product) {
            if (product.includes(',')) {
                // eslint-disable-next-line no-console
                console.warn('Invalid product id supplied to Variations autocompleter');
            }
            return (0, api_fetch_1.default)({
                path: (0, url_1.addQueryArgs)(`/wc-analytics/products/${product}/variations`, query),
            });
        }
        // Product was not specified, search all variations.
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/variations', query),
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
        const match = (0, utils_1.computeSuggestionMatch)(getVariationName(variation), query);
        return ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(product_image_1.default, { key: "thumbnail", className: "fincommerce-search__result-thumbnail", product: variation, width: 18, alt: "" }),
            (0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": variation.description },
                match?.suggestionBeforeMatch,
                (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
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
exports.default = completer;
