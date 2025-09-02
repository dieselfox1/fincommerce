/**
 * External dependencies
 */
import { filledCart } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/filled-cart-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/filled-cart-block/block.json';

registerBlockType( 'fincommerce/filled-cart-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ filledCart }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
