/**
 * External dependencies
 */
import { Icon, customPostType } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/edit';
import attributes from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-additional-information-block/block.json';

registerBlockType( 'fincommerce/checkout-additional-information-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
	attributes,
	icon: {
		src: (
			<Icon
				icon={ customPostType }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	edit: Edit,
	save: Save,
} );
