/**
 * Internal dependencies
 */
import { ImportState, ImportStatusQuery, ImportTotalsQuery } from './types';
export declare const getImportStarted: (state: ImportState) => {
    activeImport: boolean;
    lastImportStartTimestamp: number;
};
export declare const getFormSettings: (state: ImportState) => {
    period: {
        date: string;
        label: string;
    };
    skipPrevious: boolean;
};
export declare const getImportStatus: (state: ImportState, query: ImportStatusQuery) => import("./types").ImportStatus;
export declare const getImportTotals: (state: ImportState, query: ImportTotalsQuery) => {
    lastImportStartTimestamp: number;
    orders: number;
    customers: number;
};
export declare const getImportError: (state: ImportState, query: ImportTotalsQuery | ImportStatusQuery | string) => {};
//# sourceMappingURL=selectors.d.ts.map