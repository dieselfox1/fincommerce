import { SelectFromMap, DispatchFromMap } from '@automattic/data-stores';
import * as actions from './actions';
import * as selectors from './selectors';
export * from './types';
export declare const STORE_NAME = "core/notices2";
declare const _default: any;
export default _default;
declare module '@wordpress/data' {
    function dispatch(key: typeof STORE_NAME): DispatchFromMap<typeof actions>;
    function select(key: typeof STORE_NAME): SelectFromMap<typeof selectors>;
}
//# sourceMappingURL=index.d.ts.map