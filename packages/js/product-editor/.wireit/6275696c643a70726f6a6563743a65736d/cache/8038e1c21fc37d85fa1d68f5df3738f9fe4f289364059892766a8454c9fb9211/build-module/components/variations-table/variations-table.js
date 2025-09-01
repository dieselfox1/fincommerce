/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button, CheckboxControl, Notice } from '@wordpress/components';
import { recordEvent } from '@fincommerce/tracks';
import { createElement, Fragment, forwardRef, useMemo, useEffect, } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
import { useEntityId, useEntityProp } from '@wordpress/core-data';
/**
 * Internal dependencies
 */
import { TRACKS_SOURCE } from '../../constants';
import { Pagination } from './pagination';
import { EmptyOrErrorTableState } from './table-empty-or-error-state';
import { VariationsFilter } from './variations-filter';
import { useVariations } from './use-variations';
import { TableRowSkeleton } from './table-row-skeleton';
import { VariationsTableRow } from './variations-table-row';
import { MultipleUpdateMenu } from './variation-actions-menus';
function getSnackbarText(response, type) {
    if ('id' in response) {
        const action = type === 'update' ? 'updated' : 'deleted';
        return sprintf(
        /* translators: The deleted or updated variations count */
        __('1 variation %s.', 'fincommerce'), action);
    }
    const { update = [], delete: deleted = [] } = response;
    const updatedCount = update.length;
    const deletedCount = deleted.length;
    if (deletedCount > 0) {
        return sprintf(
        /* translators: The deleted variations count */
        __('%s variations deleted.', 'fincommerce'), deletedCount);
    }
    else if (updatedCount > 0) {
        return sprintf(
        /* translators: The updated variations count */
        __('%s variations updated.', 'fincommerce'), updatedCount);
    }
    return '';
}
export const VariationsTable = forwardRef(function Table({ isVisible = false, noticeText, noticeActions = [], noticeStatus = 'error', onNoticeDismiss = () => { }, onVariationTableChange = () => { }, }, ref) {
    const productId = useEntityId('postType', 'product');
    const [productAttributes] = useEntityProp('postType', 'product', 'attributes');
    const variableAttributes = useMemo(() => productAttributes.filter((attribute) => attribute.variation), [productAttributes]);
    const [variationIds] = useEntityProp('postType', 'product', 'variations');
    const { createSuccessNotice, createErrorNotice } = useDispatch('core/notices');
    const { isLoading, variations, totalCount, onPageChange, onPerPageChange, onFilter, getFilters, hasFilters, clearFilters, selected, isSelectingAll, selectedCount, areAllSelected, areSomeSelected, isSelected, onSelect, onSelectPage, onSelectAll, onClearSelection, isUpdating, onUpdate, onDelete, onBatchUpdate, onBatchDelete, isGenerating, variationsError, onGenerate, getCurrentVariations, } = useVariations({ productId });
    useEffect(() => {
        if (isVisible) {
            getCurrentVariations();
        }
    }, [isVisible, isGenerating, productId]);
    function handleEmptyTableStateActionClick() {
        onGenerate(productAttributes);
    }
    const isError = variationsError !== undefined;
    if (!(isLoading || isGenerating) &&
        (variationIds.length === 0 || isError)) {
        return (createElement(EmptyOrErrorTableState, { onActionClick: handleEmptyTableStateActionClick, isError: isError }));
    }
    function handleDeleteVariationClick(variation) {
        onDelete(variation.id)
            .then((response) => {
            recordEvent('product_variations_delete', {
                source: TRACKS_SOURCE,
                product_id: productId,
                variation_id: variation.id,
            });
            createSuccessNotice(getSnackbarText(response, 'delete'));
            onVariationTableChange('delete');
        })
            .catch(() => {
            createErrorNotice(__('Failed to delete variation.', 'fincommerce'));
        });
    }
    function handleVariationChange(variation, showSuccess = true) {
        const { id, ...changes } = variation;
        onUpdate(variation)
            .then((response) => {
            recordEvent('product_variations_change', {
                source: TRACKS_SOURCE,
                product_id: productId,
                variation_id: variation.id,
                updated_options: Object.keys(changes),
            });
            if (showSuccess) {
                createSuccessNotice(getSnackbarText(response, 'update'));
            }
            onVariationTableChange('update', [variation]);
        })
            .catch(() => {
            createErrorNotice(__('Failed to save variation.', 'fincommerce'));
        });
    }
    function handleUpdateAll(values) {
        const now = Date.now();
        onBatchUpdate(values)
            .then((response) => {
            recordEvent('product_variations_update_all', {
                source: TRACKS_SOURCE,
                product_id: productId,
                variations_count: values.length,
                request_time: Date.now() - now,
            });
            createSuccessNotice(getSnackbarText(response));
            onVariationTableChange('update', values);
        })
            .catch(() => {
            createErrorNotice(__('Failed to update variations.', 'fincommerce'));
        });
    }
    function handleDeleteAll(values) {
        const now = Date.now();
        onBatchDelete(values)
            .then((response) => {
            recordEvent('product_variations_delete_all', {
                source: TRACKS_SOURCE,
                product_id: productId,
                variations_count: values.length,
                request_time: Date.now() - now,
            });
            createSuccessNotice(getSnackbarText(response));
            onVariationTableChange('delete');
        })
            .catch(() => {
            createErrorNotice(__('Failed to delete variations.', 'fincommerce'));
        });
    }
    function editVariationClickHandler(variation) {
        return function handleEditVariationClick() {
            recordEvent('product_variations_edit', {
                source: TRACKS_SOURCE,
                product_id: productId,
                variation_id: variation.id,
            });
        };
    }
    async function handleSelectAllVariations() {
        const now = Date.now();
        onSelectAll().then((total) => {
            recordEvent('product_variations_select_all', {
                source: TRACKS_SOURCE,
                product_id: productId,
                variations_count: total,
                request_time: Date.now() - now,
            });
        });
    }
    function renderTableBody() {
        return totalCount > 0 ? (createElement("div", { className: "fincommerce-product-variations__table-body", role: "rowgroup" }, variations.map((variation) => (createElement("div", { key: `${variation.id}`, className: "fincommerce-product-variations__table-row", role: "row" },
            createElement(VariationsTableRow, { variation: variation, variableAttributes: variableAttributes, isUpdating: isUpdating[variation.id], isSelected: isSelected(variation), isSelectionDisabled: isSelectingAll, hideActionButtons: !areSomeSelected, onChange: handleVariationChange, onDelete: handleDeleteVariationClick, onEdit: editVariationClickHandler(variation), onSelect: onSelect(variation) })))))) : (createElement(EmptyOrErrorTableState, { isError: false, message: __('No variations were found', 'fincommerce'), actionText: __('Clear filters', 'fincommerce'), onActionClick: clearFilters }));
    }
    return (createElement("div", { className: "fincommerce-product-variations", ref: ref },
        noticeText && (createElement(Notice, { status: noticeStatus, className: "fincommerce-product-variations__notice", onRemove: onNoticeDismiss, actions: noticeActions.map((action) => ({
                ...action,
                onClick: () => {
                    action?.onClick(handleUpdateAll, handleDeleteAll);
                },
            })) }, noticeText)),
        createElement("div", { className: "fincommerce-product-variations__table", role: "table" },
            (hasFilters() || totalCount > 0) && (createElement("div", { className: "fincommerce-product-variations__table-header", role: "rowgroup" },
                createElement("div", { className: "fincommerce-product-variations__table-row", role: "rowheader" },
                    createElement("div", { className: "fincommerce-product-variations__filters" }, areSomeSelected ? (createElement(Fragment, null,
                        createElement("span", null, sprintf(
                        // translators: %d is the amount of selected variations
                        __('%d selected', 'fincommerce'), selectedCount)),
                        createElement(Button, { variant: "tertiary", onClick: () => onSelectPage(true) }, sprintf(
                        // translators: %d the variations amount in the current page
                        __('Select page (%d)', 'fincommerce'), variations.length)),
                        createElement(Button, { variant: "tertiary", isBusy: isSelectingAll, onClick: handleSelectAllVariations }, sprintf(
                        // translators: %d the total existing variations amount
                        __('Select all (%d)', 'fincommerce'), totalCount)),
                        createElement(Button, { variant: "tertiary", onClick: onClearSelection }, __('Clear selection', 'fincommerce')))) : (variableAttributes.map((attribute) => (createElement(VariationsFilter, { key: attribute.id, initialValues: getFilters(attribute), attribute: attribute, onFilter: onFilter(attribute) }))))),
                    createElement("div", { className: "fincommerce-product-variations__actions" },
                        createElement(MultipleUpdateMenu, { selection: selected, disabled: !areSomeSelected && !isSelectingAll, onChange: handleUpdateAll, onDelete: handleDeleteAll }))),
                totalCount > 0 && (createElement("div", { className: "fincommerce-product-variations__table-row fincommerce-product-variations__table-rowheader", role: "rowheader" },
                    createElement("div", { className: "fincommerce-product-variations__table-column fincommerce-product-variations__selection", role: "columnheader" },
                        createElement(CheckboxControl, { value: "all", checked: areAllSelected, indeterminate: !areAllSelected && areSomeSelected, onChange: onSelectPage, "aria-label": __('Select all', 'fincommerce') })),
                    createElement("div", { className: "fincommerce-product-variations__table-column", role: "columnheader" }, __('Variation', 'fincommerce')),
                    createElement("div", { className: "fincommerce-product-variations__table-column fincommerce-product-variations__price", role: "columnheader" }, __('Price', 'fincommerce')),
                    createElement("div", { className: "fincommerce-product-variations__table-column", role: "columnheader" }, __('Stock', 'fincommerce')))))),
            isLoading || isGenerating ? (createElement("div", { className: "fincommerce-product-variations__table-body", role: "presentation", "aria-label": isGenerating
                    ? __('Generating variations…', 'fincommerce')
                    : __('Loading variations…', 'fincommerce') }, Array.from({ length: variations.length || 5 }).map((_, index) => (createElement(TableRowSkeleton, { key: index }))))) : (renderTableBody()),
            totalCount > 5 && (createElement("div", { className: "fincommerce-product-variations__table-footer", role: "row" },
                createElement(Pagination, { totalCount: totalCount, onPageChange: onPageChange, onPerPageChange: onPerPageChange }))))));
});
