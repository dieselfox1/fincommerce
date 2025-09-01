/**
 * Internal dependencies
 */
import { NoteState, NoteQuery } from './types';
export declare const getNotes: ((state: NoteState, query: NoteQuery) => import("./types").Note[]) & import("rememo").EnhancedSelector;
export declare const getNotesError: (state: NoteState, selector: string) => {};
export declare const isNotesRequesting: (state: NoteState, selector: string) => boolean;
//# sourceMappingURL=selectors.d.ts.map