import { SortableItemProps } from '../sortable/sortable-item';
export type ListItemProps = Omit<SortableItemProps, 'index'> & {
    index?: number;
};
export declare const ListItem: ({ children, className, index, onDragStart, onDragEnd, ...props }: ListItemProps) => JSX.Element;
//# sourceMappingURL=list-item.d.ts.map