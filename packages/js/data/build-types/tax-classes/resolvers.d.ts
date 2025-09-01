import { Item, ItemQuery } from '../crud/types';
export declare function getTaxClasses(query?: Partial<ItemQuery>): Generator<{
    type: import("../crud/action-types").TYPES.GET_ITEMS_ERROR;
    query: Partial<ItemQuery> | undefined;
    error: unknown;
    errorType: import("../crud/crud-actions").CRUD_ACTIONS;
} | {
    type: import("../crud/action-types").TYPES.GET_ITEMS_SUCCESS;
    items: Item[];
    query: Partial<ItemQuery> | undefined;
    urlParameters: import("../crud/types").IdType[];
} | {
    type: import("../crud/action-types").TYPES.GET_ITEMS_TOTAL_COUNT_SUCCESS;
    query: Partial<ItemQuery> | undefined;
    totalCount: number;
} | {
    type: import("../crud/action-types").TYPES.GET_ITEMS_TOTAL_COUNT_ERROR;
    query: Partial<ItemQuery> | undefined;
    error: unknown;
    errorType: import("../crud/crud-actions").CRUD_ACTIONS;
} | Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    items: Item[];
    totalCount: number;
} | undefined, Item[] | ({
    data: Item[];
} & Response)>, Item[], {
    items: Item[];
    totalCount: number;
}>;
//# sourceMappingURL=resolvers.d.ts.map