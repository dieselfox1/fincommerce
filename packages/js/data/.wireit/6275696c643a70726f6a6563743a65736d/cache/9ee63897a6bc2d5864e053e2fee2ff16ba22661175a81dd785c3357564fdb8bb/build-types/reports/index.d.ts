/**
 * External dependencies
 */
import { SelectFromMap } from '@automattic/data-stores';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import { State } from './reducer';
import { WPDataSelectors } from '../types';
import { PromiseifySelectors } from '../types/promiseify-selectors';
export * from './types';
export type { State };
export declare const store: import("@wordpress/data/build-types/types").StoreDescriptor<import("@wordpress/data/build-types/types").ReduxStoreConfig<unknown, typeof actions, typeof selectors>>;
export declare const REPORTS_STORE_NAME: "wc/admin/reports";
export type ReportsSelect = WPDataSelectors & Omit<SelectFromMap<typeof selectors>, 'getReportItems' | 'getReportStats'> & {
    getReportItems: <T>(...args: RemoveStateParam<typeof selectors.getReportItems<T>>) => ReturnType<typeof selectors.getReportItems<T>>;
    getReportStats: <T>(...args: RemoveStateParam<typeof selectors.getReportStats<T>>) => ReturnType<typeof selectors.getReportStats<T>>;
};
declare module '@wordpress/data' {
    function select(key: typeof STORE_NAME | typeof store): ReportsSelect;
    function resolveSelect(key: typeof STORE_NAME | typeof store): PromiseifySelectors<ReportsSelect>;
}
/**
 * Remove the state parameter from a given function type.
 */
type RemoveStateParam<F> = F extends (state: infer S, ...args: infer T) => infer R ? T : never;
//# sourceMappingURL=index.d.ts.map