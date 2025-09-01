type TaskLevel = 1 | 2 | 3;
type ActionArgs = {
    isExpanded?: boolean;
};
type TaskItemProps = {
    title: string;
    completed: boolean;
    inProgress: boolean;
    inProgressLabel: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onCollapse?: () => void;
    onDelete?: () => void;
    onDismiss?: () => void;
    onSnooze?: () => void;
    onExpand?: () => void;
    badge?: string;
    additionalInfo?: string;
    time?: string;
    content: string;
    expandable?: boolean;
    expanded?: boolean;
    showActionButton?: boolean;
    level?: TaskLevel;
    action: (event?: React.MouseEvent | React.KeyboardEvent, args?: ActionArgs) => void;
    actionLabel?: string;
    className?: string;
    children?: React.ReactNode;
};
export declare const TaskItem: ({ completed, inProgress, inProgressLabel, title, badge, onDelete, onCollapse, onDismiss, onSnooze, onExpand, onClick, additionalInfo, time, content, expandable, expanded, showActionButton, level, action, actionLabel, ...listItemProps }: TaskItemProps) => JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map