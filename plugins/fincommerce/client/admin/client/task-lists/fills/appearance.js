/**
 * External dependencies
 */
import { WooOnboardingTaskListItem } from '@fincommerce/onboarding';
import { registerPlugin } from '@finpress/plugins';
import { getAdminLink } from '@fincommerce/settings';

export const useAppearanceClick = () => {
	const onClick = () => {
		window.location = getAdminLink(
			'theme-install.php?browse=block-themes'
		);
	};

	return { onClick };
};

const AppearanceFill = () => {
	const { onClick } = useAppearanceClick();
	return (
		<WooOnboardingTaskListItem id="appearance">
			{ ( { defaultTaskItem: DefaultTaskItem } ) => (
				<DefaultTaskItem
					// Override task click so it doesn't navigate to a task component.
					onClick={ onClick }
				/>
			) }
		</WooOnboardingTaskListItem>
	);
};

registerPlugin( 'wc-admin-onboarding-task-appearance', {
	scope: 'fincommerce-tasks',
	render: () => <AppearanceFill />,
} );
