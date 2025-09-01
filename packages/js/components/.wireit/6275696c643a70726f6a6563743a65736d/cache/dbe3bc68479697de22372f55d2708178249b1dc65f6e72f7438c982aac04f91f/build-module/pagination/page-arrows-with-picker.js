/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { createElement, useEffect, useState } from '@wordpress/element';
import { chevronLeft, chevronRight } from '@wordpress/icons';
import { sprintf, __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
export function PageArrowsWithPicker({ pageCount, currentPage, setCurrentPage, }) {
    const [inputValue, setInputValue] = useState(currentPage);
    useEffect(() => {
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
    const previousLinkClass = clsx('fincommerce-pagination__link', {
        'is-active': currentPage > 1,
    });
    const nextLinkClass = clsx('fincommerce-pagination__link', {
        'is-active': currentPage < pageCount,
    });
    const isError = currentPage < 1 || currentPage > pageCount;
    const inputClass = clsx('fincommerce-pagination__page-arrow-picker-input', {
        'has-error': isError,
    });
    const instanceId = uniqueId('fincommerce-pagination-page-picker-');
    return (createElement("div", { className: "fincommerce-pagination__page-arrows" },
        createElement(Button, { className: previousLinkClass, icon: chevronLeft, disabled: !(currentPage > 1), onClick: previousPage, label: __('Previous Page', 'fincommerce') }),
        createElement("input", { id: instanceId, className: inputClass, "aria-invalid": isError, type: "number", onChange: onInputChange, onBlur: onInputBlur, value: inputValue, min: 1, max: pageCount }),
        sprintf(
        /* translators: %d: total number of pages */
        __('of %d', 'fincommerce'), pageCount),
        createElement(Button, { className: nextLinkClass, icon: chevronRight, disabled: !(currentPage < pageCount), onClick: nextPage, label: __('Next Page', 'fincommerce') })));
}
