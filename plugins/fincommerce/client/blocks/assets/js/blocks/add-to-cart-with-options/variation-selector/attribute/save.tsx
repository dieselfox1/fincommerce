/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@finpress/block-editor';

export default function AttributeItemTemplateSave() {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( {
		...blockProps,
		role: 'listitem',
	} );
	return <div { ...innerBlocksProps } />;
}
