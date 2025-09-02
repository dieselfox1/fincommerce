/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { getSetting } from '@fincommerce/settings';
import LoadMoreButton from '@fincommerce/base-components/load-more-button';
import {
	ReviewList,
	ReviewSortSelect,
} from '@fincommerce/base-components/reviews';
import withReviews from '@fincommerce/base-hocs/with-reviews';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { Review } from '@fincommerce/base-components/reviews/types';

/**
 * Internal dependencies
 */
import { ReviewBlockAttributes } from '@fincommerce/block-library/assets/js/blocks/reviews/attributes';

interface FrontendBlockProps {
	attributes: ReviewBlockAttributes;
	onAppendReviews: MouseEventHandler;
	onChangeOrderby: ChangeEventHandler< HTMLSelectElement >;
	sortSelectValue: 'most-recent' | 'highest-rating' | 'lowest-rating';
	reviews: Review[];
	totalReviews: number;
}

const FrontendBlock = ( {
	attributes,
	onAppendReviews,
	onChangeOrderby,
	reviews,
	sortSelectValue,
	totalReviews,
}: FrontendBlockProps ) => {
	if ( reviews.length === 0 ) {
		return null;
	}

	const reviewRatingsEnabled = getSetting< boolean >(
		'reviewRatingsEnabled',
		true
	);

	return (
		<>
			{ attributes.showOrderby && reviewRatingsEnabled && (
				<ReviewSortSelect
					value={ sortSelectValue }
					onChange={ onChangeOrderby }
				/>
			) }
			<ReviewList attributes={ attributes } reviews={ reviews } />
			{ attributes.showLoadMore && totalReviews > reviews.length && (
				<LoadMoreButton
					onClick={ onAppendReviews }
					screenReaderLabel={ __(
						'Load more reviews',
						'fincommerce'
					) }
				/>
			) }
		</>
	);
};

export default withReviews( FrontendBlock );
