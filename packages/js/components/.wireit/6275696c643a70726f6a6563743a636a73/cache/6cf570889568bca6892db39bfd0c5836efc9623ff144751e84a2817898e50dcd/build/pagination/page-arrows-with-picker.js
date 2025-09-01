"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageArrowsWithPicker = PageArrowsWithPicker;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
function PageArrowsWithPicker({ pageCount, currentPage, setCurrentPage, }) {
    const [inputValue, setInputValue] = (0, element_1.useState)(currentPage);
    (0, element_1.useEffect)(() => {
        if (currentPage !== inputValue) {
            setInputValue(currentPage);
        }
    }, [currentPage]);
    function onInputChange(event) {
        setInputValue(parseInt(event.currentTarget.value, 10));
    }
    function onInputBlur(event) {
        const newPage = parseInt(event.target.value, 10);
        if (newPage !== currentPage &&
            Number.isFinite(newPage) &&
            newPage > 0 &&
            pageCount &&
            pageCount >= newPage) {
            setCurrentPage(newPage, 'goto');
        }
        else {
            setInputValue(currentPage);
        }
    }
    function previousPage(event) {
        event.stopPropagation();
        if (currentPage - 1 < 1) {
            return;
        }
        setInputValue(currentPage - 1);
        setCurrentPage(currentPage - 1, 'previous');
    }
    function nextPage(event) {
        event.stopPropagation();
        if (currentPage + 1 > pageCount) {
            return;
        }
        setInputValue(currentPage + 1);
        setCurrentPage(currentPage + 1, 'next');
    }
    if (pageCount <= 1) {
        return null;
    }
    const previousLinkClass = (0, clsx_1.default)('fincommerce-pagination__link', {
        'is-active': currentPage > 1,
    });
    const nextLinkClass = (0, clsx_1.default)('fincommerce-pagination__link', {
        'is-active': currentPage < pageCount,
    });
    const isError = currentPage < 1 || currentPage > pageCount;
    const inputClass = (0, clsx_1.default)('fincommerce-pagination__page-arrow-picker-input', {
        'has-error': isError,
    });
    const instanceId = (0, lodash_1.uniqueId)('fincommerce-pagination-page-picker-');
    return ((0, element_1.createElement)("div", { className: "fincommerce-pagination__page-arrows" },
        (0, element_1.createElement)(components_1.Button, { className: previousLinkClass, icon: icons_1.chevronLeft, disabled: !(currentPage > 1), onClick: previousPage, label: (0, i18n_1.__)('Previous Page', 'fincommerce') }),
        (0, element_1.createElement)("input", { id: instanceId, className: inputClass, "aria-invalid": isError, type: "number", onChange: onInputChange, onBlur: onInputBlur, value: inputValue, min: 1, max: pageCount }),
        (0, i18n_1.sprintf)(
        /* translators: %d: total number of pages */
        (0, i18n_1.__)('of %d', 'fincommerce'), pageCount),
        (0, element_1.createElement)(components_1.Button, { className: nextLinkClass, icon: icons_1.chevronRight, disabled: !(currentPage < pageCount), onClick: nextPage, label: (0, i18n_1.__)('Next Page', 'fincommerce') })));
}
