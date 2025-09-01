/**
 * External dependencies
 */
import clsx from 'clsx';
import { __, sprintf } from '@wordpress/i18n';
import { PaginationPageSizePicker, PaginationPageArrowsWithPicker, usePagination, } from '@fincommerce/components';
import { createElement } from '@wordpress/element';
import { DEFAULT_VARIATION_PER_PAGE_OPTION, DEFAULT_VARIATION_PER_PAGE_OPTIONS, } from '../../../constants';
export function Pagination({ className, totalCount, perPageOptions = DEFAULT_VARIATION_PER_PAGE_OPTIONS, defaultPerPage = DEFAULT_VARIATION_PER_PAGE_OPTION, onPageChange, onPerPageChange, }) {
    const paginationProps = usePagination({
        defaultPerPage,
        totalCount,
        onPageChange,
        onPerPageChange,
    });
    // translators: Viewing 1-5 of 100 items. First two %ds are a range of items that are shown on the screen. The last %d is the total amount of items that exist.
    const paginationLabel = __('Viewing %d-%d of %d items', 'fincommerce');
    return (createElement("div", { className: clsx(className, 'fincommerce-product-variations-pagination') },
        createElement("div", { className: "fincommerce-product-variations-pagination__info" }, sprintf(paginationLabel, paginationProps.start, paginationProps.end, totalCount)),
        createElement("div", { className: "fincommerce-product-variations-pagination__current-page" },
            createElement(PaginationPageArrowsWithPicker, { ...paginationProps })),
        createElement("div", { className: "fincommerce-product-variations-pagination__page-size" },
            createElement(PaginationPageSizePicker, { ...paginationProps, total: totalCount, perPageOptions: perPageOptions, label: "" }))));
}
