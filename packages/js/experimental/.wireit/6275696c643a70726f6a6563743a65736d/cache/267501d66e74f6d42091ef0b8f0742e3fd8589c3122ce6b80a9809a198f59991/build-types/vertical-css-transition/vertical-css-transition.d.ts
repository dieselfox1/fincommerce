import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
export type VerticalCSSTransitionProps<Ref extends HTMLElement | undefined = undefined> = CSSTransitionProps<Ref> & {
    defaultStyle?: React.CSSProperties;
    children: JSX.Element;
};
/**
 * VerticalCSSTransition is a wrapper for CSSTransition, automatically adding a vertical height transition.
 * The maxHeight is calculated through JS, something CSS does not support.
 */
export declare const VerticalCSSTransition: ({ children, defaultStyle, ...props }: VerticalCSSTransitionProps) => JSX.Element;
//# sourceMappingURL=vertical-css-transition.d.ts.map