"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderResourceName = getOrderResourceName;
exports.getTotalOrderCountResourceName = getTotalOrderCountResourceName;
/**
 * Internal dependencies
 */
const utils_1 = require("../utils");
const PRODUCT_PREFIX = 'order';
/**
 * Generate a resource name for orders.
 *
 * @param {Object} query Query for orders.
 * @return {string} Resource name for orders.
 */
function getOrderResourceName(query) {
    return (0, utils_1.getResourceName)(PRODUCT_PREFIX, query);
}
/**
 * Generate a resource name for order totals count.
 *
 * It omits query parameters from the identifier that don't affect
 * totals values like pagination and response field filtering.
 *
 * @param {Object} query Query for order totals count.
 * @return {string} Resource name for order totals.
 */
function getTotalOrderCountResourceName(query) {
    const { _fields, page, per_page, ...totalsQuery } = query;
    return getOrderResourceName(totalsQuery);
}
