/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/product-filters/editor.scss';
import { type BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/product-filters/types';
import { getProductFiltersCss } from '@fincommerce/block-library/assets/js/blocks/product-filters/utils/get-product-filters-css';

export const Save = ( {
	attributes,
}: {
	attributes: BlockAttributes;
	style: Record< string, string >;
} ): JSX.Element => {
	const blockProps = useBlockProps.save( {
		className: clsx( 'wc-block-product-filters' ),
		style: getProductFiltersCss( attributes ),
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};
