import { Component } from '@wordpress/element';
import { ChangeEvent, InputHTMLAttributes } from 'react';
/**
 * Internal dependencies
 */
import { Option, Selected } from './types';
type Props = {
    /**
     * Name to use for the autofill field, not used if no string is passed.
     */
    autofill?: string;
    /**
     * A renderable component (or string) which will be displayed before the `Control` of this component.
     */
    children?: React.ReactNode;
    /**
     * Class name applied to parent div.
     */
    className?: string;
    /**
     * Class name applied to control wrapper.
     */
    controlClassName?: string;
    /**
     * Whether to ignore diacritics when matching search queries.
     * If true, both the user’s query and all option keywords are normalised to their base characters.
     */
    ignoreDiacritics?: boolean;
    /**
     * Allow the select options to be disabled.
     */
    disabled?: boolean;
    /**
     * Exclude already selected options from the options list.
     */
    excludeSelectedOptions?: boolean;
    /**
     * Add or remove items to the list of options after filtering,
     * passed the array of filtered options and should return an array of options.
     */
    onFilter?: (options: Array<Option>, query: string | null) => Array<Option>;
    /**
     * Function to add regex expression to the filter the results, passed the search query.
     */
    getSearchExpression?: (query: string) => string | RegExp | null;
    /**
     * Help text to be appended beneath the input.
     */
    help?: React.ReactNode;
    /**
     * Render tags inside input, otherwise render below input.
     */
    inlineTags?: boolean;
    /**
     * Allow the select options to be filtered by search input.
     */
    isSearchable?: boolean;
    /**
     * A label to use for the main input.
     */
    label?: string;
    /**
     * Function called when selected results change, passed result list.
     */
    onChange?: (selected: string | Option[], query?: string | null) => void;
    /**
     * Function run after search query is updated, passed previousOptions and query,
     * should return a promise with an array of updated options.
     */
    onSearch?: (previousOptions: Array<Option>, query: string | null) => Promise<Array<Option>>;
    /**
     * An array of objects for the options list.  The option along with its key, label and
     * value will be returned in the onChange event.
     */
    options: Option[];
    /**
     * A placeholder for the search input.
     */
    placeholder?: string;
    /**
     * Time in milliseconds to debounce the search function after typing.
     */
    searchDebounceTime?: number;
    /**
     * An array of objects describing selected values or optionally a string for a single value.
     * If the label of the selected value is omitted, the Tag of that value will not
     * be rendered inside the search box.
     */
    selected?: Selected;
    /**
     * A limit for the number of results shown in the options menu.  Set to 0 for no limit.
     */
    maxResults?: number;
    /**
     * Allow multiple option selections.
     */
    multiple?: boolean;
    /**
     * Render a 'Clear' button next to the input box to remove its contents.
     */
    showClearButton?: boolean;
    /**
     * The input type for the search box control.
     */
    searchInputType?: InputHTMLAttributes<HTMLInputElement>['type'];
    /**
     * Only show list options after typing a search query.
     */
    hideBeforeSearch?: boolean;
    /**
     * Show all options on focusing, even if a query exists.
     */
    showAllOnFocus?: boolean;
    /**
     * Render results list positioned statically instead of absolutely.
     */
    staticList?: boolean;
    /**
     * autocomplete prop for the Control input field.
     */
    autoComplete?: string;
    /**
     * Instance ID for the component.
     */
    instanceId?: number;
    /**
     * From withSpokenMessages
     */
    debouncedSpeak?: (message: string, assertive?: string) => void;
    /**
     * aria-label for the search input.
     */
    ariaLabel?: string;
    /**
     * On Blur callback.
     */
    onBlur?: () => void;
    /**
     * Enable virtual scrolling for large lists of options.
     */
    virtualScroll?: boolean;
    /**
     * Height in pixels for each virtual item. Required when virtualScroll is true.
     */
    virtualItemHeight?: number;
    /**
     * Maximum height in pixels for the virtualized list. Default is 300.
     */
    virtualListHeight?: number;
};
type State = {
    isExpanded: boolean;
    isFocused: boolean;
    query: string | null;
    searchOptions: Option[];
    selectedIndex?: number | null;
};
/**
 * A search box which filters options while typing,
 * allowing a user to select from an option from a filtered list.
 */
export declare class SelectControl extends Component<Props, State> {
    static defaultProps: Partial<Props>;
    node: HTMLDivElement | null;
    activePromise: Promise<void | Option[]> | null;
    cacheSearchOptions: Option[];
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    bindNode(node: HTMLDivElement): void;
    reset(selected?: Selected | Option[] | undefined): void;
    handleFocusOutside(): void;
    hasMultiple(): boolean;
    getSelected(): Selected | undefined;
    selectOption(option: Option): void;
    setNewValue(newValue: Option[]): void;
    decrementSelectedIndex(): void;
    incrementSelectedIndex(): void;
    announce(searchOptions: Option[]): void;
    getOptions(): Option[];
    getOptionsByQuery(options: Option[], query: string | null): Option[];
    setExpanded(value: boolean): void;
    search(query: string | null): void;
    updateSearchOptions(query: string | null): void;
    onAutofillChange(event: ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
declare const _default: React.FC<Props>;
export default _default;
//# sourceMappingURL=index.d.ts.map