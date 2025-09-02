/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';

const Save = () => {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			{ /* @ts-expect-error: `InnerBlocks.Content` is a component that is typed in finpress core*/ }
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
