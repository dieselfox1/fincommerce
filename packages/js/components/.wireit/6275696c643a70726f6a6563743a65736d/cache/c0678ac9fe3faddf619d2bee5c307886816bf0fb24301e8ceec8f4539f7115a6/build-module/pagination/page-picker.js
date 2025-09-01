/**
 * External dependencies
 */
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
export function PagePicker({ pageCount, currentPage, setCurrentPage, }) {
    const [inputValue, setInputValue] = useState(currentPage);
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
    const inputClass = clsx('fincommerce-pagination__page-picker-input', {
        'has-error': isError,
    });
    const instanceId = uniqueId('fincommerce-pagination-page-picker-');
    return (createElement("div", { className: "fincommerce-pagination__page-picker" },
        createElement("label", { htmlFor: instanceId, className: "fincommerce-pagination__page-picker-label" },
            __('Go to page', 'fincommerce'),
            createElement("input", { id: instanceId, className: inputClass, "aria-invalid": isError, type: "number", onClick: selectInputValue, onChange: onInputChange, onBlur: onInputBlur, value: inputValue, min: 1, max: pageCount }))));
}
