import { Actions } from './actions';
import { ProductFieldState } from './types';
declare const reducer: (state: ProductFieldState | undefined, payload: Actions) => ProductFieldState;
export type State = ReturnType<typeof reducer>;
export default reducer;
//# sourceMappingURL=reducer.d.ts.map