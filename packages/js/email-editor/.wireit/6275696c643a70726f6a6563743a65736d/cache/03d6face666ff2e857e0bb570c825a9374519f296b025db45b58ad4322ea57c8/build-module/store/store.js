/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
import { controls } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */
import * as actions from './actions';
import { storeName } from './constants';
import { getInitialState } from './initial-state';
import { reducer } from './reducer';
import * as selectors from './selectors';
import * as resolvers from './resolvers';
const getConfig = () => ({
    actions,
    controls,
    selectors,
    resolvers,
    reducer,
    initialState: getInitialState(),
});
export const createStore = () => {
    const store = createReduxStore(storeName, getConfig());
    register(store);
    return store;
};
export { actions, selectors };
