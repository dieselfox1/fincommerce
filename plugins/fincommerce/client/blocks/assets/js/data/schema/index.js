/**
 * External dependencies
 */
import { register, createReduxStore } from '@finpress/data';
import { controls } from '@finpress/data-controls';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/schema/constants';
import * as selectors from '@fincommerce/block-library/assets/js/data/schema/selectors';
import * as actions from '@fincommerce/block-library/assets/js/data/schema/actions';
import * as resolvers from '@fincommerce/block-library/assets/js/data/schema/resolvers';
import reducer from '@fincommerce/block-library/assets/js/data/schema/reducers';

const config = {
	reducer,
	actions,
	controls,
	selectors,
	resolvers,
};
export const store = createReduxStore( STORE_KEY, config );

register( store );

export const SCHEMA_STORE_KEY = STORE_KEY;
