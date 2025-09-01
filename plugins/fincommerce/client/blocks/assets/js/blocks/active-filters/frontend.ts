/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/active-filters/block';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/active-filters/utils';

const getProps = ( el: HTMLElement ) => {
	return {
		attributes: parseAttributes( el.dataset ),
		isEditor: false,
	};
};

renderFrontend( {
	selector:
		'.wp-block-fincommerce-active-filters:not(.wp-block-fincommerce-filter-wrapper .wp-block-fincommerce-active-filters)',
	Block,
	getProps,
} );
