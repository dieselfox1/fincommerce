/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/single-product/block.json';

const v1 = {
	attributes: metadata.attributes,
	supports: metadata.supports,
	save: () => {
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps }>
				{ /* @ts-expect-error: `InnerBlocks.Content` is a component that is typed in finpress core*/ }
				<InnerBlocks.Content />
			</div>
		);
	},
};

const deprecated = [ v1 ];

export default deprecated;
