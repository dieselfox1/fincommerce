export type CollapsedProps = {
    initialCollapsed?: boolean;
    toggleText: string;
    persistRender?: boolean;
    children: React.ReactNode;
    hintText?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const CollapsibleContent: ({ initialCollapsed, toggleText, children, persistRender, hintText, ...props }: CollapsedProps) => JSX.Element;
//# sourceMappingURL=collapsible-content.d.ts.map