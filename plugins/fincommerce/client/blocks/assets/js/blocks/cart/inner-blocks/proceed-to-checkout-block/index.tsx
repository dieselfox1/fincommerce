/**
 * External dependencies
 */
import { Icon, button } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import attributes from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/attributes';
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/edit';
import '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/style.scss';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/proceed-to-checkout-block/block.json';

registerBlockType( 'fincommerce/proceed-to-checkout-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
