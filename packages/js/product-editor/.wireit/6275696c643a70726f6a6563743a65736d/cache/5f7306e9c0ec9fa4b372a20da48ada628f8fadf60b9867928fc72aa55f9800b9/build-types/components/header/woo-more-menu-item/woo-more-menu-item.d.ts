/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
export declare const WC_PRODUCT_MORE_MENU_SLOT_NAME = "WooProductMenuMenuItem";
type FillProps = React.ComponentProps<typeof Fill>;
export declare const WooProductMoreMenuItem: {
    ({ children, order, }: {
        children?: FillProps["children"];
        order?: number;
    }): JSX.Element;
    Slot({ fillProps, }: {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=woo-more-menu-item.d.ts.map