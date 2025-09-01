/**
 * External dependencies
 */
import { getElement, store } from '@wordpress/interactivity';

function isValidLink( ref: HTMLElement | null ): ref is HTMLAnchorElement {
	return (
		ref !== null &&
		ref instanceof window.HTMLAnchorElement &&
		!! ref.href &&
		( ! ref.target || ref.target === '_self' ) &&
		ref.origin === window.location.origin
	);
}

const productReviewsStore = {
	actions: {
		*navigate( event: MouseEvent ) {
			event.preventDefault();
			const { ref } = getElement();

			if ( ! isValidLink( ref ) ) {
				return;
			}

			const { actions } = yield import(
				'@wordpress/interactivity-router'
			);

			yield actions.navigate( ref.href );

			ref.closest(
				'.wp-block-fincommerce-product-details'
			)?.scrollIntoView( {
				behavior: 'smooth',
				block: 'start',
			} );
		},
	},
};

store< typeof productReviewsStore >(
	'fincommerce/product-reviews',
	productReviewsStore,
	{
		lock: true,
	}
);
