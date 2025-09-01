/**
 * External dependencies
 */
import { createElement, useCallback, useEffect, useReducer, useRef, useState, } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
import { resolveSelect } from '@wordpress/data';
import { productsStore } from '@fincommerce/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { reusableBlock } from '@wordpress/icons';
import { recordEvent } from '@fincommerce/tracks';
import { useDebounce } from '@wordpress/compose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityId } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import useProductEntityProp from '../../../hooks/use-product-entity-prop';
import { ProductList, Skeleton } from '../../../components/product-list';
import { ProductSelect } from '../../../components/product-select';
import { AdviceCard } from '../../../components/advice-card';
import { TRACKS_SOURCE } from '../../../constants';
import { ShoppingBags } from '../../../images/shopping-bags';
import { CashRegister } from '../../../images/cash-register';
import { getLoadLinkedProductsDispatcher, getRemoveLinkedProductDispatcher, getSelectSearchedProductDispatcher, reducer, } from './reducer';
import { getSuggestedProductsFor } from '../../../utils/get-related-products';
import { SectionActions } from '../../../components/block-slot-fill';
export function EmptyStateImage({ image, tip: description, }) {
    switch (image) {
        case 'CashRegister':
            return createElement(CashRegister, null);
        case 'ShoppingBags':
            return createElement(ShoppingBags, null);
        default:
            if (/^https?:\/\//.test(image)) {
                return (createElement("img", { src: image, alt: description, height: 88, width: 88 }));
            }
            return null;
    }
}
async function getProductsBySearchValue(searchValue = '', excludedIds = []) {
    return resolveSelect(productsStore).getProducts({
        search: searchValue,
        orderby: 'title',
        order: 'asc',
        per_page: 5,
        exclude: excludedIds,
    });
}
export function LinkedProductListBlockEdit({ attributes, context: { postType, isInSelectedTab }, }) {
    const { property, emptyState } = attributes;
    const loadInitialSearchResults = useRef(false);
    const [, setSearchValue] = useState('');
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const blockProps = useWooBlockProps(attributes);
    const [state, dispatch] = useReducer(reducer, {
        linkedProducts: [],
    });
    const productId = useEntityId('postType', postType);
    const loadLinkedProductsDispatcher = getLoadLinkedProductsDispatcher(dispatch);
    const selectSearchedProductDispatcher = getSelectSearchedProductDispatcher(dispatch);
    const removeLinkedProductDispatcher = getRemoveLinkedProductDispatcher(dispatch);
    const [linkedProductIds, setLinkedProductIds] = useProductEntityProp(property, { postType });
    useEffect(() => {
        if (!state.selectedProduct &&
            linkedProductIds &&
            linkedProductIds.length > 0) {
            loadLinkedProductsDispatcher(linkedProductIds);
        }
    }, [linkedProductIds, state.selectedProduct]);
    function searchProducts(search = '', excludedIds = []) {
        setSearchValue(search);
        setIsSearching(true);
        return getProductsBySearchValue(search, excludedIds)
            .then((products) => {
            setSearchedProducts(products);
        })
            .finally(() => {
            setIsSearching(false);
        });
    }
    const debouncedFilter = useDebounce(function filter(search = '') {
        searchProducts(search, [...(linkedProductIds || []), productId]);
    }, 300);
    useEffect(() => {
        // Only filter when the tab is selected and initial search results haven't been loaded yet.
        if (!isInSelectedTab || loadInitialSearchResults.current) {
            return;
        }
        loadInitialSearchResults.current = true;
        searchProducts('', [...(linkedProductIds || []), productId]);
    }, [
        isInSelectedTab,
        loadInitialSearchResults,
        linkedProductIds,
        productId,
    ]);
    const handleSelect = useCallback((product) => {
        const isAlreadySelected = (linkedProductIds || []).includes(product.id);
        if (isAlreadySelected) {
            return;
        }
        const newLinkedProductIds = selectSearchedProductDispatcher(product, state.linkedProducts);
        setLinkedProductIds(newLinkedProductIds);
        searchProducts('', [
            ...(newLinkedProductIds || []),
            productId,
        ]);
        recordEvent('linked_products_product_add', {
            source: TRACKS_SOURCE,
            field: property,
            product_id: productId,
            linked_product_id: product.id,
        });
    }, [linkedProductIds, state.linkedProducts]);
    function handleProductListRemove(product) {
        const newLinkedProductIds = removeLinkedProductDispatcher(product, state.linkedProducts);
        setLinkedProductIds(newLinkedProductIds);
        searchProducts('', [...(newLinkedProductIds || []), productId]);
        recordEvent('linked_products_product_remove', {
            source: TRACKS_SOURCE,
            field: property,
            product_id: productId,
            linked_product_id: product.id,
        });
    }
    function handleProductListEdit(product) {
        recordEvent('linked_products_product_select', {
            source: TRACKS_SOURCE,
            field: property,
            product_id: productId,
            linked_product_id: product.id,
        });
    }
    function handleProductListPreview(product) {
        recordEvent('linked_products_product_preview_click', {
            source: TRACKS_SOURCE,
            field: property,
            product_id: productId,
            linked_product_id: product.id,
        });
    }
    const [isChoosingProducts, setIsChoosingProducts] = useState(false);
    async function chooseProductsForMe() {
        recordEvent('linked_products_choose_related_click', {
            source: TRACKS_SOURCE,
            field: property,
        });
        dispatch({
            type: 'LOADING_LINKED_PRODUCTS',
            payload: {
                isLoading: true,
            },
        });
        setIsChoosingProducts(true);
        const linkedProducts = (await getSuggestedProductsFor({
            postId: productId,
            forceRequest: true,
        }));
        dispatch({
            type: 'LOADING_LINKED_PRODUCTS',
            payload: {
                isLoading: false,
            },
        });
        setIsChoosingProducts(false);
        if (!linkedProducts) {
            return;
        }
        const newLinkedProducts = selectSearchedProductDispatcher(linkedProducts, []);
        setLinkedProductIds(newLinkedProducts);
    }
    function handleAdviceCardDismiss() {
        recordEvent('linked_products_placeholder_dismiss', {
            source: TRACKS_SOURCE,
            field: property,
        });
    }
    return (createElement("div", { ...blockProps },
        createElement(SectionActions, null,
            createElement(Button, { variant: "tertiary", icon: reusableBlock, onClick: chooseProductsForMe, isBusy: isChoosingProducts, disabled: isChoosingProducts }, __('Choose products for me', 'fincommerce'))),
        createElement("div", { className: "wp-block-fincommerce-product-linked-list-field__form-group-content" },
            createElement(ProductSelect, { items: searchedProducts, filter: debouncedFilter, onSelect: handleSelect, isLoading: isSearching, selected: null })),
        state.isLoading && createElement(Skeleton, null),
        !state.isLoading && state.linkedProducts.length === 0 && (createElement(AdviceCard, { tip: emptyState.tip, dismissPreferenceId: `fincommerce-product-${property}-advice-card-dismissed`, isDismissible: emptyState.isDismissible, onDismiss: handleAdviceCardDismiss },
            createElement(EmptyStateImage, { ...emptyState }))),
        !state.isLoading && state.linkedProducts.length > 0 && (createElement(ProductList, { products: state.linkedProducts, onRemove: handleProductListRemove, onEdit: handleProductListEdit, onPreview: handleProductListPreview }))));
}
