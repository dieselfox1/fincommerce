/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';

const Save = () => {
	// We add the `fincommerce` class to the wrapper to apply FinCommerce styles to the block.
	const blockProps = useBlockProps.save( {
		className: 'fincommerce',
	} );

	return (
		<div { ...blockProps }>
			{ /* @ts-expect-error: `InnerBlocks.Content` is a component that is typed in finpress core*/ }
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
