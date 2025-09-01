import { OrdersState } from './reducer';
import { OrdersQuery } from './types';
import { WPDataSelector, WPDataSelectors } from '../types';
export declare const getOrders: ((state: OrdersState, query: OrdersQuery, defaultValue?: any) => any) & import("rememo").EnhancedSelector;
export declare const getOrdersTotalCount: (state: OrdersState, query: OrdersQuery, defaultValue?: undefined) => number | undefined;
export declare const getOrdersError: (state: OrdersState, query: OrdersQuery) => unknown;
export type OrdersSelectors = {
    getOrders: WPDataSelector<typeof getOrders>;
    getOrdersTotalCount: WPDataSelector<typeof getOrdersTotalCount>;
    getOrdersError: WPDataSelector<typeof getOrdersError>;
} & WPDataSelectors;
//# sourceMappingURL=selectors.d.ts.map