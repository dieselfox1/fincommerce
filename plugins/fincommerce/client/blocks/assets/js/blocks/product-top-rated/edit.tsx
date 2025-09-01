/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ProductTopRatedBlock } from '@fincommerce/block-library/assets/js/blocks/product-top-rated/block';
import { Props } from '@fincommerce/block-library/assets/js/blocks/product-top-rated/types';

export const Edit = ( props: unknown & Props ): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<ProductTopRatedBlock { ...props } />
		</div>
	);
};
