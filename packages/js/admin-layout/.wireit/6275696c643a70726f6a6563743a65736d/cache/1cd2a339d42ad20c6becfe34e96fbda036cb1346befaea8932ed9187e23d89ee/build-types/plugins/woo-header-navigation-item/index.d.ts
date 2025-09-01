/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
export declare const WC_HEADER_NAVIGATION_SLOT_NAME = "fincommerce_header_navigation_item";
type WooHeaderNavigationItemProps = {
    order?: number;
} & Omit<React.ComponentProps<typeof Fill>, 'name'>;
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin
 * navigation area left of the page title.
 *
 * @slotFill WooHeaderNavigationItem
 * @scope fincommerce-admin
 * @example
 * const MyNavigationItem = () => (
 * <WooHeaderNavigationItem>My nav item</WooHeaderNavigationItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyNavigationItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
export declare const WooHeaderNavigationItem: {
    ({ children, order, }: WooHeaderNavigationItemProps): JSX.Element;
    Slot({ fillProps, }: WooHeaderNavigationItemProps & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=index.d.ts.map