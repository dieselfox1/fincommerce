/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import { PageArrows } from './page-arrows';
import { PagePicker } from './page-picker';
import { DEFAULT_PER_PAGE_OPTIONS, PageSizePicker } from './page-size-picker';
export function Pagination({ page, onPageChange = () => { }, total, perPage, onPerPageChange = () => { }, showPagePicker = true, showPerPagePicker = true, showPageArrowsLabel = true, className, perPageOptions = DEFAULT_PER_PAGE_OPTIONS, children, }) {
    const pageCount = Math.ceil(total / perPage);
    if (children && typeof children === 'function') {
        return children({
            pageCount,
        });
    }
    const classes = clsx('fincommerce-pagination', className);
    if (pageCount <= 1) {
        return ((total > perPageOptions[0] && (createElement("div", { className: classes },
            createElement(PageSizePicker, { currentPage: page, perPage: perPage, setCurrentPage: onPageChange, total: total, setPerPageChange: onPerPageChange, perPageOptions: perPageOptions })))) ||
            null);
    }
    return (createElement("div", { className: classes },
        createElement(PageArrows, { currentPage: page, pageCount: pageCount, showPageArrowsLabel: showPageArrowsLabel, setCurrentPage: onPageChange }),
        showPagePicker && (createElement(PagePicker, { currentPage: page, pageCount: pageCount, setCurrentPage: onPageChange })),
        showPerPagePicker && (createElement(PageSizePicker, { currentPage: page, perPage: perPage, setCurrentPage: onPageChange, total: total, setPerPageChange: onPerPageChange, perPageOptions: perPageOptions }))));
}
