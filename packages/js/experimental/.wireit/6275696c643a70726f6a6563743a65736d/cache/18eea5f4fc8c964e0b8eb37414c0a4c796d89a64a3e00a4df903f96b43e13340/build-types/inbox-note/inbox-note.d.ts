type InboxNoteAction = {
    id: number;
    url: string;
    label: string;
    primary: boolean;
    actioned_text?: boolean;
};
type InboxNote = {
    id: number;
    status: string;
    title: string;
    name: string;
    content: string;
    date_created: string;
    date_created_gmt: string;
    actions: InboxNoteAction[];
    layout: string;
    image: string;
    is_deleted: boolean;
    type: string;
    is_read: boolean;
};
type InboxNoteProps = {
    note: InboxNote;
    onDismiss?: (note: InboxNote) => void;
    onNoteActionClick?: (note: InboxNote, action: InboxNoteAction) => void;
    onBodyLinkClick?: (note: InboxNote, link: string) => void;
    onNoteVisible?: (note: InboxNote) => void;
    className?: string;
};
declare const InboxNoteCard: ({ note, onDismiss, onNoteActionClick, onBodyLinkClick, onNoteVisible, className, }: InboxNoteProps) => JSX.Element | null;
export { InboxNoteCard, InboxNote, InboxNoteAction };
//# sourceMappingURL=inbox-note.d.ts.map