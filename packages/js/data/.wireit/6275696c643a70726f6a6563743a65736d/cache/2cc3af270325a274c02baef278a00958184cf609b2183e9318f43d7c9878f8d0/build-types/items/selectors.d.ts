import { ItemType, ItemsState, Query, ItemInfer } from './types';
export type getItemsType = <T extends ItemType>(itemType: T, query: Query, defaultValue?: Map<number, ItemInfer<T> | undefined>) => Map<number, ItemInfer<T> | undefined>;
type getItemsSelectorType = <T extends ItemType>(state: ItemsState, itemType: T, query: Query, defaultValue?: Map<number, ItemInfer<T> | undefined>) => Map<number, Map<number, ItemInfer<T> | undefined>>;
export declare const getItems: getItemsSelectorType & import("rememo").EnhancedSelector;
export declare const getItemsTotalCount: (state: ItemsState, itemType: ItemType, query: Query, defaultValue?: number) => number | {
    data: import("./types").ItemID[];
};
export declare const getItemsError: (state: ItemsState, itemType: ItemType, query: Query) => unknown;
export {};
//# sourceMappingURL=selectors.d.ts.map