"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigateTo = exports.parseAdminUrl = exports.isWCAdmin = exports.useQuery = exports.pathIsExcluded = exports.addHistoryListener = exports.getScreenFromPath = exports.getQueryExcludedScreensUrlUpdate = exports.getQueryExcludedScreens = exports.getPersistedQuery = exports.getPath = exports.useConfirmUnsavedChanges = exports.getHistory = void 0;
exports.getQuery = getQuery;
exports.getNewPath = getNewPath;
exports.getSetOfIdsFromQuery = getSetOfIdsFromQuery;
exports.updateQueryString = updateQueryString;
exports.getIdsFromQuery = getIdsFromQuery;
exports.getSearchWords = getSearchWords;
exports.onQueryChange = onQueryChange;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const url_1 = require("@wordpress/url");
const qs_1 = require("qs");
const lodash_1 = require("lodash");
const hooks_1 = require("@wordpress/hooks");
const settings_1 = require("@fincommerce/settings");
/**
 * Internal dependencies
 */
const history_1 = require("./history");
Object.defineProperty(exports, "getHistory", { enumerable: true, get: function () { return history_1.getHistory; } });
// Export all filter utilities
__exportStar(require("./filters"), exports);
// Export all hooks
var use_confirm_unsaved_changes_1 = require("./hooks/use-confirm-unsaved-changes");
Object.defineProperty(exports, "useConfirmUnsavedChanges", { enumerable: true, get: function () { return use_confirm_unsaved_changes_1.useConfirmUnsavedChanges; } });
const TIME_EXCLUDED_SCREENS_FILTER = 'fincommerce_admin_time_excluded_screens';
const NAVIGATION_UPDATE_EXCLUDED_SCREENS_FILTER = 'fincommerce_admin_nav_update_excluded_screens';
/**
 * Get the current path from history.
 *
 * @return {string}  Current path.
 */
const getPath = () => (0, history_1.getHistory)().location.pathname;
exports.getPath = getPath;
/**
 * Get the current query string, parsed into an object, from history.
 *
 * @return {Object}  Current query object, defaults to empty object.
 */
function getQuery() {
    const search = (0, history_1.getHistory)().location.search;
    if (search.length) {
        return (0, qs_1.parse)(search.substring(1)) || {};
    }
    return {};
}
/**
 * Return a URL with set query parameters.
 *
 * @param {Object} query        object of params to be updated.
 * @param {string} path         Relative path (defaults to current path).
 * @param {Object} currentQuery object of current query params (defaults to current querystring).
 * @param {string} page         Page key (defaults to "wc-admin")
 * @return {string}  Updated URL merging query params into existing params.
 */
function getNewPath(query, path = (0, exports.getPath)(), currentQuery = getQuery(), page = 'wc-admin') {
    const args = { page, ...currentQuery, ...query };
    if (path !== '/') {
        args.path = path;
    }
    return (0, url_1.addQueryArgs)('admin.php', args);
}
/**
 * Gets query parameters that should persist between screens or updates
 * to reports, such as filtering.
 *
 * @param {Object} query Query containing the parameters.
 * @return {Object} Object containing the persisted queries.
 */
const getPersistedQuery = (query = getQuery()) => {
    /**
     * Filter persisted queries. These query parameters remain in the url when other parameters are updated.
     *
     * @filter fincommerce_admin_persisted_queries
     * @param {Array.<string>} persistedQueries Array of persisted queries.
     */
    const params = (0, hooks_1.applyFilters)('fincommerce_admin_persisted_queries', [
        'period',
        'compare',
        'before',
        'after',
        'interval',
        'type',
    ]);
    return (0, lodash_1.pick)(query, params);
};
exports.getPersistedQuery = getPersistedQuery;
/**
 * Get array of screens that should ignore persisted queries
 *
 * @return {Array} Array containing list of screens
 */
