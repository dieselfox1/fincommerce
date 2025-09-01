/**
 * External dependencies
 */
import { useEffect, useRef } from 'react';
import { experimentalProductAttributeTermsStore, } from '@fincommerce/data';
import { useDebounce, useInstanceId } from '@wordpress/compose';
import { resolveSelect } from '@wordpress/data';
import { createElement, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Icon, chevronDown, chevronUp, search as searchIcon, } from '@wordpress/icons';
import { Button, CheckboxControl, Dropdown, __experimentalInputControl as InputControl, Spinner, } from '@wordpress/components';
const MIN_OPTIONS_COUNT_FOR_SEARCHING = 10;
const DEFAULT_TERMS_PER_PAGE = 10;
export function VariationsFilter({ initialValues, attribute, onFilter, }) {
    const [selection, setSelection] = useState(initialValues);
    const [options, setOptions] = useState([]);
    const [totalOptions, setTotalOptions] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const inputSearchRef = useRef(null);
    const isDisabled = selection.length === 0;
    async function fetchOptions(attributeId, searchText = '', page = 1) {
        try {
            setIsLoading(true);
            const { getProductAttributeTerms, getProductAttributeTermsTotalCount, } = resolveSelect(experimentalProductAttributeTermsStore);
            const sharedRequestArgs = {
                attribute_id: attributeId,
                per_page: DEFAULT_TERMS_PER_PAGE,
                page,
                search: searchText,
            };
            const terms = await getProductAttributeTerms(sharedRequestArgs);
            const totalTerms = await getProductAttributeTermsTotalCount(sharedRequestArgs);
            if (page > 1) {
                setOptions((current) => [...current, ...terms]);
            }
            else {
                setOptions(terms);
            }
            setTotalOptions(totalTerms);
        }
        catch {
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => setSelection(initialValues), [initialValues]);
    function handleClose() {
        setSearch('');
        setCurrentPage(1);
    }
    function dropdownToggleHandler(isOpen, onToggle) {
        return async function handleClick() {
            onToggle();
            if (!isOpen) {
                await fetchOptions(attribute.id);
            }
        };
    }
    async function handleScroll(event) {
        if (isLoading || options.length >= totalOptions)
            return;
        const scrollableElement = event.currentTarget;
        const scrollableHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
        if (scrollableElement.scrollTop >= scrollableHeight) {
            const nextPage = currentPage + 1;
            await fetchOptions(attribute.id, search, nextPage);
            setCurrentPage(nextPage);
        }
    }
    function isOptionChecked(option) {
        return selection.includes(option);
    }
    function optionChangeHandler(option) {
        return function handleOptionChange(value) {
            setSelection((current) => {
                if (value) {
                    return [...current, option];
                }
                return current.reduce(function removeSelectedOption(previousSelection, selectedOption) {
                    if (selectedOption === option) {
                        return previousSelection;
                    }
                    return [...previousSelection, selectedOption];
                }, []);
            });
        };
    }
    function submitHandler(close) {
        return function handleSubmit(event) {
            event.preventDefault();
            onFilter(selection);
            close();
        };
    }
    function resetHandler() {
        return async function handleReset(event) {
            event.preventDefault();
            if (!isDisabled) {
                setSearch('');
                setSelection([]);
                setCurrentPage(1);
                inputSearchRef.current?.focus();
                await fetchOptions(attribute.id);
            }
        };
    }
    function handleKeyDown(event) {
        if (event.code === 'Enter') {
            event.preventDefault();
        }
    }
    const handleInputControlChange = useDebounce(function handleInputControlChange(value) {
        setSearch(value ?? '');
        setOptions([]);
        setCurrentPage(1);
        fetchOptions(attribute.id, value);
    }, 300);
    const searchInputId = useInstanceId(InputControl, 'search');
    const optionCheckboxId = useInstanceId(CheckboxControl, 'checkbox');
    return (createElement(Dropdown, { className: "fincommerce-product-variations-filter", onClose: handleClose, renderToggle: ({ isOpen, onToggle }) => (createElement(Button, { "aria-expanded": isOpen, icon: isOpen ? chevronUp : chevronDown, variant: "tertiary", onClick: dropdownToggleHandler(isOpen, onToggle), className: "fincommerce-product-variations-filter__toggle" },
            createElement("span", null, sprintf(
            // translators: %s is the attribute name to filter by
            __('Any %s', 'fincommerce'), attribute.name)))), renderContent: ({ onClose }) => (createElement("form", { className: "fincommerce-product-variations-filter__form", noValidate: true, onSubmit: submitHandler(onClose), onReset: resetHandler() },
            attribute.options.length >
                MIN_OPTIONS_COUNT_FOR_SEARCHING && (createElement("div", { className: "fincommerce-product-variations-filter__form-header" },
                createElement("label", { htmlFor: searchInputId, "aria-label": __('Search options', 'fincommerce') },
                    createElement(InputControl, { ref: inputSearchRef, id: searchInputId, type: "search", value: search, suffix: createElement(Icon, { icon: searchIcon }), onChange: handleInputControlChange, onKeyDown: handleKeyDown })))),
            createElement("div", { className: "fincommerce-product-variations-filter__form-body", onScroll: handleScroll },
                options.length > 0 ? (createElement("ul", { className: "fincommerce-product-variations-filter__form-list" }, options.map((option) => (createElement("li", { key: option.slug, className: "fincommerce-product-variations-filter__form-list-item" },
                    createElement("label", { htmlFor: `${optionCheckboxId}-${option.slug}`, className: "fincommerce-product-variations-filter__form-list-item-label" },
                        createElement(CheckboxControl, { id: `${optionCheckboxId}-${option.slug}`, checked: isOptionChecked(option.slug), onChange: optionChangeHandler(option.slug) }),
                        createElement("span", null, option.name))))))) : (!isLoading && (createElement("div", { className: "fincommerce-product-variations-filter__form-list-empty" }, __('No options were found for that search', 'fincommerce')))),
                isLoading && (createElement("div", { className: "fincommerce-product-variations-filter__loading" },
                    createElement(Spinner, null)))),
            createElement("div", { className: "fincommerce-product-variations-filter__form-footer" },
                createElement(Button, { type: "reset", variant: "secondary", "aria-disabled": isDisabled }, __('Reset', 'fincommerce')),
                createElement(Button, { type: "submit", variant: "primary" }, __('Filter', 'fincommerce'))))) }));
}
