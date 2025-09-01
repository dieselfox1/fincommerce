/**
 * External dependencies
 */
import { totals } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-discount/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-order-summary-discount/block.json';

registerBlockType( 'fincommerce/cart-order-summary-discount-block', {
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
} );
