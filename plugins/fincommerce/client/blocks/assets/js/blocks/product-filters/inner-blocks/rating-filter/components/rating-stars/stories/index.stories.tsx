/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';

/**
 * Internal dependencies
 */
import RatingStars, { type RatingStarsProps } from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/rating-filter/components/rating-stars';

export default {
	title: 'Product Filters/Rating Filter/Rating Stars',
	component: RatingStars,
} as Meta< RatingStarsProps >;

const Template: StoryFn< RatingStarsProps > = ( args ) => (
	<RatingStars { ...args } />
);

export const Default: StoryFn< RatingStarsProps > = Template.bind( {} );
Default.args = {
	stars: 5,
	size: 24,
	color: 'black',
	gap: 0,
};
