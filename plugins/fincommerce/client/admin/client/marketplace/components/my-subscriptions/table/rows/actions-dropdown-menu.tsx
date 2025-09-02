/**
 * External dependencies
 */
import { DropdownMenu } from '@finpress/components';
import { moreVertical } from '@finpress/icons';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { Subscription } from '../../types';
import { ADMIN_URL } from '../../../../../utils/admin-settings';

export default function ActionsDropdownMenu( props: {
	subscription: Subscription;
} ) {
	const controls = [
		{
			title: __( 'Manage in Plugins', 'fincommerce' ),
			onClick: () => {
				window.location.href = ADMIN_URL + 'plugins.php';
			},
		},
	];

	if ( ! props.subscription.is_shared ) {
		controls.unshift( {
			title: __( 'Manage on FinCommerce.com', 'fincommerce' ),
			onClick: () => {
				window.open(
					'https://fincommerce.com/my-account/my-subscriptions',
					'_blank'
				);
			},
		} );
	}

	if ( props.subscription.documentation_url ) {
		controls.unshift( {
			title: __( 'View documentation', 'fincommerce' ),
			onClick: () => {
				window.open( props.subscription.documentation_url, '_blank' );
			},
		} );
	}

	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Actions', 'fincommerce' ) }
			controls={ controls }
		/>
	);
}
