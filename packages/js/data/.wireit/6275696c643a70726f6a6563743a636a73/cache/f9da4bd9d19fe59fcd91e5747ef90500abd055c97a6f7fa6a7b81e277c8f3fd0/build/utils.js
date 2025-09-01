"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceName = getResourceName;
exports.getTotalCountResourceName = getTotalCountResourceName;
exports.getResourcePrefix = getResourcePrefix;
exports.isResourcePrefix = isResourcePrefix;
exports.getResourceIdentifier = getResourceIdentifier;
exports.request = request;
exports.checkUserCapability = checkUserCapability;
/**
 * External dependencies
 */
const url_1 = require("@wordpress/url");
const data_1 = require("@wordpress/data");
const data_controls_1 = require("@wordpress/data-controls");
const controls_1 = require("./controls");
const user_1 = require("./user");
function replacer(_, value) {
    if (value) {
        if (Array.isArray(value)) {
            return [...value].sort();
        }
        if (typeof value === 'object') {
            return Object.entries(value)
                .sort()
                .reduce((current, [propKey, propVal]) => ({
                ...current,
                [propKey]: propVal,
            }), {});
        }
    }
    return value;
}
function getResourceName(prefix, ...identifier) {
    const identifierString = JSON.stringify(identifier, replacer).replace(/\\"/g, '"');
    return `${prefix}:${identifierString}`;
}
/**
 * Generate a resource name for order totals count.
 *
 * It omits query parameters from the identifier that don't affect
 * totals values like pagination and response field filtering.
 *
 * @param {string} prefix Resource name prefix.
 * @param {Object} query  Query for order totals count.
 * @return {string} Resource name for order totals.
 */
function getTotalCountResourceName(prefix, query) {
    const { _fields, page, per_page, order, orderby, ...totalsQuery } = query;
    return getResourceName(prefix, totalsQuery);
}
function getResourcePrefix(resourceName) {
    const hasPrefixIndex = resourceName.indexOf(':');
    return hasPrefixIndex < 0
        ? resourceName
        : resourceName.substring(0, hasPrefixIndex);
}
function isResourcePrefix(resourceName, prefix) {
    const resourcePrefix = getResourcePrefix(resourceName);
    return resourcePrefix === prefix;
}
function getResourceIdentifier(resourceName) {
    const identifierString = resourceName.substring(resourceName.indexOf(':') + 1);
    return JSON.parse(identifierString);
}
function* request(namespace, query) {
    const url = (0, url_1.addQueryArgs)(namespace, query);
    const isUnboundedRequest = query.per_page === -1;
    const fetch = isUnboundedRequest ? data_controls_1.apiFetch : controls_1.fetchWithHeaders;
    const response = yield fetch({
        path: url,
        method: 'GET',
    });
    if (isUnboundedRequest && !('data' in response)) {
        return { items: response, totalCount: response.length };
    }
    if (!isUnboundedRequest && 'data' in response) {
        const totalCount = parseInt(response.headers.get('x-wp-total') || '', 10);
        return { items: response.data, totalCount };
    }
}
/**
 * Utility function to check if the current user has a specific capability.
 *
 * @param {string} capability - The capability to check (e.g. 'manage_fincommerce').
 * @throws {Error} If the user does not have the required capability.
 */
function* checkUserCapability(capability) {
    const currentUser = yield data_1.controls.resolveSelect(user_1.store, 'getCurrentUser');
    if (!currentUser.capabilities[capability]) {
        throw new Error(`User does not have ${capability} capability.`);
    }
}
