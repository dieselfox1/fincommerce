/**
 * External dependencies
 */
/**
 * Internal dependencies
 */
import { LinkedTree } from '../types';
export declare function useKeyboard({ item, isExpanded, onExpand, onCollapse, onToggleExpand, onLastItemLoop, onFirstItemLoop, }: {
    item: LinkedTree;
    isExpanded: boolean;
    onExpand(): void;
    onCollapse(): void;
    onToggleExpand(): void;
    onLastItemLoop?(event: React.KeyboardEvent<HTMLDivElement>): void;
    onFirstItemLoop?(event: React.KeyboardEvent<HTMLDivElement>): void;
}): {
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
//# sourceMappingURL=use-keyboard.d.ts.map