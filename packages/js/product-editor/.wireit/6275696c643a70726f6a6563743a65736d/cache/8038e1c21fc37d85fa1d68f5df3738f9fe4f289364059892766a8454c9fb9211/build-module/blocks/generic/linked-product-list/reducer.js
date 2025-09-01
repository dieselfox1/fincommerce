/**
 * External dependencies
 */
import { resolveSelect } from '@wordpress/data';
import { productsStore } from '@fincommerce/data';
export function reducer(state, action) {
    switch (action.type) {
        case 'SELECT_SEARCHED_PRODUCT':
        case 'REMOVE_LINKED_PRODUCT':
            if (action.payload.selectedProduct) {
                return {
                    ...state,
                    ...action.payload,
                };
            }
            return state;
        default:
            return {
                ...state,
                ...action.payload,
            };
    }
}
export function getLoadLinkedProductsDispatcher(dispatch) {
    return async function loadLinkedProductsDispatcher(linkedProductIds) {
        if (linkedProductIds.length === 0) {
            dispatch({
                type: 'SET_LINKED_PRODUCTS',
                payload: {
                    linkedProducts: [],
                },
            });
            return Promise.resolve([]);
        }
        dispatch({
            type: 'LOADING_LINKED_PRODUCTS',
            payload: {
                isLoading: true,
            },
        });
        return resolveSelect(productsStore)
            .getProducts({
            include: linkedProductIds,
        })
            .then((response) => {
            dispatch({
                type: 'SET_LINKED_PRODUCTS',
                payload: {
                    linkedProducts: response,
                },
            });
            return response;
        })
            .finally(() => {
            dispatch({
                type: 'LOADING_LINKED_PRODUCTS',
                payload: {
                    isLoading: false,
                },
            });
        });
    };
}
export function getSelectSearchedProductDispatcher(dispatch) {
    return function selectSearchedProductDispatcher(selectedProduct, linkedProducts) {
        if (!Array.isArray(selectedProduct)) {
            selectedProduct = [selectedProduct];
        }
        const newLinkedProducts = [...linkedProducts, ...selectedProduct];
        dispatch({
            type: 'SELECT_SEARCHED_PRODUCT',
            payload: { selectedProduct, linkedProducts: newLinkedProducts },
        });
        return newLinkedProducts.map((product) => product.id);
    };
}
export function getRemoveLinkedProductDispatcher(dispatch) {
    return function removeLinkedProductDispatcher(selectedProduct, linkedProducts) {
        const newLinkedProducts = linkedProducts.reduce((list, current) => {
            if (current.id === selectedProduct.id) {
                return list;
            }
            return [...list, current];
        }, []);
        dispatch({
            type: 'REMOVE_LINKED_PRODUCT',
            payload: { selectedProduct, linkedProducts: newLinkedProducts },
        });
        return newLinkedProducts.map((product) => product.id);
    };
}
