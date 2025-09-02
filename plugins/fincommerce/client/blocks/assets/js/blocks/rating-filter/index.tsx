/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { Icon, starEmpty } from '@finpress/icons';
import clsx from 'clsx';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/rating-filter/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/rating-filter/block.json';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/rating-filter/types';
import deprecated from '@fincommerce/block-library/assets/js/blocks/rating-filter/deprecated';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ starEmpty }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
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
