/**
 * External dependencies
 */
import { Icon, column } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/edit';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/style.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-cross-sells-products/block.json';

registerBlockType( 'fincommerce/cart-cross-sells-products-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ column }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
