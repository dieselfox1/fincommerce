/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
export declare const WC_HEADER_SLOT_NAME = "fincommerce_header_item";
type WooHeaderItemProps = {
    order?: number;
    name?: string;
} & Omit<React.ComponentProps<typeof Fill>, 'name'>;
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin header.
 *
 * @slotFill WooHeaderItem
 * @scope fincommerce-admin
 * @example
 * const MyHeaderItem = () => (
 * <WooHeaderItem>My header item</WooHeaderItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyHeaderItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.name     - Header name.
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
export declare const WooHeaderItem: {
    ({ children, order, name, }: WooHeaderItemProps): JSX.Element;
    Slot({ fillProps, name, }: Omit<WooHeaderItemProps, "order"> & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=index.d.ts.map