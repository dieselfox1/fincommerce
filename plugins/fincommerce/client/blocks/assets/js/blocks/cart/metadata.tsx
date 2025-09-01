/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockConfiguration } from '@wordpress/blocks';
import { cart } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';

export const metadata: BlockConfiguration = {
	title: __( 'Cart', 'fincommerce' ),
	apiVersion: 3,
	icon: {
		src: (
			<Icon
				icon={ cart }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	category: 'fincommerce',
	keywords: [ __( 'FinCommerce', 'fincommerce' ) ],
	description: __( 'Shopping cart.', 'fincommerce' ),
	supports: {
		align: [ 'wide' ],
		html: false,
		multiple: false,
	},
	example: {
		attributes: {
			isPreview: true,
		},
		viewportWidth: 800,
	},
};
