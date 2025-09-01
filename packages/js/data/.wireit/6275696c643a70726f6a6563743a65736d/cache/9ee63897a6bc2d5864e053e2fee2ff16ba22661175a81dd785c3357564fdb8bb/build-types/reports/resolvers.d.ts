import { ReportItemsEndpoint, ReportStatEndpoint, ReportQueryParams, ReportStatQueryParams, ReportItemObject, ReportStatObject } from './types';
export declare function getReportItems(endpoint: ReportItemsEndpoint, query: ReportQueryParams): Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: "SET_REPORT_ITEMS";
    resourceName: string;
    items: ReportItemObject;
} | {
    type: "SET_ITEM_ERROR";
    resourceName: string;
    error: unknown;
}, void, {
    headers: Map<string, string>;
    data: ReportItemObject["data"];
}>;
export declare function getReportStats(endpoint: ReportStatEndpoint, query: ReportStatQueryParams): Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: "SET_REPORT_STATS";
    resourceName: string;
    stats: ReportStatObject;
} | {
    type: "SET_STAT_ERROR";
    resourceName: string;
    error: unknown;
}, void, {
    headers: Map<string, string>;
    data: ReportStatObject["data"];
}>;
//# sourceMappingURL=resolvers.d.ts.map