/**
 * External dependencies
 */
import { registerPlugin } from '@finpress/plugins';
import { WooOnboardingTaskListItem } from '@fincommerce/onboarding';

const LaunchYourStoreTaskItem = () => {
	return (
		<WooOnboardingTaskListItem id="launch-your-store">
			{ ( { defaultTaskItem: DefaultTaskItem, isComplete } ) => {
				return <DefaultTaskItem isClickable={ ! isComplete } />;
			} }
		</WooOnboardingTaskListItem>
	);
};

registerPlugin( 'fincommerce-admin-task-launch-your-store', {
	scope: 'fincommerce-tasks',
	render: LaunchYourStoreTaskItem,
} );
