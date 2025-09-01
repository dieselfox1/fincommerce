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
    name: 'download-ips',
    className: 'fincommerce-search__download-ip-result',
    options(match) {
        const query = match
            ? {
                match,
            }
            : {};
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/data/download-ips', query),
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
        const match = (0, utils_1.computeSuggestionMatch)(download.user_ip_address, query);
        return ((0, element_1.createElement)("span", { key: "name", className: "fincommerce-search__result-name", "aria-label": download.user_ip_address },
            match?.suggestionBeforeMatch,
            (0, element_1.createElement)("strong", { className: "components-form-token-field__suggestion-match" }, match?.suggestionMatch),
            match?.suggestionAfterMatch));
    },
    getOptionCompletion(download) {
        return {
            key: download.user_ip_address,
            label: download.user_ip_address,
        };
    },
};
exports.default = completer;
