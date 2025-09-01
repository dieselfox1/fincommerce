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
    name: 'orders',
    className: 'fincommerce-search__order-result',
    options(search) {
        const query = search
            ? {
                number: search,
                per_page: 10,
            }
            : {};
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/orders', query),
        });
    },
    isDebounced: true,
    getOptionIdentifier(order) {
        return order.id;
    },
    getOptionKeywords(order) {
        return ['#' + order.number];
    },
    getOptionLabel(order, query) {
        const match = (0, utils_1.computeSuggestionMatch)('#' + order.number, query);
        return ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": '#' + order.number },
            match?.suggestionBeforeMatch,
            (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    getOptionCompletion(order) {
        return {
            key: order.id,
            label: '#' + order.number,
        };
    },
};
exports.default = completer;
