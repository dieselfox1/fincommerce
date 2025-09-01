/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { Action } from './actions';
import { CountriesState } from './types';
declare const reducer: Reducer<CountriesState, Action>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map