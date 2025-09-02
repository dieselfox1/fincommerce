/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Slot, Fill } from '@finpress/components';

type WooOnboardingTaskListItemProps = {
	id: string;
	children: React.ComponentProps< typeof Fill >[ 'children' ];
};

/**
 * A Fill for adding Onboarding Task List items.
 *
 * @slotFill WooOnboardingTaskListItem
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
export const WooOnboardingTaskListItem = ( {
	id,
	...props
}: WooOnboardingTaskListItemProps ) => (
	<Fill name={ 'fincommerce_onboarding_task_list_item_' + id } { ...props } />
);

WooOnboardingTaskListItem.Slot = ( {
	id,
	fillProps,
}: {
	id: string;
	fillProps?: React.ComponentProps< typeof Slot >[ 'fillProps' ];
} ) => (
	<Slot
		name={ 'fincommerce_onboarding_task_list_item_' + id }
		fillProps={ fillProps }
	/>
);
