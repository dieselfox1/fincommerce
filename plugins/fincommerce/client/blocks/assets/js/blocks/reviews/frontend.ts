/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import FrontendContainerBlock from '@fincommerce/block-library/assets/js/blocks/reviews/frontend-container-block';

const selector = `
	.wp-block-fincommerce-all-reviews,
	.wp-block-fincommerce-reviews-by-product,
	.wp-block-fincommerce-reviews-by-category
`;

const getProps = ( el: HTMLElement ) => {
	const showOrderby = el.dataset.showOrderby === 'true';
	const showLoadMore = el.dataset.showLoadMore === 'true';

	return {
		attributes: {
			showOrderby,
			showLoadMore,
			showReviewDate: el.classList.contains( 'has-date' ),
			showReviewerName: el.classList.contains( 'has-name' ),
			showReviewImage: el.classList.contains( 'has-image' ),
			showReviewRating: el.classList.contains( 'has-rating' ),
			showReviewContent: el.classList.contains( 'has-content' ),
			showProductName: el.classList.contains( 'has-product-name' ),
		},
	};
};

renderFrontend( { selector, Block: FrontendContainerBlock, getProps } );
