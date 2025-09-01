/**
 * External dependencies
 */
import { totals } from '@fincommerce/icons';
import { Icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/attributes';
import deprecated from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/deprecated';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/style.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-block/block.json';

registerBlockType( 'fincommerce/checkout-order-summary-block', {
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
	deprecated,
} );
