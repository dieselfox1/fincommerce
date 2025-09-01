/**
 * External dependencies
 */
import { removeCart } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/empty-cart-block/edit';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/empty-cart-block/style.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/empty-cart-block/block.json';

registerBlockType( 'fincommerce/empty-cart-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ removeCart }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
