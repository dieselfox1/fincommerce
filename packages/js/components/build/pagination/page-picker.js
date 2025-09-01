"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagePicker = PagePicker;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
function PagePicker({ pageCount, currentPage, setCurrentPage, }) {
    const [inputValue, setInputValue] = (0, element_1.useState)(currentPage);
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
    }
    function selectInputValue(event) {
        event.currentTarget.select();
    }
    const isError = currentPage < 1 || currentPage > pageCount;
    const inputClass = (0, clsx_1.default)('fincommerce-pagination__page-picker-input', {
        'has-error': isError,
    });
    const instanceId = (0, lodash_1.uniqueId)('fincommerce-pagination-page-picker-');
    return ((0, element_1.createElement)("div", { className: "fincommerce-pagination__page-picker" },
        (0, element_1.createElement)("label", { htmlFor: instanceId, className: "fincommerce-pagination__page-picker-label" },
            (0, i18n_1.__)('Go to page', 'fincommerce'),
            (0, element_1.createElement)("input", { id: instanceId, className: inputClass, "aria-invalid": isError, type: "number", onClick: selectInputValue, onChange: onInputChange, onBlur: onInputBlur, value: inputValue, min: 1, max: pageCount }))));
}
