export type SortableItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    index: number;
    isDragging?: boolean;
    isSelected?: boolean;
};
export declare const SortableItem: ({ id, children, className, isDragging, isSelected, onDragStart, onDragEnd, role, ...props }: SortableItemProps) => JSX.Element;
//# sourceMappingURL=sortable-item.d.ts.map