/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from '@fincommerce/block-library/assets/js/data/validation/reducers';
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/validation/constants';
import * as actions from '@fincommerce/block-library/assets/js/data/validation/actions';
import * as selectors from '@fincommerce/block-library/assets/js/data/validation/selectors';

export const config = {
	reducer,
	selectors,
	actions,
};

export const store = createReduxStore( STORE_KEY, config );
register( store );
export type ValidationStoreDescriptor = typeof store;

export const VALIDATION_STORE_KEY = STORE_KEY;
