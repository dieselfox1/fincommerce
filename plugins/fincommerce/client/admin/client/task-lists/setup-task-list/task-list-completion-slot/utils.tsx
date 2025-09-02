/**
 * External dependencies
 */
import { Slot, Fill } from '@finpress/components';
import {
	createOrderedChildren,
	sortFillsByOrder,
} from '@fincommerce/components';

type WooTaskListCompletionProps = {
	children: React.ReactNode;
	order?: number;
};

export const EXPERIMENTAL_WC_TASK_LIST_COMPLETION_SLOT_NAME =
	'fincommerce_experimental_task_list_completion';
/**
 * Create a Fill for extensions to add items to the FinCommerce Admin Task List completion component slot.
 *
 * @slotFill WooTaskListCompletion
 * @scope fincommerce-admin
 * @example
 * const MyTasklistCompletionItem = () => (
 * <WooTaskListCompletion>My Task List completion item</WooTaskListCompletion>
 * );
 *
 * registerPlugin( 'my-extension', {
 * render: MyTasklistCompletionItem,
 * scope: 'fincommerce-admin',
 * } );
 * @param {Object} param0
 * @param {Array}  param0.children - Node children.
 * @param {Array}  param0.order    - Node order.
 */
export const WooTaskListCompletion = ( {
	children,
	order = 1,
}: WooTaskListCompletionProps ) => {
	return (
		<Fill name={ EXPERIMENTAL_WC_TASK_LIST_COMPLETION_SLOT_NAME }>
			{ ( fillProps ) => {
				return createOrderedChildren( children, order, fillProps );
			} }
		</Fill>
	);
};

export type WooTaskListCompletionFillProps = {
	/** Call this function to hide this Task List completion component completely, without any replacement component */
	hideTasks: () => void;
	/** Call this function to show the completed Task List items instead of this TaskList completion component */
	keepTasks: () => void;
	/** To show the CES component or not */
	customerEffortScore: boolean;
};

WooTaskListCompletion.Slot = ( {
	fillProps,
}: {
	fillProps: React.ComponentProps< typeof Slot >[ 'fillProps' ] &
		WooTaskListCompletionFillProps;
} ) => (
	<Slot
		name={ EXPERIMENTAL_WC_TASK_LIST_COMPLETION_SLOT_NAME }
		fillProps={ fillProps }
	>
		{ sortFillsByOrder }
	</Slot>
);
