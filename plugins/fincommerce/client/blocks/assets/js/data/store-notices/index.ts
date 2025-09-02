/**
 * External dependencies
 */
import { createReduxStore, register } from '@finpress/data';

/**
 * Internal dependencies
 */
import * as actions from '@fincommerce/block-library/assets/js/data/store-notices/actions';
import * as selectors from '@fincommerce/block-library/assets/js/data/store-notices/selectors';
import reducer from '@fincommerce/block-library/assets/js/data/store-notices/reducers';

const STORE_KEY = 'wc/store/store-notices';
const config = {
	reducer,
	actions,
	selectors,
};
export const store = createReduxStore( STORE_KEY, config );
export type StoreNoticesStoreDescriptor = typeof store;
register( store );

export const STORE_NOTICES_STORE_KEY = STORE_KEY;
