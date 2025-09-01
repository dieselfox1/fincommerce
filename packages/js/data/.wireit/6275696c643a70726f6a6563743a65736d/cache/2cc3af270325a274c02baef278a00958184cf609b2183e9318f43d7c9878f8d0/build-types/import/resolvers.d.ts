import { ImportStatusQuery, ImportTotalsQuery, ImportStatus, ImportTotals } from './types';
export declare function getImportStatus(query: ImportStatusQuery): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_IMPORT_STATUS";
    importStatus: ImportStatus;
    query: number;
} | {
    type: "SET_IMPORT_ERROR";
    error: unknown;
    query: string | number | ImportTotalsQuery;
}, void, ImportStatus>;
export declare function getImportTotals(query: ImportTotalsQuery): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_IMPORT_TOTALS";
    importTotals: ImportTotals;
    query: ImportTotalsQuery;
} | {
    type: "SET_IMPORT_ERROR";
    error: unknown;
    query: string | number | ImportTotalsQuery;
}, void, ImportTotals>;
//# sourceMappingURL=resolvers.d.ts.map