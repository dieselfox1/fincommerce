/**
 * External dependencies
 */
import { appendTimestamp, getCurrentDates } from '@fincommerce/date';
import { store as itemsStore } from './';
/**
 * Returns leaderboard data to render a leaderboard table.
 *
 * @param {Object} options                  arguments
 * @param {string} options.id               Leaderboard ID
 * @param {number} options.per_page         Per page limit
 * @param {Object} options.persisted_query  Persisted query passed to endpoint
 * @param {Object} options.query            Query parameters in the url
 * @param {Object} options.filterQuery      Query parameters to filter the leaderboard
 * @param {Object} options.select           Instance of @wordpress/select
 * @param {string} options.defaultDateRange User specified default date range.
 * @return {Object} Object containing leaderboard responses.
 */
export function getLeaderboard(options) {
    const endpoint = 'leaderboards';
    const { per_page: perPage, persisted_query: persistedQuery, query, select, filterQuery, } = options;
    const { getItems, getItemsError, isResolving } = select(itemsStore);
    const response = {
        isRequesting: false,
        isError: false,
        rows: [],
    };
    const datesFromQuery = getCurrentDates(query, options.defaultDateRange);
    const leaderboardQuery = {
        ...filterQuery,
        after: appendTimestamp(datesFromQuery.primary.after, 'start'),
        before: appendTimestamp(datesFromQuery.primary.before, 'end'),
        per_page: perPage,
        persisted_query: JSON.stringify(persistedQuery),
    };
    // Disable eslint rule requiring `getItems` to be defined below because the next two statements
    // depend on `getItems` to have been called.
    // eslint-disable-next-line @wordpress/no-unused-vars-before-return
    const leaderboards = getItems(endpoint, leaderboardQuery);
    if (isResolving('getItems', [endpoint, leaderboardQuery])) {
        return { ...response, isRequesting: true };
    }
    else if (getItemsError(endpoint, leaderboardQuery)) {
        return { ...response, isError: true };
    }
    const leaderboard = leaderboards.get(options.id);
    return { ...response, rows: leaderboard?.rows };
}
