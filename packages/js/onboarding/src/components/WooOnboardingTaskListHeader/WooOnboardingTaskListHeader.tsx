/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Slot, Fill } from '@finpress/components';

type WooOnboardingTaskListHeaderProps = {
	id: string;
	// The name prop is derived from the id and should not be passed by users.
} & Omit< React.ComponentProps< typeof Fill >, 'name' >;

/**
 * A Fill for adding Onboarding Task List headers.
 *
 * @slotFill WooOnboardingTaskListHeader
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
export const WooOnboardingTaskListHeader = ( {
	id,
	...props
}: WooOnboardingTaskListHeaderProps ) => (
	<Fill
		name={ 'fincommerce_onboarding_task_list_header_' + id }
		{ ...props }
	/>
);

WooOnboardingTaskListHeader.Slot = ( {
	id,
	fillProps,
}: WooOnboardingTaskListHeaderProps & {
	fillProps?: React.ComponentProps< typeof Slot >[ 'fillProps' ];
} ) => (
	<Slot
		name={ 'fincommerce_onboarding_task_list_header_' + id }
		fillProps={ fillProps }
	/>
);
