/**
 * External dependencies
 */
import { createReduxStore, register } from '@finpress/data';
import { controls } from '@finpress/data-controls';

/**
 * Internal dependencies
 */
import { STORE_KEY } from './constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';
import reducer from './reducer';

export const store = createReduxStore( STORE_KEY, {
	actions,
	selectors,
	resolvers,
	controls,
	reducer,
} );

register( store );
