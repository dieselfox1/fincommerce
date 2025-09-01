"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PER_PAGE_OPTIONS = void 0;
exports.PageSizePicker = PageSizePicker;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
exports.DEFAULT_PER_PAGE_OPTIONS = [25, 50, 75, 100];
function PageSizePicker({ perPage, currentPage, total, setCurrentPage, setPerPageChange = () => { }, perPageOptions = exports.DEFAULT_PER_PAGE_OPTIONS, label = (0, i18n_1.__)('Rows per page', 'fincommerce'), }) {
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
    return ((0, element_1.createElement)("div", { className: "fincommerce-pagination__per-page-picker" },
        (0, element_1.createElement)(components_1.SelectControl, { label: label, labelPosition: "side", value: perPage.toString(), onChange: perPageChange, options: pickerOptions })));
}
