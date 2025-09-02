/**
 * External dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@finpress/block-editor';

export default function QuerySave( { attributes: { tagName: Tag = 'div' } } ) {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <Tag { ...innerBlocksProps } />;
}
