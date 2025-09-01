/**
 * External dependencies
 */
import clsx from 'clsx';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/types';
import deprecated from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/deprecated';
import edit from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/edit';
import { BLOCK_ICON as icon } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/constants';
import metadata from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/image/block.json';

registerBlockType( metadata, {
	deprecated,
	icon,
	edit,
	save: ( { attributes }: { attributes: BlockAttributes } ) => {
		if (
			attributes.isDescendentOfQueryLoop ||
			attributes.isDescendentOfSingleProductBlock
		) {
			return <InnerBlocks.Content />;
		}
		return <div className={ clsx( 'is-loading', attributes.className ) } />;
	},
} );
