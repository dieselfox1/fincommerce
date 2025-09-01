/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Slot, Fill } from '@wordpress/components';
/**
 * A Fill for adding Onboarding Task List headers.
 *
 * @slotFill WooOnboardingTaskListHeader
 * @scope fincommerce-tasks
 * @param {Object} props    React props.
 * @param {string} props.id Task id.
 */
export const WooOnboardingTaskListHeader = ({ id, ...props }) => (createElement(Fill, { name: 'fincommerce_onboarding_task_list_header_' + id, ...props }));
WooOnboardingTaskListHeader.Slot = ({ id, fillProps, }) => (createElement(Slot, { name: 'fincommerce_onboarding_task_list_header_' + id, fillProps: fillProps }));
