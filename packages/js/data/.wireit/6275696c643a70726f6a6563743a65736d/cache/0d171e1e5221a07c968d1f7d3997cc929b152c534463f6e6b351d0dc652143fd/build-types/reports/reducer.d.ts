/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { Action } from './actions';
import { ReportState } from './types';
declare const reducer: Reducer<ReportState, Action>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map