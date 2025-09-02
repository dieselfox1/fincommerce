/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@finpress/block-editor';

export const Save = () => {
	const blockProps = useBlockProps.save( {
		className: 'wc-block-product-gallery',
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};
