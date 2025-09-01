"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProductEditor = void 0;
/**
 * External dependencies
 */
const navigation_1 = require("@fincommerce/navigation");
const isProductEditor = () => {
    const query = (0, navigation_1.getQuery)();
    return (query?.page === 'wc-admin' &&
        ['/add-product', '/product/'].some((path) => query?.path?.startsWith(path)));
};
exports.isProductEditor = isProductEditor;
