/**
 * Internal dependencies
 */
import type { ListAnimation } from './experimental-list-item';
type ListType = 'ol' | 'ul';
export type ListProps = {
    listType?: ListType;
    animation?: ListAnimation;
} & React.HTMLAttributes<HTMLElement>;
export declare const ExperimentalList: ({ children, listType, animation, ...otherProps }: ListProps) => JSX.Element;
export {};
//# sourceMappingURL=experimental-list.d.ts.map