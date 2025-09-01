"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportItems = getReportItems;
exports.getReportStats = getReportStats;
/**
 * External dependencies
 */
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const controls_1 = require("../controls");
const constants_1 = require("../constants");
const actions_1 = require("./actions");
const getIntHeaderValues = (endpoint, response, keys) => {
    return keys.map((key) => {
        const value = response.headers.get(key);
        if (value === undefined) {
            throw new Error(`Malformed response from server. '${key}' header is missing when retrieving ./report/${endpoint}.`);
        }
        return parseInt(value, 10);
    });
};
function* getReportItems(endpoint, query) {
    const fetchArgs = {
        parse: false,
        path: (0, url_1.addQueryArgs)(`${constants_1.NAMESPACE}/reports/${endpoint}`, query),
    };
    if (endpoint === 'performance-indicators' && !query.stats) {
        yield (0, actions_1.setReportItems)(endpoint, query, {
            data: [],
            totalResults: 0,
            totalPages: 0,
        });
        return;
    }
    try {
        const response = yield (0, controls_1.fetchWithHeaders)(fetchArgs);
        const data = response.data;
        const [totalResults, totalPages] = getIntHeaderValues(endpoint, response, ['x-wp-total', 'x-wp-totalpages']);
        yield (0, actions_1.setReportItems)(endpoint, query, {
            data,
            totalResults,
            totalPages,
        });
    }
    catch (error) {
        yield (0, actions_1.setReportItemsError)(endpoint, query, error);
    }
}
function* getReportStats(endpoint, query) {
    const fetchArgs = {
        parse: false,
        path: (0, url_1.addQueryArgs)(`${constants_1.NAMESPACE}/reports/${endpoint}/stats`, query),
    };
    try {
        const response = yield (0, controls_1.fetchWithHeaders)(fetchArgs);
        const data = response.data;
        const [totalResults, totalPages] = getIntHeaderValues(endpoint, response, ['x-wp-total', 'x-wp-totalpages']);
        yield (0, actions_1.setReportStats)(endpoint, query, {
            data,
            totalResults,
            totalPages,
        });
    }
    catch (error) {
        yield (0, actions_1.setReportStatsError)(endpoint, query, error);
    }
}
