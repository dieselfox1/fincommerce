import { AnyAction } from 'redux';
import { ResourceState } from './reducer';
type AnyArguments = any[];
interface CrudStoreParams<Actions extends Record<string, (...args: AnyArguments) => unknown>, Selectors, Resolvers = Record<string, (...args: AnyArguments) => unknown>, Controls = Record<string, (...args: AnyArguments) => unknown>, Reducer extends (state: ResourceState | undefined, action: AnyAction) => ResourceState = (state: ResourceState | undefined, action: AnyAction) => ResourceState> {
    storeName: string;
    resourceName: string;
    namespace: string;
    pluralResourceName: string;
    storeConfig?: {
        reducer?: Reducer;
        actions?: Actions;
        selectors?: Selectors;
        resolvers?: Resolvers;
        controls?: Controls;
    };
}
export declare const createCrudDataStore: <Actions extends Record<string, (...args: AnyArguments) => unknown> = Record<string, (...args: AnyArguments) => unknown>, Selectors = unknown>({ storeName, resourceName, namespace, pluralResourceName, storeConfig, }: CrudStoreParams<Actions, Selectors>) => import("@wordpress/data/build-types/types").StoreDescriptor<import("@wordpress/data/build-types/types").ReduxStoreConfig<unknown, Actions, Selectors>>;
export {};
//# sourceMappingURL=index.d.ts.map