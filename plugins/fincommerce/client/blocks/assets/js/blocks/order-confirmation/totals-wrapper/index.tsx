/**
 * External dependencies
 */
import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import { totals } from '@fincommerce/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/totals-wrapper/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/totals-wrapper/block.json';
import attributes from '@fincommerce/block-library/assets/js/blocks/order-confirmation/totals-wrapper/attributes';

registerBlockType(
	metadata as BlockConfiguration,
	{
		icon: {
			src: (
				<Icon
					icon={ totals }
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
