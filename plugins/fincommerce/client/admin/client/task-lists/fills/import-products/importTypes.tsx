/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import PageIcon from 'gridicons/dist/pages';
import { getAdminLink } from '@fincommerce/settings';
import { recordEvent } from '@fincommerce/tracks';

export const importTypes = [
	{
		key: 'from-csv' as const,
		title: __( 'FROM A CSV FILE', 'fincommerce' ),
		content: __(
			'Import all products at once by uploading a CSV file.',
			'fincommerce'
		),
		before: <PageIcon />,
		onClick: () => {
			recordEvent( 'tasklist_add_product', { method: 'import' } );
			window.location.href = getAdminLink(
				'edit.php?post_type=product&page=product_importer&wc_onboarding_active_task=products'
			);
		},
	},
];
