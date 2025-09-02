/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { SortSelect } from '@fincommerce/blocks-components';
import type { ChangeEventHandler } from 'react';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/reviews/review-sort-select/style.scss';

interface ReviewSortSelectProps {
	onChange: ChangeEventHandler;
	readOnly?: boolean;
	value: 'most-recent' | 'highest-rating' | 'lowest-rating';
}

const ReviewSortSelect = ( {
	onChange,
	readOnly,
	value,
}: ReviewSortSelectProps ): JSX.Element => {
	return (
		<SortSelect
			className="wc-block-review-sort-select wc-block-components-review-sort-select"
			label={ __( 'Order by', 'fincommerce' ) }
			onChange={ onChange }
			options={ [
				{
					key: 'most-recent',
					label: __( 'Most recent', 'fincommerce' ),
				},
				{
					key: 'highest-rating',
					label: __( 'Highest rating', 'fincommerce' ),
				},
				{
					key: 'lowest-rating',
					label: __( 'Lowest rating', 'fincommerce' ),
				},
			] }
			readOnly={ readOnly }
			screenReaderLabel={ __( 'Order reviews by', 'fincommerce' ) }
			value={ value }
		/>
	);
};

export default ReviewSortSelect;
