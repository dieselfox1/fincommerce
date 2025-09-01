/**
 * External dependencies
 */
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating-counter/block';
import { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating-counter/types';
import { useIsDescendentOfSingleProductBlock } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-block';
import { useIsDescendentOfSingleProductTemplate } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-template';

const Edit = (
	props: BlockEditProps< BlockAttributes > & { context: Context }
): JSX.Element => {
	const { attributes, setAttributes, context } = props;
	const blockProps = useBlockProps( {
		className: 'wp-block-fincommerce-product-rating-counter',
	} );
	const blockAttrs = {
		...attributes,
		...context,
		shouldDisplayMockedReviewsWhenProductHasNoReviews: true,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );
	const { isDescendentOfSingleProductBlock } =
		useIsDescendentOfSingleProductBlock( {
			blockClientId: blockProps?.id,
		} );
	let { isDescendentOfSingleProductTemplate } =
		useIsDescendentOfSingleProductTemplate();

	if ( isDescendentOfQueryLoop || isDescendentOfSingleProductBlock ) {
		isDescendentOfSingleProductTemplate = false;
	}

	useEffect( () => {
		setAttributes( {
			isDescendentOfQueryLoop,
			isDescendentOfSingleProductBlock,
			isDescendentOfSingleProductTemplate,
		} );
	}, [
		setAttributes,
		isDescendentOfQueryLoop,
		isDescendentOfSingleProductBlock,
		isDescendentOfSingleProductTemplate,
	] );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( newAlign ) => {
						setAttributes( { textAlign: newAlign || '' } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<Block { ...blockAttrs } />
			</div>
		</>
	);
};

export default Edit;
