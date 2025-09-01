import { NoteQuery, Note } from './types';
export declare function getNotes(query?: NoteQuery): Generator<{
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
} | Generator<Object, void, import("@wordpress/core-data").User<"edit"> & {
    fincommerce_meta: import("../user/types").fincommerceMeta;
    is_super_admin: boolean;
}> | {
    type: "SET_NOTES";
    notes: Note[];
} | {
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
} | {
    type: "SET_ERROR";
    error: unknown;
    selector: string;
}, void, Note[]>;
//# sourceMappingURL=resolvers.d.ts.map