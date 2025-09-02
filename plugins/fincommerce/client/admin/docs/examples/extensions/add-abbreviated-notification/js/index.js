/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { registerPlugin } from '@finpress/plugins';
import { Fill as NotificationFill } from '@finpress/components';
import { AbbreviatedCard } from '@fincommerce/components';
import { page } from '@finpress/icons';
import { Text } from '@fincommerce/experimental';

const MyAbbreviatedNotification = () => {
	return (
		<NotificationFill name="AbbreviatedNotification">
			<AbbreviatedCard
				className="fincommerce-abbreviated-notification"
				icon={ page }
				href={ '#' }
			>
				<Text as="h3">
					{ __(
						'Abbreviated Notification Example',
						'plugin-domain'
					) }
				</Text>
				<Text>
					{ __( 'This is an unread notifications', 'plugin-domain' ) }
				</Text>
			</AbbreviatedCard>
		</NotificationFill>
	);
};

registerPlugin( 'my-abbreviated-notification', {
	render: MyAbbreviatedNotification,
} );
