"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaderTitle = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const constants_1 = require("./constants");
/**
 * Get the header title using the product name.
 *
 * @param editedProductName  Name value entered for the product.
 * @param initialProductName Name already persisted to the database.
 * @return The new title
 */
const getHeaderTitle = (editedProductName, initialProductName) => {
    const isProductNameNotEmpty = Boolean(editedProductName);
    const isProductNameDirty = editedProductName !== initialProductName;
    const isCreating = initialProductName === constants_1.AUTO_DRAFT_NAME;
    if (isProductNameNotEmpty && isProductNameDirty) {
        return editedProductName;
    }
    if (isCreating) {
        return (0, i18n_1.__)('Add new product', 'fincommerce');
    }
    return initialProductName;
};
exports.getHeaderTitle = getHeaderTitle;
