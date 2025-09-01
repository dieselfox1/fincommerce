import { ReportState, ReportItemsEndpoint, ReportStatEndpoint, ReportQueryParams, ReportStatQueryParams, ReportItemObjectInfer, ReportStatObjectInfer } from './types';
export declare const getReportItemsError: (state: ReportState, endpoint: ReportItemsEndpoint, query: ReportQueryParams) => {};
export declare const getReportItems: <T>(state: ReportState, endpoint: ReportItemsEndpoint, query: ReportQueryParams) => ReportItemObjectInfer<T>;
export declare const getReportStats: <T>(state: ReportState, endpoint: ReportStatEndpoint, query: ReportStatQueryParams) => ReportStatObjectInfer<T>;
export declare const getReportStatsError: (state: ReportState, endpoint: ReportStatEndpoint, query: ReportStatQueryParams) => {};
//# sourceMappingURL=selectors.d.ts.map