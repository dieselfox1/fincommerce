/**
 * External dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@finpress/block-editor';

export const Save = () => {
	const blockProps = useBlockProps.save( {
		className: 'wc-block-product-gallery-large-image__inner-blocks',
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};
