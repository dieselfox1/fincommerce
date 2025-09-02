/**
 * External dependencies
 */
import clsx from 'clsx';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/rating-filter/block.json';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/rating-filter/types';

const v1 = {
	attributes: {
		...metadata.attributes,
		showCounts: {
			type: 'boolean',
			default: true,
		},
	},
	save: ( { attributes }: { attributes: Attributes } ) => {
		const { className, showCounts } = attributes;
		const data: Record< string, unknown > = {
			'data-show-counts': showCounts,
		};
		return (
			<div
				{ ...useBlockProps.save( {
					className: clsx( 'is-loading', className ),
				} ) }
				{ ...data }
			>
				<span
					aria-hidden
					className="wc-block-product-rating-filter__placeholder"
				/>
			</div>
		);
	},
};

const deprecated = [ v1 ];

export default deprecated;
