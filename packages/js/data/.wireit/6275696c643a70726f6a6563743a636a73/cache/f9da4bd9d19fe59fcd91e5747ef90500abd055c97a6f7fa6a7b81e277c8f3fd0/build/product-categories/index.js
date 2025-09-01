"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPERIMENTAL_PRODUCT_CATEGORIES_STORE_NAME = exports.store = void 0;
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
const crud_1 = require("../crud");
exports.store = (0, crud_1.createCrudDataStore)({
    storeName: constants_1.STORE_NAME,
    resourceName: 'ProductCategory',
    pluralResourceName: 'ProductCategories',
    namespace: constants_1.WC_PRODUCT_CATEGORIES_NAMESPACE,
});
exports.EXPERIMENTAL_PRODUCT_CATEGORIES_STORE_NAME = constants_1.STORE_NAME;
