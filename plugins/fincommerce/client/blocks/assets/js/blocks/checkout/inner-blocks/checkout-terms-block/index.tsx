/**
 * External dependencies
 */
import { Icon, customPostType } from '@finpress/icons';
import { registerBlockType } from '@finpress/blocks';

/**
 * Internal dependencies
 */
import { Edit, Save } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-terms-block/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-terms-block/block.json';
import '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-terms-block/style.scss';

registerBlockType( 'fincommerce/checkout-terms-block', {
	apiVersion: metadata.apiVersion,
	title: metadata.title,
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
