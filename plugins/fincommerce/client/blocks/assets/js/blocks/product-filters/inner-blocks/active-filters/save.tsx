/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@finpress/block-editor';

const Save = () => {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
};

export default Save;
