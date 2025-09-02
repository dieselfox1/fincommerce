/**
 * External dependencies
 */
import { Icon, shipping } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/block.json';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-shipping-method-block/style.scss';

registerBlockType( 'fincommerce/checkout-shipping-method-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ shipping }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
