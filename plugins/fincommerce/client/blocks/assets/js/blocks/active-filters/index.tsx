/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { toggle } from '@fincommerce/icons';
import { Icon } from '@finpress/icons';
import clsx from 'clsx';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/active-filters/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/active-filters/block.json';
import { blockAttributes } from '@fincommerce/block-library/assets/js/blocks/active-filters/attributes';
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/active-filters/types';
import deprecated from '@fincommerce/block-library/assets/js/blocks/active-filters/deprecated';

registerBlockType( metadata, {
	apiVersion: 3,
	icon: {
		src: (
			<Icon
				icon={ toggle }
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
			>
				<span
					aria-hidden
					className="wc-block-active-filters__placeholder"
				/>
			</div>
		);
	},
	deprecated,
} );
