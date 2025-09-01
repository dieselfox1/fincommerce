/**
 * External dependencies
 */
import type { Reducer } from 'redux';
import { Action } from './actions';
import { NoteState } from './types';
declare const reducer: Reducer<NoteState, Action>;
export default reducer;
export type State = ReturnType<typeof reducer>;
//# sourceMappingURL=reducer.d.ts.map