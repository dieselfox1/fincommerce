import { Order, OrdersQuery } from './types';
export declare function getOrders(query: Partial<OrdersQuery>): Generator<{
    type: import("./action-types").TYPES.GET_ORDERS_SUCCESS;
    orders: import("./types").PartialOrder[];
    query: Partial<OrdersQuery>;
    totalCount: number;
} | {
    type: import("./action-types").TYPES.GET_ORDERS_ERROR;
    query: Partial<OrdersQuery>;
    error: unknown;
} | {
    type: import("./action-types").TYPES.GET_ORDERS_TOTAL_COUNT_SUCCESS;
    query: Partial<OrdersQuery>;
    totalCount: number;
} | Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    items: Order[];
    totalCount: number;
} | undefined, Order[] | ({
    data: Order[];
} & Response)>, unknown, {
    items: Order[];
    totalCount: number;
}>;
export declare function getOrdersTotalCount(query: Partial<OrdersQuery>): Generator<{
    type: import("./action-types").TYPES.GET_ORDERS_TOTAL_COUNT_SUCCESS;
    query: Partial<OrdersQuery>;
    totalCount: number;
} | {
    type: import("./action-types").TYPES.GET_ORDERS_TOTAL_COUNT_ERROR;
    query: Partial<OrdersQuery>;
    error: unknown;
} | Generator<(import("redux").AnyAction & {
    options: import("@wordpress/api-fetch").APIFetchOptions;
}) | {
    type: string;
    request: import("@wordpress/api-fetch/build-types/types").APIFetchOptions;
}, {
    items: Order[];
    totalCount: number;
} | undefined, Order[] | ({
    data: Order[];
} & Response)>, any, {
    totalCount: any;
}>;
//# sourceMappingURL=resolvers.d.ts.map