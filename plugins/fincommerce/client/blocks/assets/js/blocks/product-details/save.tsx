/**
 * External dependencies
 */
import {
	// @ts-expect-error Missing types for this package.
	useInnerBlocksProps,
	useBlockProps,
} from '@finpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
}
