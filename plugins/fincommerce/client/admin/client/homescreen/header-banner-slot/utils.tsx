/**
 * External dependencies
 */
import { Slot, Fill } from '@wordpress/components';
import {
	createOrderedChildren,
	sortFillsByOrder,
} from '@fincommerce/components';

export const EXPERIMENTAL_WC_HOMESCREEN_HEADER_BANNER_SLOT_NAME =
	'fincommerce_homescreen_experimental_header_banner_item';
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin Homescreen header banner.
 *
 * @slotFill WooHomescreenHeaderBannerItem
 * @scope fincommerce-admin
 * @example
 * const MyHeaderItem = () => (
 * <WooHomescreenHeaderBannerItem>My header item</WooHomescreenHeaderBannerItem>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyHeaderItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
export const WooHomescreenHeaderBannerItem = ( {
	children,
	order = 1,
}: {
	children: React.ReactNode;
	order?: number;
} ) => {
	return (
		<Fill name={ EXPERIMENTAL_WC_HOMESCREEN_HEADER_BANNER_SLOT_NAME }>
			{ ( fillProps ) => {
				return createOrderedChildren( children, order, fillProps );
			} }
		</Fill>
	);
};

WooHomescreenHeaderBannerItem.Slot = ( {
	fillProps,
}: {
	fillProps?: React.ComponentProps< typeof Slot >[ 'fillProps' ];
} ) => (
	<Slot
		name={ EXPERIMENTAL_WC_HOMESCREEN_HEADER_BANNER_SLOT_NAME }
		fillProps={ fillProps }
	>
		{ sortFillsByOrder }
	</Slot>
);
