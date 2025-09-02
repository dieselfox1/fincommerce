/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/product-tag/block';
import '@fincommerce/block-library/assets/js/blocks/product-tag/editor.scss';
import type { ProductsByTagBlockProps } from '@fincommerce/block-library/assets/js/blocks/product-tag/types';

export const Edit = ( props: ProductsByTagBlockProps ): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block { ...props } />
		</div>
	);
};
