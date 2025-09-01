/**
 * External dependencies
 */
import { registerProductBlockType } from '@fincommerce/atomic-utils';
import { Icon, button } from '@wordpress/icons';
import type { BlockConfiguration } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form/block.json';
import { QuantitySelectorStyle } from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form/settings';
import AddToCartFormEdit from '@fincommerce/block-library/assets/js/blocks/product-elements/add-to-cart-form/edit';
export interface Attributes {
	className?: string;
	quantitySelectorStyle: QuantitySelectorStyle;
}

const blockConfig = {
	...( metadata as BlockConfiguration< Attributes > ),
	edit: AddToCartFormEdit,
	icon: {
		src: (
			<Icon
				icon={ button }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	ancestor: [ 'fincommerce/single-product' ],
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'fincommerce/add-to-cart-with-options' ],
				transform: () =>
					createBlock( 'fincommerce/add-to-cart-with-options' ),
			},
		],
	},
	save() {
		return null;
	},
};

registerProductBlockType( blockConfig, {
	isAvailableOnPostEditor: true,
} );
