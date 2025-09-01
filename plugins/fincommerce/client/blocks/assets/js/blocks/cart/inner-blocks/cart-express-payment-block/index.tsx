/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/edit';
import expressIcon from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/icon';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/block.json';

registerBlockType( 'fincommerce/cart-express-payment-block', {
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
