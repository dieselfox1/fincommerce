/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { getHasColorClasses, getStyleColorVars } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/colors';
import { colorNames } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-slider/constants';
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/price-slider/types';

export default function save( {
	attributes,
}: {
	attributes: BlockAttributes;
} ) {
	const blockProps = useBlockProps.save( {
		className: clsx(
			'wc-block-product-filter-price-slider',
			getHasColorClasses( attributes, colorNames )
		),
		style: getStyleColorVars(
			'wc-product-filter-price',
			attributes,
			colorNames
		),
	} );

	return <div { ...blockProps } />;
}
