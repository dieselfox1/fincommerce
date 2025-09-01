/**
 * External dependencies
 */
import type { ComponentProps } from 'react';
import { Dropdown } from '@wordpress/components';
import { MouseEvent, KeyboardEvent, ReactNode } from 'react';
type CallbackProps = {
    isOpen?: boolean;
    onToggle: () => void;
    onClose?: () => void;
};
type EllipsisMenuProps = {
    /**
     * The label shown when hovering/focusing on the icon button.
     */
    label: string;
    /**
     * A function returning `MenuTitle`/`MenuItem` components as a render prop. Arguments from Dropdown passed as function arguments.
     */
    renderContent?: (props: CallbackProps) => ReactNode | JSX.Element;
    /**
     * Classname to add to ellipsis menu.
     */
    className?: string;
    /**
     * Callback function when dropdown button is clicked, it provides the click event.
     */
    onToggle?: (e: MouseEvent | KeyboardEvent) => void;
    /**
     * Placement of the dropdown menu. Default is 'bottom-start'.
     */
    placement?: ComponentProps<typeof Dropdown>['popoverProps']['placement'];
    /**
     * By default, the first menu item will receive focus. This is the same as setting this prop to "firstElement".
     * Specifying a true value will focus the container instead.
     * Specifying a false value disables the focus handling entirely
     * (this should only be done when an appropriately accessible
     * substitute behavior exists).
     *
     * @default 'firstElement'
     */
    focusOnMount?: ComponentProps<typeof Dropdown>['focusOnMount'];
};
/**
 * This is a dropdown menu hidden behind a vertical ellipsis icon. When clicked, the inner MenuItems are displayed.
 */
declare const EllipsisMenu: ({ label, renderContent, className, onToggle, placement, focusOnMount, }: EllipsisMenuProps) => JSX.Element | null;
export default EllipsisMenu;
//# sourceMappingURL=index.d.ts.map