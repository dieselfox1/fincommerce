"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariationsFilter = VariationsFilter;
/**
 * External dependencies
 */
const react_1 = require("react");
const data_1 = require("@fincommerce/data");
const compose_1 = require("@wordpress/compose");
const data_2 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const MIN_OPTIONS_COUNT_FOR_SEARCHING = 10;
const DEFAULT_TERMS_PER_PAGE = 10;
function VariationsFilter({ initialValues, attribute, onFilter, }) {
    const [selection, setSelection] = (0, element_1.useState)(initialValues);
    const [options, setOptions] = (0, element_1.useState)([]);
    const [totalOptions, setTotalOptions] = (0, element_1.useState)(0);
    const [isLoading, setIsLoading] = (0, element_1.useState)(false);
    const [search, setSearch] = (0, element_1.useState)('');
    const [currentPage, setCurrentPage] = (0, element_1.useState)(1);
    const inputSearchRef = (0, react_1.useRef)(null);
    const isDisabled = selection.length === 0;
    async function fetchOptions(attributeId, searchText = '', page = 1) {
        try {
            setIsLoading(true);
            const { getProductAttributeTerms, getProductAttributeTermsTotalCount, } = (0, data_2.resolveSelect)(data_1.experimentalProductAttributeTermsStore);
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
    (0, react_1.useEffect)(() => setSelection(initialValues), [initialValues]);
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
    const handleInputControlChange = (0, compose_1.useDebounce)(function handleInputControlChange(value) {
        setSearch(value ?? '');
        setOptions([]);
        setCurrentPage(1);
        fetchOptions(attribute.id, value);
    }, 300);
    const searchInputId = (0, compose_1.useInstanceId)(components_1.__experimentalInputControl, 'search');
    const optionCheckboxId = (0, compose_1.useInstanceId)(components_1.CheckboxControl, 'checkbox');
    return ((0, element_1.createElement)(components_1.Dropdown, { className: "fincommerce-product-variations-filter", onClose: handleClose, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_1.Button, { "aria-expanded": isOpen, icon: isOpen ? icons_1.chevronUp : icons_1.chevronDown, variant: "tertiary", onClick: dropdownToggleHandler(isOpen, onToggle), className: "fincommerce-product-variations-filter__toggle" },
            (0, element_1.createElement)("span", null, (0, i18n_1.sprintf)(
            // translators: %s is the attribute name to filter by
            (0, i18n_1.__)('Any %s', 'fincommerce'), attribute.name)))), renderContent: ({ onClose }) => ((0, element_1.createElement)("form", { className: "fincommerce-product-variations-filter__form", noValidate: true, onSubmit: submitHandler(onClose), onReset: resetHandler() },
            attribute.options.length >
                MIN_OPTIONS_COUNT_FOR_SEARCHING && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations-filter__form-header" },
                (0, element_1.createElement)("label", { htmlFor: searchInputId, "aria-label": (0, i18n_1.__)('Search options', 'fincommerce') },
                    (0, element_1.createElement)(components_1.__experimentalInputControl, { ref: inputSearchRef, id: searchInputId, type: "search", value: search, suffix: (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.search }), onChange: handleInputControlChange, onKeyDown: handleKeyDown })))),
            (0, element_1.createElement)("div", { className: "fincommerce-product-variations-filter__form-body", onScroll: handleScroll },
                options.length > 0 ? ((0, element_1.createElement)("ul", { className: "fincommerce-product-variations-filter__form-list" }, options.map((option) => ((0, element_1.createElement)("li", { key: option.slug, className: "fincommerce-product-variations-filter__form-list-item" },
                    (0, element_1.createElement)("label", { htmlFor: `${optionCheckboxId}-${option.slug}`, className: "fincommerce-product-variations-filter__form-list-item-label" },
                        (0, element_1.createElement)(components_1.CheckboxControl, { id: `${optionCheckboxId}-${option.slug}`, checked: isOptionChecked(option.slug), onChange: optionChangeHandler(option.slug) }),
                        (0, element_1.createElement)("span", null, option.name))))))) : (!isLoading && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations-filter__form-list-empty" }, (0, i18n_1.__)('No options were found for that search', 'fincommerce')))),
                isLoading && ((0, element_1.createElement)("div", { className: "fincommerce-product-variations-filter__loading" },
                    (0, element_1.createElement)(components_1.Spinner, null)))),
            (0, element_1.createElement)("div", { className: "fincommerce-product-variations-filter__form-footer" },
                (0, element_1.createElement)(components_1.Button, { type: "reset", variant: "secondary", "aria-disabled": isDisabled }, (0, i18n_1.__)('Reset', 'fincommerce')),
                (0, element_1.createElement)(components_1.Button, { type: "submit", variant: "primary" }, (0, i18n_1.__)('Filter', 'fincommerce'))))) }));
}
