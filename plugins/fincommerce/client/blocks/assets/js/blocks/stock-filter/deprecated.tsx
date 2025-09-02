/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/stock-filter/block.json';
import { blockAttributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/attributes';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/types';

const v1 = {
	attributes: {
		...metadata.attributes,
		showCounts: {
			type: 'boolean',
			default: true,
		},
		...blockAttributes,
	},
	save: ( { attributes }: { attributes: Attributes } ) => {
		const {
			className,
			showCounts,
			heading,
			headingLevel,
			showFilterButton,
		} = attributes;
		const data: Record< string, unknown > = {
			'data-show-counts': showCounts,
			'data-heading': heading,
			'data-heading-level': headingLevel,
		};
		if ( showFilterButton ) {
			data[ 'data-show-filter-button' ] = showFilterButton;
		}
		return (
			<div
				{ ...useBlockProps.save( {
					className: clsx( 'is-loading', className ),
				} ) }
				{ ...data }
			>
				<span
					aria-hidden
					className="wc-block-product-stock-filter__placeholder"
				/>
			</div>
		);
	},
};

const deprecated = [ v1 ];

export default deprecated;
