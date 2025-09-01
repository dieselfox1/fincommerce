/**
 * External dependencies
 */
import { renderParentBlock } from '@fincommerce/atomic-utils';
import { getRegisteredBlockComponents } from '@fincommerce/blocks-registry';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/filter-wrapper/block';

renderParentBlock( {
	blockName: 'fincommerce/filter-wrapper',
	selector: '.wp-block-fincommerce-filter-wrapper',
	Block,
	blockMap: getRegisteredBlockComponents( 'fincommerce/filter-wrapper' ),
	options: {
		multiple: true,
	},
	getProps: () => ( {} ),
} );
