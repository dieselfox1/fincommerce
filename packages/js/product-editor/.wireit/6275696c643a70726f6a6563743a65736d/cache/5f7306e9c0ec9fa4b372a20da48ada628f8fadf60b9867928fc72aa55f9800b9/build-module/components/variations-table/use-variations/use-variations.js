/**
 * External dependencies
 */
import { experimentalProductVariationsStore, } from '@fincommerce/data';
import { dispatch, resolveSelect } from '@wordpress/data';
import { useCallback, useMemo, useRef, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { DEFAULT_VARIATION_PER_PAGE_OPTION } from '../../../constants';
import { useProductVariationsHelper } from '../../../hooks/use-product-variations-helper';
export function useVariations({ productId }) {
    // Variation pagination
    const [variations, setVariations] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [getVariationsError, setGetVariationsError] = useState();
    const [filters, setFilters] = useState([]);
    const perPageRef = useRef(DEFAULT_VARIATION_PER_PAGE_OPTION);
    async function getCurrentVariationsPage(params, invalidateResolutionBeforeRequest = false) {
        const requestParams = {
            product_id: params.product_id,
            page: params.page || 1,
            per_page: params.per_page || perPageRef.current,
            order: params.order || 'asc',
            orderby: (params.orderby || 'menu_order'),
            attributes: params.attributes || [],
        };
        try {
            const { invalidateResolution } = dispatch(experimentalProductVariationsStore);
            if (invalidateResolutionBeforeRequest) {
                await invalidateResolution('getProductVariations', [
                    requestParams,
                ]);
                await invalidateResolution('getProductVariationsTotalCount', [
                    requestParams,
                ]);
            }
            const { getProductVariations, getProductVariationsTotalCount } = resolveSelect(experimentalProductVariationsStore);
            setIsLoading(true);
            setGetVariationsError(undefined);
            const data = await getProductVariations(requestParams);
            const total = await getProductVariationsTotalCount(requestParams);
            setVariations(data);
            setTotalCount(total);
            setIsLoading(false);
        }
        catch (error) {
            setGetVariationsError(error);
            setIsLoading(false);
        }
    }
    function onPageChange(page) {
        getCurrentVariationsPage({
            product_id: productId,
            attributes: filters,
            page,
        });
    }
    function onPerPageChange(perPage) {
        perPageRef.current = perPage;
        getCurrentVariationsPage({
            product_id: productId,
            attributes: filters,
        });
    }
    // Variation selection
    const [selectedCount, setSelectedCount] = useState(0);
    const [isSelectingAll, setIsSelectingAll] = useState(false);
    const selectedVariationsRef = useRef({});
    const selected = useMemo(function getSelected() {
        return selectedCount > 0
            ? Object.values(selectedVariationsRef.current)
            : [];
    }, [selectedCount]);
    const isSelected = useCallback(function isSelected(variation) {
        return (selectedCount > 0 &&
            variation.id in selectedVariationsRef.current);
    }, [selectedCount]);
    const areAllSelected = useMemo(() => selectedCount > 0 && variations.every(isSelected), [variations, selectedCount, isSelected]);
    const areSomeSelected = useMemo(() => selectedCount > 0 && variations.some(isSelected), [variations, selectedCount, isSelected]);
    function onSelect(variation) {
        return function handleChange(checked) {
            if (checked) {
                selectedVariationsRef.current[variation.id] = variation;
                setSelectedCount((current) => current + 1);
            }
            else {
                delete selectedVariationsRef.current[variation.id];
                setSelectedCount((current) => current - 1);
            }
        };
    }
    function onSelectPage(checked) {
        if (checked) {
            variations.forEach((variation) => {
                selectedVariationsRef.current[variation.id] = variation;
            });
        }
        else {
            variations.forEach((variation) => {
                delete selectedVariationsRef.current[variation.id];
            });
        }
        setSelectedCount(Object.keys(selectedVariationsRef.current).length);
    }
    async function onSelectAll() {
        setIsSelectingAll(true);
        const { getProductVariations } = resolveSelect(experimentalProductVariationsStore);
        let currentPage = 1;
        let fetchedCount = 0;
        while (fetchedCount < totalCount) {
            const chunk = await getProductVariations({
                product_id: productId,
                page: currentPage++,
                per_page: 50,
                order: 'asc',
                orderby: 'menu_order',
                attributes: filters,
            });
            fetchedCount += chunk.length;
            chunk.forEach((variation) => {
                selectedVariationsRef.current[variation.id] = variation;
            });
        }
        setSelectedCount(fetchedCount);
        setIsSelectingAll(false);
        return fetchedCount;
    }
    function onClearSelection() {
        selectedVariationsRef.current = {};
        setSelectedCount(0);
    }
    // Filters
    function onFilter(attribute) {
        return function handleFilter(options) {
            let isPresent = false;
            const newFilters = filters.reduce((prev, item) => {
                if (item.attribute === attribute.slug) {
                    isPresent = true;
                    if (options.length === 0) {
                        return prev;
                    }
                    return [...prev, { ...item, terms: options }];
                }
                return [...prev, item];
            }, []);
            if (!isPresent) {
                newFilters.push({
                    attribute: attribute.slug,
                    terms: options,
                });
            }
            onClearSelection();
            getCurrentVariationsPage({
                product_id: productId,
                attributes: newFilters,
            });
            setFilters(newFilters);
        };
    }
    function getFilters(attribute) {
        return (filters.find((filter) => filter.attribute === attribute.slug)
            ?.terms ?? []);
    }
    function hasFilters() {
        return Boolean(filters.length);
    }
    async function clearFilters() {
        setFilters([]);
        return getCurrentVariationsPage({
            product_id: productId,
        });
    }
    // Updating
    const [isUpdating, setIsUpdating] = useState({});
    async function onUpdate({ id: variationId, ...variation }) {
        if (isUpdating[variationId])
            return;
        setVariations((current) => current.map((currentVariation) => {
            if (currentVariation.id === variationId) {
                return {
                    ...currentVariation,
                    ...variation,
                };
            }
            return currentVariation;
        }));
        const { updateProductVariation } = dispatch(experimentalProductVariationsStore);
        return updateProductVariation({ product_id: productId, id: variationId }, variation).then(async (response) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await dispatch('core').invalidateResolution('getEntityRecord', [
                'postType',
                'product_variation',
                variationId,
            ]);
            await getCurrentVariationsPage({
                product_id: productId,
                attributes: filters,
            });
            return response;
        });
    }
    async function onDelete(variationId) {
        if (isUpdating[variationId])
            return;
        const { deleteProductVariation, invalidateResolutionForStore } = dispatch(experimentalProductVariationsStore);
        return deleteProductVariation({
            product_id: productId,
            id: variationId,
        }).then(async (response) => {
            onSelect(response)(false);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await dispatch('core').invalidateResolution('getEntityRecord', [
                'postType',
                'product',
                productId,
            ]);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await dispatch('core').invalidateResolution('getEntityRecord', [
                'postType',
                'product_variation',
                variationId,
            ]);
            await invalidateResolutionForStore();
            await getCurrentVariationsPage({
                product_id: productId,
                attributes: filters,
            });
            return response;
        });
    }
    async function onBatchUpdate(values) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { invalidateResolution: coreInvalidateResolution } = dispatch('core');
        const { batchUpdateProductVariations, invalidateResolutionForStore } = dispatch(experimentalProductVariationsStore);
        selectedVariationsRef.current = {};
        setSelectedCount(0);
        let currentPage = 1;
        const offset = 50;
        const result = [];
        while ((currentPage - 1) * offset < values.length) {
            const fromIndex = (currentPage - 1) * offset;
            const toIndex = fromIndex + offset;
            const subset = values.slice(fromIndex, toIndex);
            setIsUpdating((current) => subset.reduce((prev, variation) => ({
                ...prev,
                [variation.id]: true,
            }), fromIndex === 0 ? {} : current));
            const response = await batchUpdateProductVariations({ product_id: productId }, {
                update: subset,
            });
            currentPage++;
            const updatedVariations = response?.update ?? [];
            result.push(...updatedVariations);
            for (const variation of updatedVariations) {
                await coreInvalidateResolution('getEntityRecord', [
                    'postType',
                    'product_variation',
                    variation.id,
                ]);
                selectedVariationsRef.current[variation.id] = variation;
                setSelectedCount((current) => current + 1);
            }
        }
        setIsUpdating({});
        await invalidateResolutionForStore();
        await getCurrentVariationsPage({
            product_id: productId,
            attributes: filters,
        });
        return { update: result };
    }
    async function onBatchDelete(values) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { invalidateResolution: coreInvalidateResolution } = dispatch('core');
        const { batchUpdateProductVariations, invalidateResolutionForStore } = dispatch(experimentalProductVariationsStore);
        selectedVariationsRef.current = {};
        setSelectedCount(0);
        let currentPage = 1;
        const offset = 50;
        const result = [];
        while ((currentPage - 1) * offset < values.length) {
            const fromIndex = (currentPage - 1) * offset;
            const toIndex = fromIndex + offset;
            const subset = values.slice(fromIndex, toIndex);
            setIsUpdating((current) => subset.reduce((prev, variation) => ({
                ...prev,
                [variation.id]: true,
            }), fromIndex === 0 ? {} : current));
            const response = await batchUpdateProductVariations({ product_id: productId }, {
                delete: subset.map(({ id }) => id),
            });
            currentPage++;
            const deletedVariations = response?.delete ?? [];
            result.push(...(response?.delete ?? []));
            for (const variation of deletedVariations) {
                await coreInvalidateResolution('getEntityRecord', [
                    'postType',
                    'product_variation',
                    variation.id,
                ]);
                delete selectedVariationsRef.current[variation.id];
                setSelectedCount((current) => current - 1);
            }
        }
        setIsUpdating({});
        await coreInvalidateResolution('getEntityRecord', [
            'postType',
            'product',
            productId,
        ]);
        await invalidateResolutionForStore();
        await getCurrentVariationsPage({
            product_id: productId,
            attributes: filters,
        });
        return { delete: result };
    }
    // Generation
    const { isGenerating, generateProductVariations: onGenerate, generateError, } = useProductVariationsHelper();
    const wasGenerating = useRef(false);
    function getCurrentVariations() {
        if (isGenerating) {
            setFilters([]);
            onClearSelection();
        }
        const didMount = wasGenerating.current === false && isGenerating === false;
        const didGenerate = wasGenerating.current === true && isGenerating === false;
        if (didMount || didGenerate) {
            getCurrentVariationsPage({
                product_id: productId,
            }, true);
        }
        wasGenerating.current = Boolean(isGenerating);
    }
    return {
        isLoading,
        variations,
        totalCount,
        onPageChange,
        onPerPageChange,
        onFilter,
        getFilters,
        hasFilters,
        clearFilters,
        selected,
        isSelectingAll,
        selectedCount,
        areAllSelected,
        areSomeSelected,
        isSelected,
        onSelect,
        onSelectPage,
        onSelectAll,
        onClearSelection,
        isUpdating,
        onUpdate,
        onDelete,
        onBatchUpdate,
        onBatchDelete,
        isGenerating,
        onGenerate,
        variationsError: generateError ?? getVariationsError,
        getCurrentVariations,
    };
}
