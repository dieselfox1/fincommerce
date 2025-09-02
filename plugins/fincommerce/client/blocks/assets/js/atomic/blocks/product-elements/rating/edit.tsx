/**
 * External dependencies
 */
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@finpress/block-editor';
import type { BlockEditProps } from '@finpress/blocks';
import { useEffect } from '@finpress/element';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';
import { useProduct } from '@fincommerce/entities';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/block';
import { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/types';
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/editor.scss';
import { useIsDescendentOfSingleProductBlock } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-block';
import { useIsDescendentOfSingleProductTemplate } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-template';

const Edit = (
	props: BlockEditProps< BlockAttributes > & { context: Context }
): JSX.Element => {
	const { attributes, setAttributes, context } = props;
	const blockProps = useBlockProps( {
		className: 'wp-block-fincommerce-product-rating',
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

	const { product } = useProduct( context.postId );

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
				<Block isAdmin={ true } { ...blockAttrs } product={ product } />
			</div>
		</>
	);
};

export default Edit;
