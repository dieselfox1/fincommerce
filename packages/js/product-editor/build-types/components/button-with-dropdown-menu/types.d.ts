/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import type { DropdownOption } from '@wordpress/components';
type PositionYAxis = 'top' | 'middle' | 'bottom';
type PositionXAxis = 'left' | 'center' | 'right';
type PositionCorner = 'top' | 'right' | 'bottom' | 'left';
export type PopoverPlacement = 'left' | 'right' | 'bottom' | 'top' | 'left-end' | 'left-start' | 'right-end' | 'right-start' | 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
export type PopoverPosition = `${PositionYAxis}` | `${PositionYAxis} ${PositionXAxis}` | `${PositionYAxis} ${PositionXAxis} ${PositionCorner}`;
export type PopoverProps = {
    placement?: PopoverPlacement;
    position?: PopoverPosition;
    offset?: number;
};
export type ButtonWithDropdownMenuProps = {
    className?: string;
    href?: string;
    dropdownButtonLabel?: string;
    defaultOpen?: boolean;
    controls?: DropdownOption[];
    popoverProps?: PopoverProps;
    renderMenu?: (props: {
        onClose: () => void;
    }) => React.ReactNode;
    onToggle?: (isOpen: boolean) => void;
} & Extract<React.ComponentProps<typeof Button>, {
    disabled?: boolean;
}>;
export {};
//# sourceMappingURL=types.d.ts.map