/**
 * External dependencies
 */
import { Icon, store } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/block.json';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-pickup-options-block/style.scss';

registerBlockType( 'fincommerce/checkout-pickup-options-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ store }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
