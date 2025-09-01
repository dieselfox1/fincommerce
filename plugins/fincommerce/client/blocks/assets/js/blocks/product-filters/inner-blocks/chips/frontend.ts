/**
 * External dependencies
 */
import { getContext, store } from '@wordpress/interactivity';

/**
 * Internal dependencies
 */
import setStyles from '@fincommerce/block-library/assets/js/blocks/product-filters/inner-blocks/chips/set-styles';

export type ChipsContext = {
	showAll: boolean;
};

// Set selected chips styles for proper contrast.
setStyles();

store( 'fincommerce/product-filters', {
	actions: {
		showAllChips: () => {
			const context = getContext< ChipsContext >();
			context.showAll = true;
		},
	},
} );
