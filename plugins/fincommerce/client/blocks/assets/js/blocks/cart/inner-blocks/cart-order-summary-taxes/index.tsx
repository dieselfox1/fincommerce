/**
 * External dependencies
 */
import { totals } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-taxes/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-taxes/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-taxes/block.json';

registerBlockType( 'fincommerce/cart-order-summary-taxes-block', {
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
	attributes,
	edit: Edit,
	save: Save,
} );
