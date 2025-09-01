import { select as wpSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { Query } from './types';
type Options = {
    id: number;
    per_page: number;
    persisted_query: Query;
    filterQuery: Query;
    query: {
        [key: string]: string | undefined;
    };
    select: typeof wpSelect;
    defaultDateRange: string;
};
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
export declare function getLeaderboard(options: Options): {
    isRequesting: boolean;
    isError: boolean;
    rows: never[];
} | {
    rows: {
        display: string;
        value: string;
    } | undefined;
    isRequesting: boolean;
    isError: boolean;
};
export {};
//# sourceMappingURL=store-aware-utils.d.ts.map