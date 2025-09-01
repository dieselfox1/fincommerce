import { Product } from '@fincommerce/data';
export type State = {
    linkedProducts: Product[];
    isLoading?: boolean;
    selectedProduct?: Product | Product[];
};
export type ActionType = 'LOADING_LINKED_PRODUCTS' | 'SET_LINKED_PRODUCTS' | 'SELECT_SEARCHED_PRODUCT' | 'REMOVE_LINKED_PRODUCT';
export type Action = {
    type: ActionType;
    payload: Partial<State>;
};
export declare function reducer(state: State, action: Action): State;
export declare function getLoadLinkedProductsDispatcher(dispatch: (value: Action) => void): (linkedProductIds: number[]) => Promise<Product[]>;
export declare function getSelectSearchedProductDispatcher(dispatch: (value: Action) => void): (selectedProduct: Product | Product[], linkedProducts: Product[]) => number[];
export declare function getRemoveLinkedProductDispatcher(dispatch: (value: Action) => void): (selectedProduct: Product, linkedProducts: Product[]) => number[];
//# sourceMappingURL=reducer.d.ts.map