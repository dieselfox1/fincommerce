type CSSTransitionProps = {
    in: boolean;
    exit: boolean;
    enter: boolean;
    onExited: () => void;
};
type ListItemProps = {
    disableGutters?: boolean;
    animation?: ListAnimation;
    className?: string;
} & Partial<CSSTransitionProps> & React.AllHTMLAttributes<HTMLElement>;
export type ListAnimation = 'slide-right' | 'none' | 'custom';
export declare const ExperimentalListItem: ({ children, disableGutters, animation, className, exit, enter, onExited, in: transitionIn, ...otherProps }: ListItemProps) => JSX.Element;
export {};
//# sourceMappingURL=experimental-list-item.d.ts.map