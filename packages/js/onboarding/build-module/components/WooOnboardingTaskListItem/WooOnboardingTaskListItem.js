/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Slot, Fill } from '@wordpress/components';
/**
 * A Fill for adding Onboarding Task List items.
 *
 * @slotFill WooOnboardingTaskListItem
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
export const WooOnboardingTaskListItem = ({ id, ...props }) => (createElement(Fill, { name: 'fincommerce_onboarding_task_list_item_' + id, ...props }));
WooOnboardingTaskListItem.Slot = ({ id, fillProps, }) => (createElement(Slot, { name: 'fincommerce_onboarding_task_list_item_' + id, fillProps: fillProps }));
