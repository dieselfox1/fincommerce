import { IdQuery, IdType, Item, ItemQuery } from './types';
import { ResourceState } from './reducer';
export declare const getItemCreateError: (state: ResourceState, query: ItemQuery) => unknown;
export declare const getItemDeleteError: (state: ResourceState, idQuery: IdQuery, namespace: string) => unknown;
export declare const getItem: (state: ResourceState, idQuery: IdQuery, namespace: string) => Item;
export declare const getItemError: (state: ResourceState, idQuery: IdQuery, namespace: string) => unknown;
export declare const getItems: ((state: ResourceState, query?: ItemQuery) => Partial<Item>[] | null) & import("rememo").EnhancedSelector;
export declare const getItemsTotalCount: (state: ResourceState, query: ItemQuery, defaultValue?: undefined) => number | undefined;
export declare const getItemsError: (state: ResourceState, query?: ItemQuery) => unknown;
export declare const getItemUpdateError: (state: ResourceState, idQuery: IdQuery, urlParameters: IdType[]) => unknown;
export declare const createSelectors: ({ resourceName, pluralResourceName, namespace, }: {
    resourceName: string;
    pluralResourceName: string;
    namespace: string;
}) => {
    [x: string]: ((state: ResourceState, idQuery: IdQuery, namespace: string) => unknown) | ((state: ResourceState, query: ItemQuery, defaultValue?: undefined) => unknown) | ((state: ResourceState, idQuery: IdQuery, urlParameters: IdType[]) => unknown) | ((state: ResourceState, action: string, args?: never[]) => boolean | undefined);
    hasFinishedRequest: (state: ResourceState, action: string, args?: never[]) => boolean | undefined;
    isRequesting: (state: ResourceState, action: string, args?: never[]) => boolean;
};
//# sourceMappingURL=selectors.d.ts.map