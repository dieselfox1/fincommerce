"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductTitle = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Get the product title for use in the header.
 *
 * @param name          Name value entered for the product.
 * @param type          Product type.
 * @param persistedName Name already persisted to the database.
 * @return string
 */
const getProductTitle = (name, type, persistedName) => {
    if (name?.length) {
        return name;
    }
    if (persistedName && persistedName !== constants_1.AUTO_DRAFT_NAME) {
        return persistedName;
    }
    switch (type) {
        case 'simple':
            return (0, i18n_1.__)('New standard product', 'fincommerce');
        default:
            return (0, i18n_1.__)('New product', 'fincommerce');
    }
};
exports.getProductTitle = getProductTitle;
