import { SortableChild } from './types';
export type SortableProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    isHorizontal?: boolean;
    onOrderChange?: (items: SortableChild[]) => void;
};
export declare const SortableContext: React.Context<object>;
export declare const Sortable: ({ children, isHorizontal, onDragEnd, onDragOver, onDragStart, onOrderChange, className, role, ...props }: SortableProps) => JSX.Element;
//# sourceMappingURL=sortable.d.ts.map