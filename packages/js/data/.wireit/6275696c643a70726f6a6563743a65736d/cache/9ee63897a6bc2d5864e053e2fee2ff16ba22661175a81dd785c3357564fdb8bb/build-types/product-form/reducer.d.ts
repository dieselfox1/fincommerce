/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { Action } from './actions';
import { ProductFormState } from './types';
declare const reducer: Reducer<ProductFormState, Action>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map