/**
 * External dependencies
 */
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@fincommerce/shared-context';
import { useStyleProps } from '@fincommerce/base-hooks';
import { withProductDataContext } from '@fincommerce/shared-hocs';
import {
	ProductRating,
	getAverageRating,
	getRatingCount,
} from '@fincommerce/editor-components/product-rating';
import { ProductEntityResponse } from '@fincommerce/entities';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/rating/style.scss';

type ProductRatingProps = {
	className?: string;
	textAlign?: string;
	isDescendentOfQueryLoop: boolean;
	postId: number;
	productId: number;
	shouldDisplayMockedReviewsWhenProductHasNoReviews: boolean;
	product: ProductEntityResponse;
	isAdmin: boolean;
};

export const Block = ( props: ProductRatingProps ): JSX.Element | undefined => {
	const {
		textAlign = '',
		shouldDisplayMockedReviewsWhenProductHasNoReviews,
		isDescendentOfQueryLoop,
		product: productEntity,
	} = props;
	const styleProps = useStyleProps( props );
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext( {
		product: productEntity,
		isAdmin: props.isAdmin,
	} );
	const rating = product ? getAverageRating( product ) : 0;
	const reviews = product ? getRatingCount( product ) : 0;

	const className = 'wc-block-components-product-rating';

	if ( reviews || shouldDisplayMockedReviewsWhenProductHasNoReviews ) {
		return (
			<ProductRating
				className={ className }
				showReviewCount={ ! isDescendentOfQueryLoop }
				showMockedReviews={
					shouldDisplayMockedReviewsWhenProductHasNoReviews
				}
				styleProps={ styleProps }
				parentClassName={ parentClassName }
				reviews={ reviews }
				rating={ rating }
				textAlign={ textAlign }
			/>
		);
	}
};

export default withProductDataContext( Block );
