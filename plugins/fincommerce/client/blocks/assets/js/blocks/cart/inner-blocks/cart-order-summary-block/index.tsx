/**
 * External dependencies
 */
import { totals } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/edit';
import deprecated from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/deprecated';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-block/block.json';

registerBlockType( 'fincommerce/cart-order-summary-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ totals }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
	deprecated,
} );
