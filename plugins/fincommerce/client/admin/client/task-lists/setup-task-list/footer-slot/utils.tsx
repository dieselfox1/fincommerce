/**
 * External dependencies
 */
import { Slot, Fill } from '@finpress/components';
import {
	createOrderedChildren,
	sortFillsByOrder,
} from '@fincommerce/components';

export const EXPERIMENTAL_WC_TASKLIST_FOOTER_SLOT_NAME =
	'experimental_fincommerce_tasklist_footer_item';
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin Task List footer.
 *
 * @slotFill ExperimentalWooTaskListFooterItem
 * @scope fincommerce-admin
 * @example
 * const MyFooterItem = () => (
 * 	<Fill name="experimental_fincommerce_tasklist_footer_item">
 * 		<div className="fincommerce-experiments-placeholder-slotfill">
 * 			<div className="placeholder-slotfill-content">
 * 				Slotfill goes in here!
 * 			</div>
 * 		</div>
 * 	</Fill>
  );
 *
 * registerPlugin( 'my-extension', {
 * render: MyFooterItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
export const ExperimentalWooTaskListFooterItem = ( {
	children,
	order = 1,
}: {
	children: React.ReactNode;
	order?: number;
} ) => {
	return (
		<Fill name={ EXPERIMENTAL_WC_TASKLIST_FOOTER_SLOT_NAME }>
			{ ( fillProps ) => {
				return createOrderedChildren( children, order, fillProps );
			} }
		</Fill>
	);
};

ExperimentalWooTaskListFooterItem.Slot = ( {
	fillProps,
}: {
	fillProps?: React.ComponentProps< typeof Slot >[ 'fillProps' ];
} ) => (
	<Slot
		name={ EXPERIMENTAL_WC_TASKLIST_FOOTER_SLOT_NAME }
		fillProps={ fillProps }
	>
		{ sortFillsByOrder }
	</Slot>
);
