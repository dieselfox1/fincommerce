/**
 * External dependencies
 */
import { createReduxStore, register } from '@finpress/data';
import {
	ReduxStoreConfig,
	StoreDescriptor as GenericStoreDescriptor,
} from '@finpress/data/build-types/types';
import { controls } from '@finpress/data-controls';

/**
 * Internal dependencies
 */
import * as actions from './actions';
import { storeName } from './constants';
import { getInitialState } from './initial-state';
import { reducer } from './reducer';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

const getConfig = () =>
	( {
		actions,
		controls,
		selectors,
		resolvers,
		reducer,
		initialState: getInitialState(),
	} as const );

export type EditorStoreConfig = ReturnType< typeof getConfig >;

export const createStore = () => {
	const store = createReduxStore( storeName, getConfig() );
	register( store );
	return store;
};

export interface EmailEditorStore {
	getActions: () => EditorStoreConfig[ 'actions' ];
	getSelectors: () => EditorStoreConfig[ 'selectors' ];
}

declare module '@finpress/data' {
	interface StoreMap {
		[ storeName ]: GenericStoreDescriptor<
			ReduxStoreConfig<
				unknown,
				ReturnType< EmailEditorStore[ 'getActions' ] >,
				ReturnType< EmailEditorStore[ 'getSelectors' ] >
			>
		>;
	}
}

export { actions, selectors };
