import { DispatchFromMap } from '@automattic/data-stores';
import { Note, NoteQuery } from './types';
export declare function setNote(noteId: number, noteFields: Note): {
    type: "SET_NOTE";
    noteId: number;
    noteFields: Note;
};
export declare function setNoteIsUpdating(noteId: number, isUpdating: boolean): {
    type: "SET_NOTE_IS_UPDATING";
    noteId: number;
    isUpdating: boolean;
};
export declare function setNotes(notes: Note[]): {
    type: "SET_NOTES";
    notes: Note[];
};
export declare function setNotesQuery(query: NoteQuery, noteIds: number[]): {
    type: "SET_NOTES_QUERY";
    query: Partial<{
        context: string;
        is_read: boolean;
        order: "asc" | "desc";
        orderby: "note_id" | "date" | "type" | "title" | "status";
        page: number;
        per_page: number;
        type: import("./types").NoteType[];
        status: import("./types").NoteStatus[];
        source: string;
        _fields: keyof Note[];
    }>;
    noteIds: number[];
};
export declare function setError(selector: string, error: unknown): {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
};
export declare function setIsRequesting(selector: string, isRequesting: boolean): {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
};
export declare function updateNote(noteId: number, noteFields: Partial<Note>): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_NOTE";
    noteId: number;
    noteFields: Note;
} | {
    type: "SET_NOTE_IS_UPDATING";
    noteId: number;
    isUpdating: boolean;
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, void, Note>;
export declare function triggerNoteAction(noteId: number, actionId: number): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
} | Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_NOTE";
    noteId: number;
    noteFields: Note;
} | {
    type: "SET_NOTE_IS_UPDATING";
    noteId: number;
    isUpdating: boolean;
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, void, Note>, void, Note>;
export declare function removeNote(noteId: number): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_NOTE";
    noteId: number;
    noteFields: Note;
} | {
    type: "SET_NOTE_IS_UPDATING";
    noteId: number;
    isUpdating: boolean;
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, Note, Note>;
export declare function removeAllNotes(query?: {
    status?: string;
}): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_NOTES";
    notes: Note[];
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, Note[], Note[]>;
export declare function batchUpdateNotes(noteIds: string[], noteFields: Partial<Note>): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | {
    type: "SET_NOTES";
    notes: Note[];
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
} | {
    type: "SET_IS_REQUESTING";
    selector: string;
    isRequesting: boolean;
}, void, Note[]>;
export type Action = ReturnType<typeof setNote | typeof setNoteIsUpdating | typeof setNotes | typeof setNotesQuery | typeof setError | typeof setIsRequesting>;
export type ActionDispatchers = DispatchFromMap<{
    updateNote: typeof updateNote;
    triggerNoteAction: typeof triggerNoteAction;
    removeNote: typeof removeNote;
    removeAllNotes: typeof removeAllNotes;
    batchUpdateNotes: typeof batchUpdateNotes;
}>;
//# sourceMappingURL=actions.d.ts.map