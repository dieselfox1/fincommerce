"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productEditorHeaderApiFetchMiddleware = void 0;
/**
 * External dependencies
 */
const api_fetch_1 = __importDefault(require("@wordpress/api-fetch"));
/**
 * Internal dependencies
 */
const is_product_editor_1 = require("./is-product-editor");
const productEditorHeaderApiFetchMiddleware = () => {
    // This is needed to ensure that we use the correct namespace for the entity data store
    // without disturbing the rest_namespace outside of the product block editor.
    api_fetch_1.default.use((options, next) => {
        if ((0, is_product_editor_1.isProductEditor)()) {
            options.headers = options.headers || {};
            options.headers['X-Wc-From-Product-Editor'] = '1';
        }
        return next(options);
    });
};
exports.productEditorHeaderApiFetchMiddleware = productEditorHeaderApiFetchMiddleware;
