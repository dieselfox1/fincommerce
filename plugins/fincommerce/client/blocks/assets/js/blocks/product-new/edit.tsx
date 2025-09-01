/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ProductNewestBlock } from '@fincommerce/block-library/assets/js/blocks/product-new/block';
import { ProductNewestBlockProps } from '@fincommerce/block-library/assets/js/blocks/product-new/types';

export const Edit = (
	props: unknown & ProductNewestBlockProps
): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<ProductNewestBlock { ...props } />
		</div>
	);
};
