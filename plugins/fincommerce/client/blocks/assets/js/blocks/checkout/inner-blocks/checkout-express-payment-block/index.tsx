/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import expressIcon from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/icon';
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/block.json';

registerBlockType( 'fincommerce/checkout-express-payment-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				style={ { fill: 'none' } } // this is needed for this particular svg
				icon={ expressIcon }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
