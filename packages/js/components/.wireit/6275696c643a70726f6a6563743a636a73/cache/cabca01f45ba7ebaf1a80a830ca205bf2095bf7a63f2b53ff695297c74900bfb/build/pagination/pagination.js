"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const page_arrows_1 = require("./page-arrows");
const page_picker_1 = require("./page-picker");
const page_size_picker_1 = require("./page-size-picker");
function Pagination({ page, onPageChange = () => { }, total, perPage, onPerPageChange = () => { }, showPagePicker = true, showPerPagePicker = true, showPageArrowsLabel = true, className, perPageOptions = page_size_picker_1.DEFAULT_PER_PAGE_OPTIONS, children, }) {
    const pageCount = Math.ceil(total / perPage);
    if (children && typeof children === 'function') {
        return children({
            pageCount,
        });
    }
    const classes = (0, clsx_1.default)('fincommerce-pagination', className);
    if (pageCount <= 1) {
        return ((total > perPageOptions[0] && ((0, element_1.createElement)("div", { className: classes },
            (0, element_1.createElement)(page_size_picker_1.PageSizePicker, { currentPage: page, perPage: perPage, setCurrentPage: onPageChange, total: total, setPerPageChange: onPerPageChange, perPageOptions: perPageOptions })))) ||
            null);
    }
    return ((0, element_1.createElement)("div", { className: classes },
        (0, element_1.createElement)(page_arrows_1.PageArrows, { currentPage: page, pageCount: pageCount, showPageArrowsLabel: showPageArrowsLabel, setCurrentPage: onPageChange }),
        showPagePicker && ((0, element_1.createElement)(page_picker_1.PagePicker, { currentPage: page, pageCount: pageCount, setCurrentPage: onPageChange })),
        showPerPagePicker && ((0, element_1.createElement)(page_size_picker_1.PageSizePicker, { currentPage: page, perPage: perPage, setCurrentPage: onPageChange, total: total, setPerPageChange: onPerPageChange, perPageOptions: perPageOptions }))));
}
