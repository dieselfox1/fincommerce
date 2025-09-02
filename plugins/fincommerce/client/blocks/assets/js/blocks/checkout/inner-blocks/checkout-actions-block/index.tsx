/**
 * External dependencies
 */
import { Icon, button } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';
import type { BlockConfiguration } from '@finpress/blocks';
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/attributes';
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/block.json';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-actions-block/style.scss';

const blockConfig: BlockConfiguration = {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	example: {
		attributes: {
			showPrice: true,
			placeOrderButtonLabel: __( 'Place Order', 'fincommerce' ),
			showReturnToCart: false,
		},
	},
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: { ...attributes, ...metadata.attributes },
	save: Save,
	edit: Edit,
};

registerBlockType( 'fincommerce/checkout-actions-block', blockConfig );
