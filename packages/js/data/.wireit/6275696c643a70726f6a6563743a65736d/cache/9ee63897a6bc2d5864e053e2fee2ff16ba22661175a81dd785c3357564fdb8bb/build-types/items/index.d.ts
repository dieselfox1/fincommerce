import { SelectFromMap } from '@automattic/data-stores';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import { State } from './reducer';
import { WPDataSelectors } from '../types';
import { getItemsType } from './selectors';
import { PromiseifySelectors } from '../types/promiseify-selectors';
export * from './types';
export type { State };
export declare const store: import("@wordpress/data/build-types/types").StoreDescriptor<import("@wordpress/data/build-types/types").ReduxStoreConfig<unknown, typeof actions, typeof selectors>>;
export declare const ITEMS_STORE_NAME: "wc/admin/items";
export type ItemsSelector = Omit<SelectFromMap<typeof selectors>, 'getItems'> & {
    getItems: getItemsType;
} & WPDataSelectors;
declare module '@wordpress/data' {
    function select(key: typeof STORE_NAME | typeof store): ItemsSelector;
    function resolveSelect(key: typeof STORE_NAME | typeof store): PromiseifySelectors<ItemsSelector>;
}
//# sourceMappingURL=index.d.ts.map