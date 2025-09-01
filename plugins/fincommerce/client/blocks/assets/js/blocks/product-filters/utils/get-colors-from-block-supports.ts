/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { getColorCSSVar } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/colors';

export const getColorsFromBlockSupports = ( attributes: BlockAttributes ) => {
	const { backgroundColor, textColor, style } = attributes;
	return {
		textColor: getColorCSSVar( textColor, style?.color?.text ),
		backgroundColor: getColorCSSVar(
			backgroundColor,
			style?.color?.background
		),
	};
};
