/**
 * External dependencies
 */
import { registerBlockType, type BlockConfiguration } from '@finpress/blocks';
import { InnerBlocks } from '@finpress/block-editor';
import { Icon, mapMarker } from '@finpress/icons';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-wrapper/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-wrapper/block.json';
import attributes from '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-wrapper/attributes';

registerBlockType(
	metadata as BlockConfiguration,
	{
		icon: {
			src: (
				<Icon
					icon={ mapMarker }
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
