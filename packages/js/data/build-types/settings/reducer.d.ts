import { Reducer } from 'redux';
import { Actions } from './actions';
import { SettingsState } from './types';
declare const reducer: Reducer<SettingsState, Actions>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map