"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPageToItem = void 0;
const i18n_1 = require("@wordpress/i18n");
/**
 * The formatPageToItem function is used to format a page to an item.
 *
 * @param page - The page to format.
 * @return The formatted item.
 */
const formatPageToItem = (page) => ({
    label: (0, i18n_1.sprintf)(
    /* translators: 1: page name 2: page ID */
    (0, i18n_1.__)('%1$s (ID: %2$s)', 'fincommerce'), page.title.rendered, page.id),
    value: page.id.toString(),
});
exports.formatPageToItem = formatPageToItem;
