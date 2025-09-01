/**
 * External dependencies
 */
import { totals } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-totals/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-totals/block.json';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-totals/style.scss';

registerBlockType( 'fincommerce/checkout-order-summary-totals-block', {
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
