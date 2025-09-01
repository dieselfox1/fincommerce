/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import clsx from 'clsx';
import { Component, createElement } from '@wordpress/element';
import { debounce, escapeRegExp, identity, isArray, isNumber, noop, } from 'lodash';
import { withFocusOutside, withSpokenMessages } from '@wordpress/components';
import { withInstanceId, compose } from '@wordpress/compose';
import List from './list';
import Tags from './tags';
import Control from './control';
const initialState = {
    isExpanded: false,
    isFocused: false,
    query: '',
    searchOptions: [],
};
/**
 * A search box which filters options while typing,
 * allowing a user to select from an option from a filtered list.
 */
export class SelectControl extends Component {
    static defaultProps = {
        ignoreDiacritics: false,
        excludeSelectedOptions: true,
        getSearchExpression: identity,
        inlineTags: false,
        isSearchable: false,
        onChange: noop,
        onFilter: identity,
        onSearch: (options) => Promise.resolve(options),
        maxResults: 0,
        multiple: false,
        searchDebounceTime: 0,
        searchInputType: 'search',
        selected: [],
        showAllOnFocus: false,
        showClearButton: false,
        hideBeforeSearch: false,
        staticList: false,
        autoComplete: 'off',
        virtualScroll: false,
        virtualItemHeight: 35,
        virtualListHeight: 300,
    };
    node = null;
    activePromise = null;
    cacheSearchOptions = [];
    constructor(props) {
        super(props);
        const { selected, options, excludeSelectedOptions } = props;
        this.state = {
            ...initialState,
            searchOptions: [],
            selectedIndex: selected && options?.length && !excludeSelectedOptions
                ? options.findIndex((option) => option.key === selected)
                : null,
        };
        this.bindNode = this.bindNode.bind(this);
        this.decrementSelectedIndex = this.decrementSelectedIndex.bind(this);
        this.incrementSelectedIndex = this.incrementSelectedIndex.bind(this);
        this.onAutofillChange = this.onAutofillChange.bind(this);
        this.updateSearchOptions = debounce(this.updateSearchOptions.bind(this), props.searchDebounceTime);
        this.search = this.search.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.setExpanded = this.setExpanded.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { selected } = this.props;
        if (selected !== prevProps.selected) {
            this.reset(selected);
        }
    }
    bindNode(node) {
        this.node = node;
    }
    reset(selected = this.getSelected()) {
        const { multiple, excludeSelectedOptions } = this.props;
        const newState = { ...initialState };
        // Reset selectedIndex if single selection.
        if (!multiple &&
            isArray(selected) &&
            selected.length &&
            selected[0].key) {
            newState.selectedIndex = !excludeSelectedOptions
                ? this.props.options.findIndex((i) => i.key === selected[0].key)
                : null;
        }
        this.setState(newState);
    }
    handleFocusOutside() {
        this.reset();
    }
    hasMultiple() {
        const { multiple, selected } = this.props;
        if (!multiple) {
            return false;
        }
        if (Array.isArray(selected)) {
            return selected.some((item) => Boolean(item.label));
        }
        return Boolean(selected);
    }
    getSelected() {
        const { multiple, options, selected } = this.props;
        // Return the passed value if an array is provided.
        if (multiple || Array.isArray(selected)) {
            return selected;
        }
        const selectedOption = options.find((option) => option.key === selected);
        return selectedOption ? [selectedOption] : [];
    }
    selectOption(option) {
        const { multiple, selected } = this.props;
        const newSelected = multiple && isArray(selected)
            ? [...selected, option]
            : [option];
        this.reset(newSelected);
        const oldSelected = Array.isArray(selected)
            ? selected
            : [{ key: selected }];
        const isSelected = oldSelected.findIndex((val) => val.key === option.key);
        if (isSelected === -1) {
            this.setNewValue(newSelected);
        }
        // After selecting option, the list will reset and we'd need to correct selectedIndex.
        const newSelectedIndex = this.props.excludeSelectedOptions
            ? // Since we're excluding the selected option, invalidate selection
                // so re-focusing wont immediately set it to the neighbouring option.
                null
            : this.getOptions().findIndex((i) => i.key === option.key);
        this.setState({
            selectedIndex: newSelectedIndex,
        });
    }
    setNewValue(newValue) {
        const { onChange, selected, multiple } = this.props;
        const { query } = this.state;
        // Trigger a change if the selected value is different and pass back
        // an array or string depending on the original value.
        if (multiple || Array.isArray(selected)) {
            onChange(newValue, query);
        }
        else {
            onChange(newValue.length > 0 ? newValue[0].key : '', query);
        }
    }
    decrementSelectedIndex() {
        const { selectedIndex } = this.state;
        const options = this.getOptions();
        const nextSelectedIndex = isNumber(selectedIndex)
            ? (selectedIndex === 0 ? options.length : selectedIndex) - 1
            : options.length - 1;
        this.setState({ selectedIndex: nextSelectedIndex });
    }
    incrementSelectedIndex() {
        const { selectedIndex } = this.state;
        const options = this.getOptions();
        const nextSelectedIndex = isNumber(selectedIndex)
            ? (selectedIndex + 1) % options.length
            : 0;
        this.setState({ selectedIndex: nextSelectedIndex });
    }
    announce(searchOptions) {
        const { debouncedSpeak } = this.props;
        if (!debouncedSpeak) {
            return;
        }
        if (!!searchOptions.length) {
            debouncedSpeak(sprintf(
            // translators: %d: number of results.
            _n('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', searchOptions.length, 'fincommerce'), searchOptions.length), 'assertive');
        }
        else {
            debouncedSpeak(__('No results.', 'fincommerce'), 'assertive');
        }
    }
    getOptions() {
        const { isSearchable, options, excludeSelectedOptions } = this.props;
        const { searchOptions } = this.state;
        const selected = this.getSelected();
        const selectedKeys = isArray(selected)
            ? selected.map((option) => option.key)
            : [];
        const shownOptions = isSearchable ? searchOptions : options;
        if (excludeSelectedOptions) {
            return shownOptions?.filter((option) => !selectedKeys.includes(option.key));
        }
        return shownOptions;
    }
    getOptionsByQuery(options, query) {
        const { getSearchExpression, maxResults, onFilter, ignoreDiacritics } = this.props;
        const filtered = [];
        // Create a regular expression to filter the options.
        const baseQuery = query ? query.trim() : '';
        const normalizedQuery = ignoreDiacritics
            ? baseQuery.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            : baseQuery;
        const expression = getSearchExpression(escapeRegExp(normalizedQuery));
        const search = expression ? new RegExp(expression, 'i') : /^$/;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            // Merge label into keywords
            let { keywords = [] } = option;
            if (typeof option.label === 'string') {
                keywords = [...keywords, option.label];
            }
            const isMatch = keywords.some((keyword) => {
                const normalizedKeyword = ignoreDiacritics
                    ? keyword
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                    : keyword;
                return search.test(normalizedKeyword);
            });
            if (!isMatch) {
                continue;
            }
            filtered.push(option);
            // Abort early if max reached
            if (maxResults && filtered.length === maxResults) {
                break;
            }
        }
        return onFilter(filtered, query);
    }
    setExpanded(value) {
        this.setState({ isExpanded: value });
    }
    search(query) {
        const cacheSearchOptions = this.cacheSearchOptions || [];
        const searchOptions = query !== null && !query.length && !this.props.hideBeforeSearch
            ? cacheSearchOptions
            : this.getOptionsByQuery(cacheSearchOptions, query);
        this.setState({
            query,
            isFocused: true,
            searchOptions,
            selectedIndex: query && query?.length > 0
                ? null
                : this.state.selectedIndex, // Only reset selectedIndex if we're actually searching.
        }, () => {
            this.setState({
                isExpanded: Boolean(this.getOptions()?.length),
            });
        });
        this.updateSearchOptions(query);
    }
    updateSearchOptions(query) {
        const { hideBeforeSearch, options, onSearch } = this.props;
        const promise = (this.activePromise = Promise.resolve(onSearch(options, query)).then((promiseOptions) => {
            if (promise !== this.activePromise) {
                // Another promise has become active since this one was asked to resolve, so do nothing,
                // or else we might end triggering a race condition updating the state.
                return;
            }
            this.cacheSearchOptions = promiseOptions;
            // Get all options if `hideBeforeSearch` is enabled and query is not null.
            const searchOptions = query !== null && !query.length && !hideBeforeSearch
                ? promiseOptions
                : this.getOptionsByQuery(promiseOptions, query);
            this.setState({
                searchOptions,
                selectedIndex: query && query?.length > 0
                    ? null
                    : this.state.selectedIndex, // Only reset selectedIndex if we're actually searching.
            }, () => {
                this.setState({
                    isExpanded: Boolean(this.getOptions().length),
                });
                this.announce(searchOptions);
            });
        }));
    }
    onAutofillChange(event) {
        const { options } = this.props;
        const searchOptions = this.getOptionsByQuery(options, event.target.value);
        if (searchOptions.length === 1) {
            this.selectOption(searchOptions[0]);
        }
    }
    render() {
        const { autofill, children, className, disabled, controlClassName, inlineTags, instanceId, isSearchable, options, virtualScroll, virtualItemHeight, virtualListHeight, } = this.props;
        const { isExpanded, isFocused, selectedIndex } = this.state;
        const hasMultiple = this.hasMultiple();
        const { key: selectedKey = '' } = (isNumber(selectedIndex) && options[selectedIndex]) || {};
        const listboxId = isExpanded
            ? `fincommerce-select-control__listbox-${instanceId}`
            : undefined;
        const activeId = isExpanded
            ? `fincommerce-select-control__option-${instanceId}-${selectedKey}`
            : undefined;
        return (createElement("div", { className: clsx('fincommerce-select-control', className, {
                'has-inline-tags': hasMultiple && inlineTags,
                'is-focused': isFocused,
                'is-searchable': isSearchable,
            }), ref: this.bindNode },
            autofill && (createElement("input", { onChange: this.onAutofillChange, name: autofill, type: "text", className: "fincommerce-select-control__autofill-input", tabIndex: -1 })),
            children,
            createElement(Control, { help: this.props.help, label: this.props.label, inlineTags: inlineTags, isSearchable: isSearchable, isFocused: isFocused, instanceId: instanceId, searchInputType: this.props.searchInputType, query: this.state.query, placeholder: this.props.placeholder, autoComplete: this.props.autoComplete, multiple: this.props.multiple, ariaLabel: this.props.ariaLabel, onBlur: this.props.onBlur, showAllOnFocus: this.props.showAllOnFocus, activeId: activeId, className: controlClassName, disabled: disabled, hasTags: hasMultiple, isExpanded: isExpanded, listboxId: listboxId, onSearch: this.search, selected: this.getSelected(), onChange: this.setNewValue, setExpanded: this.setExpanded, updateSearchOptions: this.updateSearchOptions, decrementSelectedIndex: this.decrementSelectedIndex, incrementSelectedIndex: this.incrementSelectedIndex, showClearButton: this.props.showClearButton }),
            !inlineTags && hasMultiple && (createElement(Tags, { onChange: this.props.onChange, showClearButton: this.props.showClearButton, selected: this.getSelected() })),
            isExpanded && (createElement(List, { instanceId: instanceId, selectedIndex: selectedIndex, staticList: this.props.staticList, listboxId: listboxId, node: this.node, onSelect: this.selectOption, onSearch: this.search, options: this.getOptions(), decrementSelectedIndex: this.decrementSelectedIndex, incrementSelectedIndex: this.incrementSelectedIndex, setExpanded: this.setExpanded, virtualScroll: virtualScroll, virtualItemHeight: virtualItemHeight, virtualListHeight: virtualListHeight }))));
    }
}
export default compose(withSpokenMessages, withInstanceId, withFocusOutside // this MUST be the innermost HOC as it calls handleFocusOutside
)(SelectControl);
