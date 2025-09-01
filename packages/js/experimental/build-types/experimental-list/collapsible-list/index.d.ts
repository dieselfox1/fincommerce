import { ListProps } from '../experimental-list';
type CollapsibleListProps = {
    collapseLabel: string;
    expandLabel: string;
    collapsed?: boolean;
    show?: number;
    onCollapse?: () => void;
    onExpand?: () => void;
    direction?: 'up' | 'down';
} & ListProps;
export declare const ExperimentalCollapsibleList: ({ children, collapsed, collapseLabel, expandLabel, show, onCollapse, onExpand, direction, ...listProps }: CollapsibleListProps) => JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map