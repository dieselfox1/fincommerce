/**
 * External dependencies
 */
import { Slot } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { MenuItemProps, VariationQuickUpdateSlotProps } from './types';
export declare const getGroupName: (group?: string, isMultipleSelection?: boolean) => string;
export declare const VariationQuickUpdateMenuItem: {
    ({ children, order, group, supportsMultipleSelection, onClick, ...props }: MenuItemProps): JSX.Element;
    Slot({ fillProps, group, onChange, onClose, selection, supportsMultipleSelection, }: VariationQuickUpdateSlotProps & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
//# sourceMappingURL=variation-quick-update-menu-item.d.ts.map