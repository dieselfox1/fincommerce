"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationsTable = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const tracks_1 = require("@fincommerce/tracks");
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const core_data_1 = require("@wordpress/core-data");
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
const pagination_1 = require("./pagination");
const table_empty_or_error_state_1 = require("./table-empty-or-error-state");
const variations_filter_1 = require("./variations-filter");
const use_variations_1 = require("./use-variations");
const table_row_skeleton_1 = require("./table-row-skeleton");
const variations_table_row_1 = require("./variations-table-row");
const variation_actions_menus_1 = require("./variation-actions-menus");
function getSnackbarText(response, type) {
    if ('id' in response) {
        const action = type === 'update' ? 'updated' : 'deleted';
        return (0, i18n_1.sprintf)(
        /* translators: The deleted or updated variations count */
        (0, i18n_1.__)('1 variation %s.', 'fincommerce'), action);
    }
    const { update = [], delete: deleted = [] } = response;
    const updatedCount = update.length;
    const deletedCount = deleted.length;
    if (deletedCount > 0) {
        return (0, i18n_1.sprintf)(
        /* translators: The deleted variations count */
        (0, i18n_1.__)('%s variations deleted.', 'fincommerce'), deletedCount);
    }
    else if (updatedCount > 0) {
        return (0, i18n_1.sprintf)(
        /* translators: The updated variations count */
        (0, i18n_1.__)('%s variations updated.', 'fincommerce'), updatedCount);
    }
    return '';
}
exports.VariationsTable = (0, element_1.forwardRef)(function Table({ isVisible = false, noticeText, noticeActions = [], noticeStatus = 'error', onNoticeDismiss = () => { }, onVariationTableChange = () => { }, }, ref) {
    const productId = (0, core_data_1.useEntityId)('postType', 'product');
    const [productAttributes] = (0, core_data_1.useEntityProp)('postType', 'product', 'attributes');
    const variableAttributes = (0, element_1.useMemo)(() => productAttributes.filter((attribute) => attribute.variation), [productAttributes]);
    const [variationIds] = (0, core_data_1.useEntityProp)('postType', 'product', 'variations');
    const { createSuccessNotice, createErrorNotice } = (0, data_1.useDispatch)('core/notices');
    const { isLoading, variations, totalCount, onPageChange, onPerPageChange, onFilter, getFilters, hasFilters, clearFilters, selected, isSelectingAll, selectedCount, areAllSelected, areSomeSelected, isSelected, onSelect, onSelectPage, onSelectAll, onClearSelection, isUpdating, onUpdate, onDelete, onBatchUpdate, onBatchDelete, isGenerating, variationsError, onGenerate, getCurrentVariations, } = (0, use_variations_1.useVariations)({ productId });
    (0, element_1.useEffect)(() => {
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
        return ((0, element_1.createElement)(table_empty_or_error_state_1.EmptyOrErrorTableState, { onActionClick: handleEmptyTableStateActionClick, isError: isError }));
    }
    function handleDeleteVariationClick(variation) {
        onDelete(variation.id)
            .then((response) => {
            (0, tracks_1.recordEvent)('product_variations_delete', {
                source: constants_1.TRACKS_SOURCE,
                product_id: productId,
                variation_id: variation.id,
            });
            createSuccessNotice(getSnackbarText(response, 'delete'));
            onVariationTableChange('delete');
        })
            .catch(() => {
            createErrorNotice((0, i18n_1.__)('Failed to delete variation.', 'fincommerce'));
        });
    }
    function handleVariationChange(variation, showSuccess = true) {
        const { id, ...changes } = variation;
        onUpdate(variation)
            .then((response) => {
            (0, tracks_1.recordEvent)('product_variations_change', {
                source: constants_1.TRACKS_SOURCE,
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
            createErrorNotice((0, i18n_1.__)('Failed to save variation.', 'fincommerce'));
        });
    }
    function handleUpdateAll(values) {
        const now = Date.now();
        onBatchUpdate(values)
            .then((response) => {
            (0, tracks_1.recordEvent)('product_variations_update_all', {
                source: constants_1.TRACKS_SOURCE,
                product_id: productId,
                variations_count: values.length,
                request_time: Date.now() - now,
            });
            createSuccessNotice(getSnackbarText(response));
            onVariationTableChange('update', values);
        })
            .catch(() => {
            createErrorNotice((0, i18n_1.__)('Failed to update variations.', 'fincommerce'));
        });
    }
    function handleDeleteAll(values) {
        const now = Date.now();
        onBatchDelete(values)
            .then((response) => {
            (0, tracks_1.recordEvent)('product_variations_delete_all', {
                source: constants_1.TRACKS_SOURCE,
                product_id: productId,
                variations_count: values.length,
                request_time: Date.now() - now,
            });
            createSuccessNotice(getSnackbarText(response));
            onVariationTableChange('delete');
        })
            .catch(() => {
            createErrorNotice((0, i18n_1.__)('Failed to delete variations.', 'fincommerce'));
        });
    }
    function editVariationClickHandler(variation) {
        return function handleEditVariationClick() {
            (0, tracks_1.recordEvent)('product_variations_edit', {
                source: constants_1.TRACKS_SOURCE,
                product_id: productId,
                variation_id: variation.id,
            });
        };
    }
    async function handleSelectAllVariations() {
        const now = Date.now();
        onSelectAll().then((total) => {
            (0, tracks_1.recordEvent)('product_variations_select_all', {
                source: constants_1.TRACKS_SOURCE,
                product_id: productId,
                variations_count: total,
                request_time: Date.now() - now,
            });
        });
    }
    function renderTableBody() {
        return totalCount > 0 ? ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-body", role: "rowgroup" }, variations.map((variation) => ((0, element_1.createElement)("div", { key: `${variation.id}`, className: "fincommerce-product-variations__table-row", role: "row" },
            (0, element_1.createElement)(variations_table_row_1.VariationsTableRow, { variation: variation, variableAttributes: variableAttributes, isUpdating: isUpdating[variation.id], isSelected: isSelected(variation), isSelectionDisabled: isSelectingAll, hideActionButtons: !areSomeSelected, onChange: handleVariationChange, onDelete: handleDeleteVariationClick, onEdit: editVariationClickHandler(variation), onSelect: onSelect(variation) })))))) : ((0, element_1.createElement)(table_empty_or_error_state_1.EmptyOrErrorTableState, { isError: false, message: (0, i18n_1.__)('No variations were found', 'fincommerce'), actionText: (0, i18n_1.__)('Clear filters', 'fincommerce'), onActionClick: clearFilters }));
    }
    return ((0, element_1.createElement)("div", { className: "fincommerce-product-variations", ref: ref },
        noticeText && ((0, element_1.createElement)(components_1.Notice, { status: noticeStatus, className: "fincommerce-product-variations__notice", onRemove: onNoticeDismiss, actions: noticeActions.map((action) => ({
                ...action,
                onClick: () => {
                    action?.onClick(handleUpdateAll, handleDeleteAll);
                },
            })) }, noticeText)),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations__table", role: "table" },
            (hasFilters() || totalCount > 0) && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-header", role: "rowgroup" },
                (0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-row", role: "rowheader" },
                    (0, element_1.createElement)("div", { className: "fincommerce-product-variations__filters" }, areSomeSelected ? ((0, element_1.createElement)(element_1.Fragment, null,
                        (0, element_1.createElement)("span", null, (0, i18n_1.sprintf)(
                        // translators: %d is the amount of selected variations
                        (0, i18n_1.__)('%d selected', 'fincommerce'), selectedCount)),
                        (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: () => onSelectPage(true) }, (0, i18n_1.sprintf)(
                        // translators: %d the variations amount in the current page
                        (0, i18n_1.__)('Select page (%d)', 'fincommerce'), variations.length)),
                        (0, element_1.createElement)(components_1.Button, { variant: "tertiary", isBusy: isSelectingAll, onClick: handleSelectAllVariations }, (0, i18n_1.sprintf)(
                        // translators: %d the total existing variations amount
                        (0, i18n_1.__)('Select all (%d)', 'fincommerce'), totalCount)),
                        (0, element_1.createElement)(components_1.Button, { variant: "tertiary", onClick: onClearSelection }, (0, i18n_1.__)('Clear selection', 'fincommerce')))) : (variableAttributes.map((attribute) => ((0, element_1.createElement)(variations_filter_1.VariationsFilter, { key: attribute.id, initialValues: getFilters(attribute), attribute: attribute, onFilter: onFilter(attribute) }))))),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-variations__actions" },
                        (0, element_1.createElement)(variation_actions_menus_1.MultipleUpdateMenu, { selection: selected, disabled: !areSomeSelected && !isSelectingAll, onChange: handleUpdateAll, onDelete: handleDeleteAll }))),
                totalCount > 0 && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-row fincommerce-product-variations__table-rowheader", role: "rowheader" },
                    (0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-column fincommerce-product-variations__selection", role: "columnheader" },
                        (0, element_1.createElement)(components_1.CheckboxControl, { value: "all", checked: areAllSelected, indeterminate: !areAllSelected && areSomeSelected, onChange: onSelectPage, "aria-label": (0, i18n_1.__)('Select all', 'fincommerce') })),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-column", role: "columnheader" }, (0, i18n_1.__)('Variation', 'fincommerce')),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-column fincommerce-product-variations__price", role: "columnheader" }, (0, i18n_1.__)('Price', 'fincommerce')),
                    (0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-column", role: "columnheader" }, (0, i18n_1.__)('Stock', 'fincommerce')))))),
            isLoading || isGenerating ? ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-body", role: "presentation", "aria-label": isGenerating
                    ? (0, i18n_1.__)('Generating variations…', 'fincommerce')
                    : (0, i18n_1.__)('Loading variations…', 'fincommerce') }, Array.from({ length: variations.length || 5 }).map((_, index) => ((0, element_1.createElement)(table_row_skeleton_1.TableRowSkeleton, { key: index }))))) : (renderTableBody()),
            totalCount > 5 && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations__table-footer", role: "row" },
                (0, element_1.createElement)(pagination_1.Pagination, { totalCount: totalCount, onPageChange: onPageChange, onPerPageChange: onPerPageChange }))))));
});
