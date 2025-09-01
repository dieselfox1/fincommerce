"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTO_DRAFT_NAME = exports.STANDARD_RATE_TAX_CLASS_SLUG = exports.PRODUCT_VARIATION_TITLE_LIMIT = exports.UNCATEGORIZED_CATEGORY_SLUG = exports.ADD_NEW_SHIPPING_CLASS_OPTION_VALUE = exports.ONLY_ONE_DECIMAL_SEPARATOR = exports.NUMBERS_AND_DECIMAL_SEPARATOR = exports.NUMBERS_AND_ALLOWED_CHARS = void 0;
exports.NUMBERS_AND_ALLOWED_CHARS = '[^-0-9%s1%s2]';
exports.NUMBERS_AND_DECIMAL_SEPARATOR = '[^-\\d\\%s]+';
exports.ONLY_ONE_DECIMAL_SEPARATOR = '[%s](?=%s*[%s])';
// This should never be a real slug value of any existing shipping class
exports.ADD_NEW_SHIPPING_CLASS_OPTION_VALUE = '__ADD_NEW_SHIPPING_CLASS_OPTION__';
exports.UNCATEGORIZED_CATEGORY_SLUG = 'uncategorized';
exports.PRODUCT_VARIATION_TITLE_LIMIT = 32;
exports.STANDARD_RATE_TAX_CLASS_SLUG = 'standard';
exports.AUTO_DRAFT_NAME = 'AUTO-DRAFT';
