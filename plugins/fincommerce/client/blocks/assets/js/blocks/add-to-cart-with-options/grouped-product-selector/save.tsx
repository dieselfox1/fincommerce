/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@finpress/block-editor';

export default function AddToCartWithOptionsGroupedProductSelectorSave() {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( {
		...blockProps,
		role: 'list',
	} );
	return <div { ...innerBlocksProps } />;
}
