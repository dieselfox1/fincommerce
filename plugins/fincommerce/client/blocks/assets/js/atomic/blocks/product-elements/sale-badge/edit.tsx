/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/block';
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sale-badge/types';
import { useIsDescendentOfSingleProductTemplate } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-template';

const Edit = ( {
	attributes,
	context,
}: BlockEditProps< BlockAttributes > & { context: Context } ): JSX.Element => {
	const blockProps = useBlockProps();

	// Remove the `style` prop from the block props to avoid passing it to the wrapper div.
	const { style, ...wrapperProps } = blockProps;
	const { isDescendentOfSingleProductTemplate } =
		useIsDescendentOfSingleProductTemplate();

	const blockAttrs = {
		...attributes,
		...context,
	};

	return (
		<div { ...wrapperProps }>
			<Block
				{ ...blockAttrs }
				isDescendentOfSingleProductTemplate={
					isDescendentOfSingleProductTemplate
				}
			/>
		</div>
	);
};

export default Edit;
