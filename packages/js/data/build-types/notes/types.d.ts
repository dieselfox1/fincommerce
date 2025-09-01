export type NoteAction = {
    id: number;
    name: string;
    label: string;
    query: string;
    status: string;
    actioned_text: string;
    nonce_action: string | null;
    nonce_name: string | null;
    url: string;
};
export type NoteStatus = 'pending' | 'unactioned' | 'actioned' | 'snoozed' | 'sent';
export type NoteType = 'error' | 'warning' | 'update' | 'info' | 'marketing' | 'survey' | 'email';
export type Note = {
    id: number;
    name: string;
    type: NoteType;
    locale: string;
    title: string;
    content: string;
    content_data: string;
    status: NoteStatus;
    source: string;
    date_created: string;
    date_created_gmt: string;
    date_reminder: string;
    date_reminder_gmt: string;
    is_snoozable: boolean;
    actions: NoteAction[];
    layout: string;
    image: string;
    is_read: boolean;
    is_deleted: boolean;
};
export type NoteQuery = Partial<{
    context: string;
    is_read: boolean;
    order: 'asc' | 'desc';
    orderby: 'note_id' | 'date' | 'type' | 'title' | 'status';
    page: number;
    per_page: number;
    type: NoteType[];
    status: NoteStatus[];
    source: string;
    _fields: keyof Note[];
}>;
export type NoteState = {
    notes: {
        [id: string]: Note;
    };
    noteQueries: {
        [query: string]: number[];
    };
    errors: {
        [selector: string]: unknown;
    };
    requesting: {
        [selector: string]: boolean;
    };
};
//# sourceMappingURL=types.d.ts.map