import { Action } from './actions';
import { Notices } from './types';
export type State = {
    [context: string]: Notices;
};
declare const _default: (state: import("./types").State | undefined, action: Action) => import("./types").State;
export default _default;
//# sourceMappingURL=reducer.d.ts.map