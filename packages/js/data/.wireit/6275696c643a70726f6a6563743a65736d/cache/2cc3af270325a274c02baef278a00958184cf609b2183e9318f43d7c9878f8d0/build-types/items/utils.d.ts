import { ItemInfer, ItemType, Query } from './types';
import { ItemsSelector } from './';
/**
 * Returns items based on a search query.
 *
 * @param {Object}   selector Instance of @wordpress/select response
 * @param {string}   endpoint Report API Endpoint
 * @param {string[]} search   Array of search strings.
 * @param {Object}   options  Query options.
 * @return {Object}   Object containing API request information and the matching items.
 */
export declare function searchItemsByString<T extends ItemType>(selector: ItemsSelector, endpoint: T, search: string[], options?: Query): {
    items: Record<number, ItemInfer<T> | undefined>;
    isRequesting: boolean;
    isError: boolean;
};
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
export declare function getTotalCountResourceName(itemType: string, query: Query): string;
//# sourceMappingURL=utils.d.ts.map