/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, payment } from '@finpress/icons';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-accepted-payment-methods-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-accepted-payment-methods-block/block.json';

registerBlockType( 'fincommerce/cart-accepted-payment-methods-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ payment }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
