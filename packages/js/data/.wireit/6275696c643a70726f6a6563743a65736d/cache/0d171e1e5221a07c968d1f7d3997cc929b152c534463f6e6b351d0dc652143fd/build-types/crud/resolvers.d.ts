import { IdQuery, Item, ItemQuery } from './types';
type ResolverOptions = {
    storeName: string;
    resourceName: string;
    pluralResourceName: string;
    namespace: string;
};
export declare const createResolvers: ({ storeName, resourceName, pluralResourceName, namespace, }: ResolverOptions) => {
    [x: string]: ((idQuery: IdQuery) => Generator<{
        type: string;
        request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
    } | {
        type: import("./action-types").TYPES.GET_ITEM_ERROR;
        key: import("./types").IdType;
        error: unknown;
        errorType: import("./crud-actions").CRUD_ACTIONS;
    } | {
        type: import("./action-types").TYPES.GET_ITEM_SUCCESS;
        key: import("./types").IdType;
        item: Item;
    }, Item, Item>) | ((query?: Partial<ItemQuery>) => Generator<Object, Item[], {
        items: Item[];
        totalCount: number;
    }>) | ((query?: Partial<ItemQuery>) => Generator<Object, unknown, (false & {
        totalCount: any;
    }) | (true & {
        totalCount: any;
    })>);
};
export {};
//# sourceMappingURL=resolvers.d.ts.map