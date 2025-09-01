/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { Action } from './actions';
import { NavigationState } from './types';
declare const reducer: Reducer<NavigationState, Action>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map