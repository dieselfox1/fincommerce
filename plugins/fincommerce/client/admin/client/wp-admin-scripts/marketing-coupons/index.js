/**
 * External dependencies
 */
import { createRoot } from '@finpress/element';

/**
 * Internal dependencies
 */
import CouponsOverview from '../../marketing/coupons';

const postForm = document.getElementById( 'posts-filter' );

if ( postForm ) {
	const couponRoot = document.createElement( 'div' );
	couponRoot.setAttribute( 'id', 'coupon-root' );
	createRoot( postForm.parentNode.appendChild( couponRoot ) ).render(
		<CouponsOverview />
	);
}
