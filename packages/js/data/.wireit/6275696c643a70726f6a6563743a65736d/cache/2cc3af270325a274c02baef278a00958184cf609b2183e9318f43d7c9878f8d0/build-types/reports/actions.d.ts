import { ReportItemsEndpoint, ReportStatEndpoint, ReportQueryParams, ReportStatQueryParams, ReportItemObject, ReportStatObject } from './types';
export declare function setReportItemsError(endpoint: ReportItemsEndpoint, query: ReportQueryParams, error: unknown): {
    type: "SET_ITEM_ERROR";
    resourceName: string;
    error: unknown;
};
export declare function setReportItems(endpoint: ReportItemsEndpoint, query: ReportQueryParams, items: ReportItemObject): {
    type: "SET_REPORT_ITEMS";
    resourceName: string;
    items: ReportItemObject;
};
export declare function setReportStats(endpoint: ReportStatEndpoint, query: ReportStatQueryParams, stats: ReportStatObject): {
    type: "SET_REPORT_STATS";
    resourceName: string;
    stats: ReportStatObject;
};
export declare function setReportStatsError(endpoint: ReportStatEndpoint, query: ReportStatQueryParams, error: unknown): {
    type: "SET_STAT_ERROR";
    resourceName: string;
    error: unknown;
};
export type Action = ReturnType<typeof setReportItems | typeof setReportItemsError | typeof setReportStats | typeof setReportStatsError>;
//# sourceMappingURL=actions.d.ts.map