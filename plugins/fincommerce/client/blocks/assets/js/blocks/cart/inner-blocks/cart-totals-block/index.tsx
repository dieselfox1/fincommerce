/**
 * External dependencies
 */
import { Icon, column } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-totals-block/edit';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-totals-block/style.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-totals-block/block.json';

registerBlockType( 'fincommerce/cart-totals-block', {
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
