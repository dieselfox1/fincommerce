import CRUD_ACTIONS from './crud-actions';
import TYPES from './action-types';
import { IdType, IdQuery, Item, ItemQuery, CrudActionOptions } from './types';
type ResolverOptions<ResourceName extends string> = {
    resourceName: ResourceName;
    namespace: string;
};
export declare function createItemError(query: Partial<ItemQuery>, error: unknown): {
    type: TYPES.CREATE_ITEM_ERROR;
    query: Partial<ItemQuery>;
    error: unknown;
    errorType: CRUD_ACTIONS;
};
export declare function createItemRequest(query: Partial<ItemQuery>): {
    type: TYPES.CREATE_ITEM_REQUEST;
    query: Partial<ItemQuery>;
};
export declare function createItemSuccess(key: IdType, item: Item, query: Partial<ItemQuery>, options?: CrudActionOptions): {
    type: TYPES.CREATE_ITEM_SUCCESS;
    key: IdType;
    item: Item;
    query: Partial<ItemQuery>;
    options: CrudActionOptions | undefined;
};
export declare function deleteItemError(key: IdType, error: unknown, force: boolean): {
    type: TYPES.DELETE_ITEM_ERROR;
    key: IdType;
    error: unknown;
    errorType: CRUD_ACTIONS;
    force: boolean;
};
export declare function deleteItemRequest(key: IdType, force: boolean): {
    type: TYPES.DELETE_ITEM_REQUEST;
    key: IdType;
    force: boolean;
};
export declare function deleteItemSuccess(key: IdQuery, force: boolean, item: Item): {
    type: TYPES.DELETE_ITEM_SUCCESS;
    key: IdQuery;
    force: boolean;
    item: Item;
};
export declare function getItemError(key: IdType, error: unknown): {
    type: TYPES.GET_ITEM_ERROR;
    key: IdType;
    error: unknown;
    errorType: CRUD_ACTIONS;
};
export declare function getItemSuccess(key: IdType, item: Item): {
    type: TYPES.GET_ITEM_SUCCESS;
    key: IdType;
    item: Item;
};
export declare function getItemsError(query: Partial<ItemQuery> | undefined, error: unknown): {
    type: TYPES.GET_ITEMS_ERROR;
    query: Partial<ItemQuery> | undefined;
    error: unknown;
    errorType: CRUD_ACTIONS;
};
export declare function getItemsSuccess(query: Partial<ItemQuery> | undefined, items: Item[], urlParameters: IdType[]): {
    type: TYPES.GET_ITEMS_SUCCESS;
    items: Item[];
    query: Partial<ItemQuery> | undefined;
    urlParameters: IdType[];
};
export declare function getItemsTotalCountSuccess(query: Partial<ItemQuery> | undefined, totalCount: number): {
    type: TYPES.GET_ITEMS_TOTAL_COUNT_SUCCESS;
    query: Partial<ItemQuery> | undefined;
    totalCount: number;
};
export declare function getItemsTotalCountError(query: Partial<ItemQuery> | undefined, error: unknown): {
    type: TYPES.GET_ITEMS_TOTAL_COUNT_ERROR;
    query: Partial<ItemQuery> | undefined;
    error: unknown;
    errorType: CRUD_ACTIONS;
};
export declare function updateItemError(key: IdType, error: unknown, query: Partial<ItemQuery>): {
    type: TYPES.UPDATE_ITEM_ERROR;
    key: IdType;
    error: unknown;
    errorType: CRUD_ACTIONS;
    query: Partial<ItemQuery>;
};
export declare function updateItemRequest(key: IdType, query: Partial<ItemQuery>): {
    type: TYPES.UPDATE_ITEM_REQUEST;
    key: IdType;
    query: Partial<ItemQuery>;
};
export declare function updateItemSuccess(key: IdType, item: Item, query: Partial<ItemQuery>): {
    type: TYPES.UPDATE_ITEM_SUCCESS;
    key: IdType;
    item: Item;
    query: Partial<ItemQuery>;
};
export declare const createDispatchActions: <ResourceName extends string, ResourceType extends Item>({ namespace, resourceName, }: ResolverOptions<ResourceName>) => {
    [x: string]: ((query: Partial<ItemQuery>, options?: CrudActionOptions) => Generator<{
        type: string;
        request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
    } | {
        type: TYPES.CREATE_ITEM_ERROR;
        query: Partial<ItemQuery>;
        error: unknown;
        errorType: CRUD_ACTIONS;
    } | {
        type: TYPES.CREATE_ITEM_REQUEST;
        query: Partial<ItemQuery>;
    } | {
        type: TYPES.CREATE_ITEM_SUCCESS;
        key: IdType;
        item: Item;
        query: Partial<ItemQuery>;
        options: CrudActionOptions | undefined;
    }, ResourceType, ResourceType>) | ((idQuery: IdQuery, force?: boolean) => Generator<{
        type: string;
        request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
    } | {
        type: TYPES.DELETE_ITEM_ERROR;
        key: IdType;
        error: unknown;
        errorType: CRUD_ACTIONS;
        force: boolean;
    } | {
        type: TYPES.DELETE_ITEM_REQUEST;
        key: IdType;
        force: boolean;
    } | {
        type: TYPES.DELETE_ITEM_SUCCESS;
        key: IdQuery;
        force: boolean;
        item: Item;
    }, ResourceType, ResourceType>) | ((idQuery: IdQuery, query: Partial<ItemQuery>) => Generator<{
        type: string;
        request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
    } | {
        type: TYPES.UPDATE_ITEM_ERROR;
        key: IdType;
        error: unknown;
        errorType: CRUD_ACTIONS;
        query: Partial<ItemQuery>;
    } | {
        type: TYPES.UPDATE_ITEM_REQUEST;
        key: IdType;
        query: Partial<ItemQuery>;
    } | {
        type: TYPES.UPDATE_ITEM_SUCCESS;
        key: IdType;
        item: Item;
        query: Partial<ItemQuery>;
    }, ResourceType, ResourceType>);
};
export type Actions = ReturnType<typeof createItemError | typeof createItemRequest | typeof createItemSuccess | typeof deleteItemError | typeof deleteItemRequest | typeof deleteItemSuccess | typeof getItemError | typeof getItemSuccess | typeof getItemsError | typeof getItemsSuccess | typeof getItemsTotalCountSuccess | typeof getItemsTotalCountError | typeof updateItemError | typeof updateItemRequest | typeof updateItemSuccess>;
export {};
//# sourceMappingURL=actions.d.ts.map