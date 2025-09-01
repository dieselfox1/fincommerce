/**
 * External dependencies
 */
import { renderFrontend } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/attribute-filter/block';
import { parseAttributes } from '@fincommerce/block-library/assets/js/blocks/attribute-filter/utils';

const getProps = ( el: HTMLElement ) => {
	return {
		isEditor: false,
		attributes: parseAttributes( el.dataset ),
	};
};

renderFrontend( {
	selector:
		'.wp-block-fincommerce-attribute-filter:not(.wp-block-fincommerce-filter-wrapper .wp-block-fincommerce-attribute-filter)',
	Block,
	getProps,
} );
