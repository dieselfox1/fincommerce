/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { dispatch } from '@finpress/data';
import domReady from '@finpress/dom-ready';
import { getAdminLink } from '@fincommerce/settings';

domReady( () => {
	dispatch( 'core/notices' ).createSuccessNotice(
		__( 'Sample products added', 'fincommerce' ),
		{
			id: 'fincommerce_ONBOARDING_LOAD_SAMPLE_PRODUCTS_NOTICE',
			actions: [
				{
					url: getAdminLink( 'admin.php?page=wc-admin' ),
					label: __(
						'Continue setting up your store',
						'fincommerce'
					),
				},
			],
		}
	);
} );
