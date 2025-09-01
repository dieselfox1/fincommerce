/**
 * Get the current query string, parsed into an object, from history.
 *
 * @return {Object}  Current query object, defaults to empty object.
 */
export function getQuery(): Object;
/**
 * Return a URL with set query parameters.
 *
 * @param {Object} query        object of params to be updated.
 * @param {string} path         Relative path (defaults to current path).
 * @param {Object} currentQuery object of current query params (defaults to current querystring).
 * @param {string} page         Page key (defaults to "wc-admin")
 * @return {string}  Updated URL merging query params into existing params.
 */
export function getNewPath(query: Object, path?: string, currentQuery?: Object, page?: string): string;
/**
 * Get an array of IDs from a comma-separated query parameter.
 *
 * @param {string} [queryString=''] string value extracted from URL.
 * @return {Set<number>} List of IDs converted to a set of integers.
 */
export function getSetOfIdsFromQuery(queryString?: string): Set<number>;
/**
 * Updates the query parameters of the current page.
 *
 * @param {Object} query        object of params to be updated.
 * @param {string} path         Relative path (defaults to current path).
 * @param {Object} currentQuery object of current query params (defaults to current querystring).
 * @param {string} page         Page key (defaults to "wc-admin")
 */
export function updateQueryString(query: Object, path?: string, currentQuery?: Object, page?: string): void;
/**
 * Get an array of IDs from a comma-separated query parameter.
 *
 * @param {string} [queryString=''] string value extracted from URL.
 * @return {Array<number>} List of IDs converted to an array of unique integers.
 */
export function getIdsFromQuery(queryString?: string): Array<number>;
/**
 * Get an array of searched words given a query.
 *
 * @param {Object} query Query object.
 * @return {Array} List of search words.
 */
export function getSearchWords(query?: Object): any[];
/**
 * This function returns an event handler for the given `param`
 *
 * @param {string} param The parameter in the querystring which should be updated (ex `page`, `per_page`)
 * @param {string} path  Relative path (defaults to current path).
 * @param {string} query object of current query params (defaults to current querystring).
 * @return {Function} A callback which will update `param` to the passed value when called.
 */
export function onQueryChange(param: string, path?: string, query?: string): Function;
export { getHistory };
export * from "./filters";
export { useConfirmUnsavedChanges } from "./hooks/use-confirm-unsaved-changes";
export function getPath(): string;
export function getPersistedQuery(query?: Object): Object;
export function getQueryExcludedScreens(): any[];
export function getQueryExcludedScreensUrlUpdate(): any[];
export function getScreenFromPath(path?: Object): string;
export function addHistoryListener(listener: Function): Function;
export function pathIsExcluded(path: Object): boolean;
export function useQuery(): Record<string, string>;
export function isWCAdmin(url?: any): boolean;
export function parseAdminUrl(url: any): URL;
export function navigateTo({ url }: {
    url: string;
}): void;
import { getHistory } from './history';
//# sourceMappingURL=index.d.ts.map