/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { ProductBestSellersBlock } from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/block';
import { Props } from '@fincommerce/block-library/assets/js/blocks/product-best-sellers/types';

export const Edit = ( props: unknown & Props ): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<ProductBestSellersBlock { ...props } />
		</div>
	);
};
