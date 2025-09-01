/**
 * External dependencies
 */
import { registerBlockType, type BlockConfiguration } from '@wordpress/blocks';
import { Icon, mapMarker } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-address/block.json';
import edit from '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-address/edit';
import '@fincommerce/block-library/assets/js/blocks/order-confirmation/billing-address/style.scss';

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
		attributes: {
			...metadata.attributes,
		},
		edit,
		save() {
			return null;
		},
	} as unknown as Partial< BlockConfiguration >
);
