/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/block';
import type { AllReviewsEditorProps } from '@fincommerce/block-library/assets/js/blocks/reviews/all-reviews/types';

export const Edit = ( props: unknown & AllReviewsEditorProps ): JSX.Element => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block { ...props } />
		</div>
	);
};
