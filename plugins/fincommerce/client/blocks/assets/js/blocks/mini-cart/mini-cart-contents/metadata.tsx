/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { cart } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';
import { BlockConfiguration } from '@finpress/blocks';

export const metadata: BlockConfiguration = {
	apiVersion: 3,
	title: __( 'Mini-Cart Contents', 'fincommerce' ),
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
	description: __( 'Display a Mini-Cart widget.', 'fincommerce' ),
	supports: {
		align: false,
		html: false,
		multiple: false,
		reusable: false,
		inserter: false,
		color: {
			link: true,
		},
		lock: false,
		__experimentalBorder: {
			color: true,
			width: true,
		},
	},
	example: {
		attributes: {
			isPreview: true,
		},
	},
};
