import { Reducer } from 'redux';
import { Actions } from './actions';
import { PluginsState } from './types';
declare const reducer: Reducer<PluginsState, Actions>;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map