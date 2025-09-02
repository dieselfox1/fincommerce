/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, box } from '@finpress/icons';
import clsx from 'clsx';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/stock-filter/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/stock-filter/block.json';
import { blockAttributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/attributes';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/types';
import deprecated from '@fincommerce/block-library/assets/js/blocks/stock-filter/deprecated';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ box }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		...blockAttributes,
	},
	edit,
	// Save the props to post content.
	save( { attributes }: { attributes: Attributes } ) {
		const { className } = attributes;

		return (
			<div
				{ ...useBlockProps.save( {
					className: clsx( 'is-loading', className ),
				} ) }
			/>
		);
	},
	deprecated,
} );
