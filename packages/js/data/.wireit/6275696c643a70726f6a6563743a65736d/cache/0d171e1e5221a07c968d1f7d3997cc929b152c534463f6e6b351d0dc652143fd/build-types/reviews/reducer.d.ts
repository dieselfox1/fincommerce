/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { Action } from './actions';
import { ReviewsState } from './types';
declare const reducer: Reducer<ReviewsState, Action>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map