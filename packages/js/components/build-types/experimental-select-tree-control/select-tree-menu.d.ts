/**
 * External dependencies
 */
import { Popover } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { LinkedTree, TreeControlProps } from '../experimental-tree-control';
type PopoverProps = React.ComponentProps<typeof Popover>;
type MenuProps = {
    isEventOutside: (event: React.SyntheticEvent) => boolean;
    isOpen: boolean;
    isLoading?: boolean;
    position?: PopoverProps['position'];
    scrollIntoViewOnOpen?: boolean;
    highlightedIndex?: number;
    items: LinkedTree[];
    treeRef?: React.ForwardedRef<HTMLOListElement>;
    onClose?: () => void;
} & Omit<TreeControlProps, 'items'>;
export declare const SelectTreeMenu: ({ isEventOutside, isLoading, isOpen, className, position, scrollIntoViewOnOpen, items, treeRef: ref, onClose, onEscape, shouldShowCreateButton, onFirstItemLoop, onExpand, ...props }: MenuProps) => JSX.Element;
export {};
//# sourceMappingURL=select-tree-menu.d.ts.map