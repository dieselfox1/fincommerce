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
/**
 * Internal dependencies
 */
const product_1 = __importDefault(require("./product"));
const completer = {
    ...product_1.default,
    name: 'products',
    options(search) {
        const query = search
            ? {
                search,
                per_page: 10,
                orderby: 'popularity',
                type: 'variable',
            }
            : {};
        return (0, api_fetch_1.default)({
            path: (0, url_1.addQueryArgs)('/wc-analytics/products', query),
        });
    },
};
exports.default = completer;
