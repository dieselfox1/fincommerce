/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */
import { fetchWithHeaders } from '../controls';
import { NAMESPACE } from '../constants';
import { setReportItemsError, setReportStatsError, setReportItems, setReportStats, } from './actions';
const getIntHeaderValues = (endpoint, response, keys) => {
    return keys.map((key) => {
        const value = response.headers.get(key);
        if (value === undefined) {
            throw new Error(`Malformed response from server. '${key}' header is missing when retrieving ./report/${endpoint}.`);
        }
        return parseInt(value, 10);
    });
};
export function* getReportItems(endpoint, query) {
    const fetchArgs = {
        parse: false,
        path: addQueryArgs(`${NAMESPACE}/reports/${endpoint}`, query),
    };
    if (endpoint === 'performance-indicators' && !query.stats) {
        yield setReportItems(endpoint, query, {
            data: [],
            totalResults: 0,
            totalPages: 0,
        });
        return;
    }
    try {
        const response = yield fetchWithHeaders(fetchArgs);
        const data = response.data;
        const [totalResults, totalPages] = getIntHeaderValues(endpoint, response, ['x-wp-total', 'x-wp-totalpages']);
        yield setReportItems(endpoint, query, {
            data,
            totalResults,
            totalPages,
        });
    }
    catch (error) {
        yield setReportItemsError(endpoint, query, error);
    }
}
export function* getReportStats(endpoint, query) {
    const fetchArgs = {
        parse: false,
        path: addQueryArgs(`${NAMESPACE}/reports/${endpoint}/stats`, query),
    };
    try {
        const response = yield fetchWithHeaders(fetchArgs);
        const data = response.data;
        const [totalResults, totalPages] = getIntHeaderValues(endpoint, response, ['x-wp-total', 'x-wp-totalpages']);
        yield setReportStats(endpoint, query, {
            data,
            totalResults,
            totalPages,
        });
    }
    catch (error) {
        yield setReportStatsError(endpoint, query, error);
    }
}
