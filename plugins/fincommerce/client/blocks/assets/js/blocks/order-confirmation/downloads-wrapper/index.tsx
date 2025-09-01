/**
 * External dependencies
 */
import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Icon, download } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads-wrapper/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads-wrapper/block.json';
import attributes from '@fincommerce/block-library/assets/js/blocks/order-confirmation/downloads-wrapper/attributes';

registerBlockType(
	metadata as BlockConfiguration,
	{
		icon: {
			src: (
				<Icon
					icon={ download }
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
