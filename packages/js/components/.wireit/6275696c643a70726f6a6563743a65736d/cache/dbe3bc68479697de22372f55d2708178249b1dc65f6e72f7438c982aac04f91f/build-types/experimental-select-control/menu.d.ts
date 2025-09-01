/**
 * External dependencies
 */
import { Popover } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { getMenuPropsType } from './types';
type PopoverProps = React.ComponentProps<typeof Popover>;
type MenuProps = {
    children?: JSX.Element | JSX.Element[];
    getMenuProps: getMenuPropsType;
    isOpen: boolean;
    className?: string;
    position?: PopoverProps['position'];
    scrollIntoViewOnOpen?: boolean;
};
export declare const Menu: ({ children, getMenuProps, isOpen, className, position, scrollIntoViewOnOpen, }: MenuProps) => JSX.Element;
export declare const MenuSlot: () => import("react").ReactPortal;
export {};
//# sourceMappingURL=menu.d.ts.map