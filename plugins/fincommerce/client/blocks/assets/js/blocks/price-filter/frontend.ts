/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/price-filter/block';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/price-filter/utils';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

renderFrontend( {
	selector:
		'.wp-block-fincommerce-price-filter:not(.wp-block-fincommerce-filter-wrapper .wp-block-fincommerce-price-filter)',
	Block,
	getProps,
} );
