/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/stock-filter/block';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/stock-filter/utils';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

renderFrontend( {
	selector:
		'.wp-block-fincommerce-stock-filter:not(.wp-block-fincommerce-filter-wrapper .wp-block-fincommerce-stock-filter)',
	Block,
	getProps,
} );
