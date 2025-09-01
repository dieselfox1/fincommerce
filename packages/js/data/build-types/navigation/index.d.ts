import { SelectFromMap, DispatchFromMap } from '@automattic/data-stores';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import { State } from './reducer';
import { WPDataActions, WPDataSelectors } from '../types';
import { PromiseifySelectors } from '../types/promiseify-selectors';
export { type State };
export declare const store: import("@wordpress/data/build-types/types").StoreDescriptor<import("@wordpress/data/build-types/types").ReduxStoreConfig<unknown, typeof actions, typeof selectors>>;
export declare const NAVIGATION_STORE_NAME: "fincommerce-navigation";
declare module '@wordpress/data' {
    function dispatch(key: typeof STORE_NAME): DispatchFromMap<typeof actions & WPDataActions>;
    function select(key: typeof STORE_NAME): SelectFromMap<typeof selectors> & WPDataSelectors;
    function resolveSelect(key: typeof STORE_NAME): PromiseifySelectors<SelectFromMap<typeof selectors>>;
}
//# sourceMappingURL=index.d.ts.map