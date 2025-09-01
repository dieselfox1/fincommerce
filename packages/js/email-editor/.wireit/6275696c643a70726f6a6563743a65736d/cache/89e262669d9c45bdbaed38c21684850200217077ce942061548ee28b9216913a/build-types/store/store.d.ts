import { ReduxStoreConfig, StoreDescriptor as GenericStoreDescriptor } from '@wordpress/data/build-types/types';
/**
 * Internal dependencies
 */
import * as actions from './actions';
import { storeName } from './constants';
import { reducer } from './reducer';
import * as selectors from './selectors';
import * as resolvers from './resolvers';
declare const getConfig: () => {
    readonly actions: typeof actions;
    readonly controls: {
        AWAIT_PROMISE: <T>({ promise }: {
            promise: Promise<T>;
        }) => Promise<T>;
        API_FETCH({ request }: {
            request: import("@wordpress/api-fetch").APIFetchOptions;
        }): Promise<unknown>;
    };
    readonly selectors: typeof selectors;
    readonly resolvers: typeof resolvers;
    readonly reducer: typeof reducer;
    readonly initialState: import("./types").State;
};
export type EditorStoreConfig = ReturnType<typeof getConfig>;
export declare const createStore: () => GenericStoreDescriptor<ReduxStoreConfig<import("./types").State, typeof actions, typeof selectors>>;
export interface EmailEditorStore {
    getActions: () => EditorStoreConfig['actions'];
    getSelectors: () => EditorStoreConfig['selectors'];
}
declare module '@wordpress/data' {
    interface StoreMap {
        [storeName]: GenericStoreDescriptor<ReduxStoreConfig<unknown, ReturnType<EmailEditorStore['getActions']>, ReturnType<EmailEditorStore['getSelectors']>>>;
    }
}
export { actions, selectors };