const getQueryExcludedScreens = () => (0, hooks_1.applyFilters)(TIME_EXCLUDED_SCREENS_FILTER, [
    'stock',
    'settings',
    'customers',
    'homescreen',
]);
exports.getQueryExcludedScreens = getQueryExcludedScreens;
/**
 * Get array of screens that should ignore nav menu URL updates.
 *
 * @return {Array} Array containing list of screens
 */
const getQueryExcludedScreensUrlUpdate = () => (0, hooks_1.applyFilters)(NAVIGATION_UPDATE_EXCLUDED_SCREENS_FILTER, ['extensions']);
exports.getQueryExcludedScreensUrlUpdate = getQueryExcludedScreensUrlUpdate;
/**
 * Retrieve a string 'name' representing the current screen
 *
 * @param {Object} path Path to resolve, default to current
 * @return {string} Screen name
 */
const getScreenFromPath = (path = (0, exports.getPath)()) => {
    return path === '/'
        ? 'homescreen'
        : path.replace('/analytics', '').replace('/', '');
};
exports.getScreenFromPath = getScreenFromPath;
/**
 * Get an array of IDs from a comma-separated query parameter.
 *
 * @param {string} [queryString=''] string value extracted from URL.
 * @return {Set<number>} List of IDs converted to a set of integers.
 */
function getSetOfIdsFromQuery(queryString = '') {
    return new Set(// Return only unique ids.
    queryString
        .split(',')
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id)));
}
/**
 * Updates the query parameters of the current page.
 *
 * @param {Object} query        object of params to be updated.
 * @param {string} path         Relative path (defaults to current path).
 * @param {Object} currentQuery object of current query params (defaults to current querystring).
 * @param {string} page         Page key (defaults to "wc-admin")
 */
function updateQueryString(query, path = (0, exports.getPath)(), currentQuery = getQuery(), page = 'wc-admin') {
    const newPath = getNewPath(query, path, currentQuery, page);
    (0, history_1.getHistory)().push(newPath);
}
/**
 * Adds a listener that runs on history change.
 *
 * @param {Function} listener Listener to add on history change.
 * @return {Function} Function to remove listeners.
 */
const addHistoryListener = (listener) => {
    // Monkey patch pushState to allow trigger the pushstate event listener.
    window.wcNavigation = window.wcNavigation ?? {};
    if (!window.wcNavigation.historyPatched) {
        ((history) => {
            const pushState = history.pushState;
            const replaceState = history.replaceState;
            history.pushState = function (state) {
                const pushStateEvent = new CustomEvent('pushstate', {
                    state,
                });
                window.dispatchEvent(pushStateEvent);
                return pushState.apply(history, arguments);
            };
            history.replaceState = function (state) {
                const replaceStateEvent = new CustomEvent('replacestate', {
                    state,
                });
                window.dispatchEvent(replaceStateEvent);
                return replaceState.apply(history, arguments);
            };
            window.wcNavigation.historyPatched = true;
        })(window.history);
    }
    window.addEventListener('popstate', listener);
    window.addEventListener('pushstate', listener);
    window.addEventListener('replacestate', listener);
    return () => {
        window.removeEventListener('popstate', listener);
        window.removeEventListener('pushstate', listener);
        window.removeEventListener('replacestate', listener);
    };
};
exports.addHistoryListener = addHistoryListener;
/**
 * Given a path, return whether it is an excluded screen
 *
 * @param {Object} path Path to check
 *
 * @return {boolean} Boolean representing whether path is excluded
 */
const pathIsExcluded = (path) => (0, exports.getQueryExcludedScreens)().includes((0, exports.getScreenFromPath)(path));
exports.pathIsExcluded = pathIsExcluded;
/**
 * Get an array of IDs from a comma-separated query parameter.
 *
 * @param {string} [queryString=''] string value extracted from URL.
 * @return {Array<number>} List of IDs converted to an array of unique integers.
 */
