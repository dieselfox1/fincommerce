/**
 * External dependencies
 */
import { createReduxStore, register, subscribe } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/checkout/constants';
import * as selectors from '@fincommerce/block-library/assets/js/data/checkout/selectors';
import * as actions from '@fincommerce/block-library/assets/js/data/checkout/actions';
import reducer from '@fincommerce/block-library/assets/js/data/checkout/reducers';
import { pushChanges } from '@fincommerce/block-library/assets/js/data/checkout/push-changes';

export const config = {
	reducer,
	selectors,
	actions,
	__experimentalUseThunks: true,
};

export const store = createReduxStore( STORE_KEY, config );
register( store );
export type CheckoutStoreDescriptor = typeof store;

subscribe( pushChanges, store );

export const CHECKOUT_STORE_KEY = STORE_KEY;
