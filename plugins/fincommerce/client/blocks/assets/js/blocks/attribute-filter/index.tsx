/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { useBlockProps } from '@finpress/block-editor';
import { Icon, category } from '@finpress/icons';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/attribute-filter/edit';
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/attribute-filter/types';
import { blockAttributes } from '@fincommerce/block-library/assets/js/blocks/attribute-filter/attributes';
import metadata from '@fincommerce/block-library/assets/js/blocks/attribute-filter/block.json';
import deprecated from '@fincommerce/block-library/assets/js/blocks/attribute-filter/deprecated';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ category }
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
	save( { attributes }: { attributes: BlockAttributes } ) {
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
