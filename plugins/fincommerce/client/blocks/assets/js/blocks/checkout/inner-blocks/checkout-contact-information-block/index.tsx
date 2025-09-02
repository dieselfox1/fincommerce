/**
 * External dependencies
 */
import { Icon, atSymbol } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-contact-information-block/block.json';

registerBlockType( 'fincommerce/checkout-contact-information-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	icon: {
		src: (
			<Icon
				icon={ atSymbol }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes,
	edit: Edit,
	save: Save,
} );
