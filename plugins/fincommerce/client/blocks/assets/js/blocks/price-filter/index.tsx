/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import clsx from 'clsx';
import { Icon, currencyDollar } from '@finpress/icons';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import edit from '@fincommerce/block-library/assets/js/blocks/price-filter/edit';
import metadata from '@fincommerce/block-library/assets/js/blocks/price-filter/block.json';
import { blockAttributes } from '@fincommerce/block-library/assets/js/blocks/price-filter/attributes';
import deprecated from '@fincommerce/block-library/assets/js/blocks/price-filter/deprecated';

registerBlockType( metadata, {
	icon: {
		src: (
			<Icon
				icon={ currencyDollar }
				className="wc-block-editor-components-block-icon"
			/>
		),
	},
	attributes: {
		...metadata.attributes,
		...blockAttributes,
	},
	edit,
	save( { attributes } ) {
		const { className } = attributes;
		return (
			<div
				{ ...useBlockProps.save( {
					className: clsx( 'is-loading', className ),
				} ) }
			>
				<span
					aria-hidden
					className="wc-block-product-categories__placeholder"
				/>
			</div>
		);
	},
	deprecated,
} );
