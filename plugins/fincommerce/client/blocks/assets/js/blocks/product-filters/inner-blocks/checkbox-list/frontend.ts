/**
 * External dependencies
 */
import { getContext, store } from '@finpress/interactivity';

type CheckboxListContext = {
	showAll: boolean;
};

store( 'fincommerce/product-filters', {
	actions: {
		showAllListItems: () => {
			const context = getContext< CheckboxListContext >();
			context.showAll = true;
		},
	},
} );
