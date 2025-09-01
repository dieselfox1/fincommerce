type InboxNoteActionProps = {
    onClick: () => void;
    label: string;
    href?: string;
    preventBusyState?: boolean;
    variant: 'link' | 'secondary';
};
/**
 * Renders a secondary button that can also be a link. If href is provided it will
 * automatically open it in a new tab/window.
 */
export declare const InboxNoteActionButton: ({ label, onClick, href, preventBusyState, variant, }: InboxNoteActionProps) => JSX.Element;
export {};
//# sourceMappingURL=action.d.ts.map