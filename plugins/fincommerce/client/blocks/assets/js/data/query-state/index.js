/**
 * External dependencies
 */
import { register, createReduxStore } from '@finpress/data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/query-state/constants';
import * as selectors from '@fincommerce/block-library/assets/js/data/query-state/selectors';
import * as actions from '@fincommerce/block-library/assets/js/data/query-state/actions';
import reducer from '@fincommerce/block-library/assets/js/data/query-state/reducers';

const config = {
	reducer,
	actions,
	selectors,
};
export const store = createReduxStore( STORE_KEY, config );

register( store );

export const QUERY_STATE_STORE_KEY = STORE_KEY;
