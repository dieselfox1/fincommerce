"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productApiFetchMiddleware = void 0;
/**
 * External dependencies
 */
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
const navigation_1 = require("@fincommerce/navigation");
/**
 * Internal dependencies
 */
const is_product_editor_1 = require("./is-product-editor");
const routeMatchers = [
    {
        matcher: new RegExp('^/wp/v2/product(?!_)'),
        getReplaceString: () => '/wc/v3/products',
    },
    {
        matcher: new RegExp('^/wp/v2/product_variation'),
        replacement: '/wc/v3/products/0/variations',
        getReplaceString: () => {
            const query = (0, navigation_1.getQuery)();
            const variationMatcher = new RegExp('/product/([0-9]+)/variation/([0-9]+)');
            const matched = (query.path || '').match(variationMatcher);
            if (matched && matched.length === 3) {
                return '/wc/v3/products/' + matched[1] + '/variations';
            }
            return '/wc/v3/products/0/variations';
        },
    },
];
const productApiFetchMiddleware = () => {
    // This is needed to ensure that we use the correct namespace for the entity data store
    // without disturbing the rest_namespace outside of the product block editor.
    api_fetch_1.default.use((options, next) => {
        if (options.path && (0, is_product_editor_1.isProductEditor)()) {
            for (const { matcher, getReplaceString } of routeMatchers) {
                if (matcher.test(options.path)) {
                    options.path = options.path.replace(matcher, getReplaceString());
                    break;
                }
            }
        }
        return next(options);
    });
};
exports.productApiFetchMiddleware = productApiFetchMiddleware;
