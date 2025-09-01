/**
 * External dependencies
 */
import { register, createReduxStore } from '@wordpress/data';
import { controls as dataControls } from '@wordpress/data-controls';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/collections/constants';
import * as selectors from '@fincommerce/block-library/assets/js/data/collections/selectors';
import * as actions from '@fincommerce/block-library/assets/js/data/collections/actions';
import * as resolvers from '@fincommerce/block-library/assets/js/data/collections/resolvers';
import reducer from '@fincommerce/block-library/assets/js/data/collections/reducers';
import { controls } from '@fincommerce/block-library/assets/js/data/shared-controls';

const config = {
	reducer,
	actions,
	controls: { ...dataControls, ...controls },
	selectors,
	resolvers,
};
export const store = createReduxStore( STORE_KEY, config );

register( store );

export const COLLECTIONS_STORE_KEY = STORE_KEY;
