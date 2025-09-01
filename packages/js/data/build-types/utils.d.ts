/**
 * Internal dependencies
 */
import { BaseQueryParams } from './types/query-params';
export declare function getResourceName(prefix: string, ...identifier: unknown[]): string;
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
export declare function getTotalCountResourceName(prefix: string, query: Record<string, unknown>): string;
export declare function getResourcePrefix(resourceName: string): string;
export declare function isResourcePrefix(resourceName: string, prefix: string): boolean;
export declare function getResourceIdentifier(resourceName: string): any;
export declare function request<Query extends BaseQueryParams, DataType>(namespace: string, query: Partial<Query>): Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    items: DataType[];
    totalCount: number;
} | undefined, DataType[] | ({
    data: DataType[];
} & Response)>;
/**
 * Utility function to check if the current user has a specific capability.
 *
 * @param {string} capability - The capability to check (e.g. 'manage_fincommerce').
 * @throws {Error} If the user does not have the required capability.
 */
export declare function checkUserCapability(capability: string): Generator<Object, void, import("@wordpress/core-data").User<"edit"> & {
    fincommerce_meta: import("./user/types").fincommerceMeta;
    is_super_admin: boolean;
}>;
//# sourceMappingURL=utils.d.ts.map