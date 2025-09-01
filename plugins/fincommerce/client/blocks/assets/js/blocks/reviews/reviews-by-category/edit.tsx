/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-category/block';
import type { ReviewsByCategoryEditorProps } from '@fincommerce/block-library/assets/js/blocks/reviews/reviews-by-category/types';

export const Edit = (
	props: unknown & ReviewsByCategoryEditorProps
): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block { ...props } />
		</div>
	);
};
