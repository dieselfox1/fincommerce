/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/rating-filter/block';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/rating-filter/utils';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

renderFrontend( {
	selector:
		'.wp-block-fincommerce-rating-filter:not(.wp-block-fincommerce-filter-wrapper .wp-block-fincommerce-rating-filter)',
	Block,
	getProps,
} );
