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
    name: 'coupons',
    className: 'fincommerce-search__coupon-result',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 10,
            }
            : {};
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/coupons', query),
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
        const label = ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name" }, (0, interpolate_components_1.default)({
            mixedString: (0, i18n_1.__)('All coupons with codes that include {{query /}}', 'fincommerce'),
            components: {
                query: ((0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, query)),
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
        const match = (0, utils_1.computeSuggestionMatch)(coupon.code, query);
        return ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": coupon.code },
            match?.suggestionBeforeMatch,
            (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
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
exports.default = completer;
