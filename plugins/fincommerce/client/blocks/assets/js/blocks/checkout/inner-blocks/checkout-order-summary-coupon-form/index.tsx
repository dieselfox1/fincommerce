/**
 * External dependencies
 */
import { Icon, tag } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-coupon-form/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-coupon-form/block.json';

registerBlockType( 'fincommerce/checkout-order-summary-coupon-form-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ tag }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
