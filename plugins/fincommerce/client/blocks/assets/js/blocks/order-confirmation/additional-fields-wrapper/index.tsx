/**
 * External dependencies
 */
import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Icon, info } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-fields-wrapper/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-fields-wrapper/block.json';
import attributes from '@fincommerce/block-library/assets/js/blocks/order-confirmation/additional-fields-wrapper/attributes';

registerBlockType(
	metadata as BlockConfiguration,
	{
		icon: {
			src: (
				<Icon
					icon={ info }
					className="wc-block-editor-components-block-icon"
				/>
			),
		},
		edit,
		save() {
			return <InnerBlocks.Content />;
		},
		attributes,
	} as unknown as Partial< BlockConfiguration >
);
