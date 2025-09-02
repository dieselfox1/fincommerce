/**
 * External dependencies
 */
import { totals } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-discount/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-discount/block.json';

registerBlockType( 'fincommerce/checkout-order-summary-discount-block', {
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
