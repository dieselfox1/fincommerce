/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { createSelectors } from './selectors';
import { createDispatchActions } from './actions';
import defaultControls from '../controls';
import { createResolvers } from './resolvers';
import { createReducer } from './reducer';
export const createCrudDataStore = ({ storeName, resourceName, namespace, pluralResourceName, storeConfig, }) => {
    const crudActions = createDispatchActions({
        resourceName,
        namespace,
    });
    const crudResolvers = createResolvers({
        storeName,
        resourceName,
        pluralResourceName,
        namespace,
    });
    const crudSelectors = createSelectors({
        resourceName,
        pluralResourceName,
        namespace,
    });
    const { reducer, actions = {}, selectors = {}, resolvers = {}, controls = {}, } = storeConfig || {};
    const crudReducer = reducer ? createReducer(reducer) : createReducer();
    const store = createReduxStore(storeName, {
        reducer: crudReducer,
        actions: { ...crudActions, ...actions },
        selectors: {
            ...crudSelectors,
            ...selectors,
        },
        resolvers: { ...crudResolvers, ...resolvers },
        controls: {
            ...defaultControls,
            ...controls,
        },
    });
    register(store);
    return store;
};
