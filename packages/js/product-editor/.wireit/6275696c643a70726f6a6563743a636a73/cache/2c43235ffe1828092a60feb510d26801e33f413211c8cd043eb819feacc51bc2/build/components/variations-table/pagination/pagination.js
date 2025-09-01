"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@fincommerce/components");
const element_1 = require("@wordpress/element");
const constants_1 = require("../../../constants");
function Pagination({ className, totalCount, perPageOptions = constants_1.DEFAULT_VARIATION_PER_PAGE_OPTIONS, defaultPerPage = constants_1.DEFAULT_VARIATION_PER_PAGE_OPTION, onPageChange, onPerPageChange, }) {
    const paginationProps = (0, components_1.usePagination)({
        defaultPerPage,
        totalCount,
        onPageChange,
        onPerPageChange,
    });
    // translators: Viewing 1-5 of 100 items. First two %ds are a range of items that are shown on the screen. The last %d is the total amount of items that exist.
    const paginationLabel = (0, i18n_1.__)('Viewing %d-%d of %d items', 'fincommerce');
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)(className, 'fincommerce-product-variations-pagination') },
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations-pagination__info" }, (0, i18n_1.sprintf)(paginationLabel, paginationProps.start, paginationProps.end, totalCount)),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations-pagination__current-page" },
            (0, element_1.createElement)(components_1.PaginationPageArrowsWithPicker, { ...paginationProps })),
        (0, element_1.createElement)("div", { className: "fincommerce-product-variations-pagination__page-size" },
            (0, element_1.createElement)(components_1.PaginationPageSizePicker, { ...paginationProps, total: totalCount, perPageOptions: perPageOptions, label: "" }))));
}
