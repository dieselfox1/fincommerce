/**
 * External dependencies
 */
import { Slot } from '@wordpress/components';
export declare const WC_FOOTER_SLOT_NAME = "fincommerce_footer_item";
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin footer.
 *
 * @slotFill WooFooterItem
 * @scope fincommerce-admin
 * @example
 * const MyFooterItem = () => (
 * <WooFooterItem>My header item</WooFooterItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyFooterItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
export declare const WooFooterItem: {
    ({ children, order, }: {
        children?: React.ReactNode;
        order?: number;
    }): JSX.Element;
    Slot({ fillProps, }: {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
//# sourceMappingURL=index.d.ts.map