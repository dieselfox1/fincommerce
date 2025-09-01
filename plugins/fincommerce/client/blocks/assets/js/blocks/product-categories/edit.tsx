/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/product-categories/block';
import '@fincommerce/block-library/assets/js/blocks/product-categories/editor.scss';
import type { ProductCategoriesBlockProps } from '@fincommerce/block-library/assets/js/blocks/product-categories/types';

export default function ProductCategoriesEdit(
	props: ProductCategoriesBlockProps
): JSX.Element {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block { ...props } />
		</div>
	);
}
