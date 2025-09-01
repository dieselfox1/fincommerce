"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const select_control_1 = __importDefault(require("../select-control"));
const autocompleters_1 = require("./autocompleters");
/**
 * A search box which autocompletes results while typing, allowing for the user to select an existing object
 * (product, order, customer, etc). Currently only products are supported.
 */
class Search extends element_1.Component {
    static defaultProps = {
        allowFreeTextSearch: false,
        onChange: lodash_1.noop,
        selected: [],
        inlineTags: false,
        showClearButton: false,
        staticResults: false,
        disabled: false,
        multiple: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            options: [],
        };
        this.appendFreeTextSearch = this.appendFreeTextSearch.bind(this);
        this.fetchOptions = this.fetchOptions.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    getAutocompleter() {
        switch (this.props.type) {
            case 'attributes':
                return autocompleters_1.attributes;
            case 'categories':
                return autocompleters_1.productCategory;
            case 'countries':
                return autocompleters_1.countries;
            case 'coupons':
                return autocompleters_1.coupons;
            case 'customers':
                return autocompleters_1.customers;
            case 'downloadIps':
                return autocompleters_1.downloadIps;
            case 'emails':
                return autocompleters_1.emails;
            case 'orders':
                return autocompleters_1.orders;
            case 'products':
                return autocompleters_1.product;
            case 'taxes':
                return autocompleters_1.taxes;
            case 'usernames':
                return autocompleters_1.usernames;
            case 'variableProducts':
                return autocompleters_1.variableProduct;
            case 'variations':
                return autocompleters_1.variations;
            case 'custom':
                if (!this.props.autocompleter ||
                    typeof this.props.autocompleter !== 'object') {
                    throw new Error("Invalid autocompleter provided to Search component, it requires a completer object when using 'custom' type.");
                }
                return this.props.autocompleter;
            default:
                throw new Error(`No autocompleter found for type: ${this.props.type}`);
        }
    }
    getFormattedOptions(options, query) {
        const autocompleter = this.getAutocompleter();
        const formattedOptions = [];
        options.forEach((option) => {
            const formattedOption = {
                key: autocompleter.getOptionIdentifier(option).toString(),
                label: autocompleter.getOptionLabel(option, query),
                keywords: autocompleter
                    .getOptionKeywords(option)
                    .filter(Boolean),
                value: option,
            };
            formattedOptions.push(formattedOption);
        });
        return formattedOptions;
    }
    fetchOptions(previousOptions, query) {
        if (!query) {
            return Promise.resolve([]);
        }
        const autocompleterOptions = this.getAutocompleter().options;
        // Support arrays, sync- & async functions that returns an array.
        const resolvedOptions = Promise.resolve(typeof autocompleterOptions === 'function'
            ? autocompleterOptions(query)
            : autocompleterOptions || []);
        return resolvedOptions.then(async (response) => {
            const options = this.getFormattedOptions(response, query);
            this.setState({ options });
            return options;
        });
    }
    updateSelected(selected) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { onChange: onChangeProp = (_option) => { } } = this.props;
        const autocompleter = this.getAutocompleter();
        const formattedSelections = selected.map((option) => {
            return option.value
                ? autocompleter.getOptionCompletion(option.value)
                : option;
        });
        onChangeProp(formattedSelections);
    }
    onChange(selected) {
        if (Array.isArray(selected)) {
            this.updateSelected(selected);
        }
    }
    appendFreeTextSearch(options, query) {
        const { allowFreeTextSearch } = this.props;
        if (!query || !query.length) {
            return [];
        }
        const autocompleter = this.getAutocompleter();
        if (!allowFreeTextSearch ||
            typeof autocompleter.getFreeTextOptions !== 'function') {
            return options;
        }
        return [
            ...autocompleter.getFreeTextOptions(query),
            ...options,
        ];
    }
    render() {
        const autocompleter = this.getAutocompleter();
        const { className, inlineTags, placeholder, selected, showClearButton, staticResults, disabled, multiple, } = this.props;
        const { options } = this.state;
        const inputType = autocompleter.inputType
            ? autocompleter.inputType
            : 'text';
        return ((0, element_1.createElement)("div", null,
            (0, element_1.createElement)(select_control_1.default, { className: (0, clsx_1.default)('fincommerce-search', className, {
                    'is-static-results': staticResults,
                }), disabled: disabled, hideBeforeSearch: true, inlineTags: inlineTags, isSearchable: true, getSearchExpression: autocompleter.getSearchExpression, multiple: multiple, placeholder: placeholder, onChange: this.onChange, onFilter: this.appendFreeTextSearch, onSearch: this.fetchOptions, options: options, searchDebounceTime: 500, searchInputType: inputType, selected: selected, showClearButton: showClearButton })));
    }
}
exports.Search = Search;
