"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItemsByString = searchItemsByString;
exports.getTotalCountResourceName = getTotalCountResourceName;
/**
 * Internal dependencies
 */
const utils_1 = require("../utils");
/**
 * Returns items based on a search query.
 *
 * @param {Object}   selector Instance of @wordpress/select response
 * @param {string}   endpoint Report API Endpoint
 * @param {string[]} search   Array of search strings.
 * @param {Object}   options  Query options.
 * @return {Object}   Object containing API request information and the matching items.
 */
function searchItemsByString(selector, endpoint, search, options = {}) {
    const { getItems, getItemsError, isResolving } = selector;
    const items = {};
    let isRequesting = false;
    let isError = false;
    search.forEach((searchWord) => {
        const query = {
            search: searchWord,
            per_page: 10,
            ...options,
        };
        const newItems = getItems(endpoint, query);
        newItems.forEach((item, id) => {
            items[id] = item;
        });
        if (isResolving('getItems', [endpoint, query])) {
            isRequesting = true;
        }
        if (getItemsError(endpoint, query)) {
            isError = true;
        }
    });
    return { items, isRequesting, isError };
}
/**
 * Generate a resource name for item totals count.
 *
 * It omits query parameters from the identifier that don't affect
 * totals values like pagination and response field filtering.
 *
 * @param {string} itemType Item type for totals count.
 * @param {Object} query    Query for item totals count.
 * @return {string} Resource name for item totals.
 */
function getTotalCountResourceName(itemType, query) {
    const { _fields, page, per_page, ...totalsQuery } = query;
    return (0, utils_1.getResourceName)('total-' + itemType, { ...totalsQuery });
}
