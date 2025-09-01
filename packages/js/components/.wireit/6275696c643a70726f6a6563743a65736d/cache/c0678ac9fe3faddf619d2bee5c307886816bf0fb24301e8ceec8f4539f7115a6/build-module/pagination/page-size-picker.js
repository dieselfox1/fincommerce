/**
 * External dependencies
 */
import { SelectControl } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
export const DEFAULT_PER_PAGE_OPTIONS = [25, 50, 75, 100];
export function PageSizePicker({ perPage, currentPage, total, setCurrentPage, setPerPageChange = () => { }, perPageOptions = DEFAULT_PER_PAGE_OPTIONS, label = __('Rows per page', 'fincommerce'), }) {
    function perPageChange(newPerPage) {
        setPerPageChange(parseInt(newPerPage, 10));
        const newMaxPage = Math.ceil(total / parseInt(newPerPage, 10));
        if (currentPage > newMaxPage) {
            setCurrentPage(newMaxPage);
        }
    }
    // @todo Replace this with a styleized Select drop-down/control?
    const pickerOptions = perPageOptions.map((option) => {
        return { value: option.toString(), label: option.toString() };
    });
    return (createElement("div", { className: "fincommerce-pagination__per-page-picker" },
        createElement(SelectControl, { label: label, labelPosition: "side", value: perPage.toString(), onChange: perPageChange, options: pickerOptions })));
}