function getIdsFromQuery(queryString = '') {
    return [...getSetOfIdsFromQuery(queryString)];
}
/**
 * Get an array of searched words given a query.
 *
 * @param {Object} query Query object.
 * @return {Array} List of search words.
 */
function getSearchWords(query = getQuery()) {
    if (typeof query !== 'object') {
        throw new Error('Invalid parameter passed to getSearchWords, it expects an object or no parameters.');
    }
    const { search } = query;
    if (!search) {
        return [];
    }
    if (typeof search !== 'string') {
        throw new Error("Invalid 'search' type. getSearchWords expects query's 'search' property to be a string.");
    }
    return search
        .split(',')
        .map((searchWord) => searchWord.replace('%2C', ','));
}
/**
 * Like getQuery but in useHook format for easy usage in React functional components
 *
 * @return {Record<string, string>} Current query object, defaults to empty object.
 */
const useQuery = () => {
    const [queryState, setQueryState] = (0, element_1.useState)({});
    const [locationChanged, setLocationChanged] = (0, element_1.useState)(true);
    (0, element_1.useLayoutEffect)(() => {
        return (0, exports.addHistoryListener)(() => {
            setLocationChanged(true);
        });
    }, []);
    (0, element_1.useEffect)(() => {
        if (locationChanged) {
            const query = getQuery();
            setQueryState(query);
            setLocationChanged(false);
        }
    }, [locationChanged]);
    return queryState;
};
exports.useQuery = useQuery;
/**
 * This function returns an event handler for the given `param`
 *
 * @param {string} param The parameter in the querystring which should be updated (ex `page`, `per_page`)
 * @param {string} path  Relative path (defaults to current path).
 * @param {string} query object of current query params (defaults to current querystring).
 * @return {Function} A callback which will update `param` to the passed value when called.
 */
function onQueryChange(param, path = (0, exports.getPath)(), query = getQuery()) {
    switch (param) {
        case 'sort':
            return (key, dir) => updateQueryString({ orderby: key, order: dir }, path, query);
        case 'compare':
            return (key, queryParam, ids) => updateQueryString({
                [queryParam]: `compare-${key}`,
                [key]: ids,
                search: undefined,
            }, path, query);
        default:
            return (value) => updateQueryString({ [param]: value }, path, query);
    }
}
/**
 * Determines if a URL is a WC admin url.
 *
 * @param {*} url - the url to test
 * @return {boolean} true if the url is a wc-admin URL
 */
const isWCAdmin = (url = window.location.href) => {
    return /admin.php\?page=wc-admin/.test(url);
};
exports.isWCAdmin = isWCAdmin;
/**
 * Returns a parsed object for an absolute or relative admin URL.
 *
 * @param {*} url - the url to test.
 * @return {URL} - the URL object of the given url.
 */
const parseAdminUrl = (url) => {
    if (url.startsWith('http')) {
        return new URL(url);
    }
    return /^\/?[a-z0-9]+.php/i.test(url)
        ? new URL(`${window.wcSettings.adminUrl}${url}`)
        : new URL((0, settings_1.getAdminLink)(getNewPath({}, url, {})));
};
exports.parseAdminUrl = parseAdminUrl;
/**
 * A utility function that navigates to a page, using a redirect
 * or the router as appropriate.
 *
 * @param {Object} args     - All arguments.
 * @param {string} args.url - Relative path or absolute url to navigate to
 */
const navigateTo = ({ url }) => {
    const parsedUrl = (0, exports.parseAdminUrl)(url);
    if ((0, exports.isWCAdmin)() && (0, exports.isWCAdmin)(String(parsedUrl))) {
        window.document.documentElement.scrollTop = 0;
        (0, history_1.getHistory)().push(`admin.php${parsedUrl.search}`);
        return;
    }
    window.location.href = String(parsedUrl);
};
exports.navigateTo = navigateTo;
