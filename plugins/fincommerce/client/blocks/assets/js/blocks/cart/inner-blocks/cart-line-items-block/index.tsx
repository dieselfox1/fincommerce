/**
 * External dependencies
 */
import { Icon, column } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-line-items-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-line-items-block/block.json';

registerBlockType( 'fincommerce/cart-line-items-block', {
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
