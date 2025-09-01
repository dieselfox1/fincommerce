/**
 * External dependencies
 */
import { createReduxStore, register, subscribe } from '@wordpress/data';
import { controls as dataControls } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import reducer from '@fincommerce/block-library/assets/js/data/payment/reducers';
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/payment/constants';
import * as actions from '@fincommerce/block-library/assets/js/data/payment/actions';
import { controls as sharedControls } from '@fincommerce/block-library/assets/js/data/shared-controls';
import * as selectors from '@fincommerce/block-library/assets/js/data/payment/selectors';
import { pushChanges } from '@fincommerce/block-library/assets/js/data/checkout/push-changes';

export const PAYMENT_STORE_KEY = STORE_KEY;
export const config = {
	reducer,
	selectors,
	actions,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	controls: { ...dataControls, ...sharedControls } as any,
	__experimentalUseThunks: true,
};

export const store = createReduxStore( STORE_KEY, config );
export type PaymentStoreDescriptor = typeof store;
register( store );
subscribe( pushChanges, store );
