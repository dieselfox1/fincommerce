/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import type { Option } from '../select-control/types';
import type { SearchProps, SearchState } from './types';
/**
 * A search box which autocompletes results while typing, allowing for the user to select an existing object
 * (product, order, customer, etc). Currently only products are supported.
 */
export declare class Search extends Component<SearchProps, SearchState> {
    static defaultProps: {
        allowFreeTextSearch: boolean;
        onChange: (...args: any[]) => void;
        selected: never[];
        inlineTags: boolean;
        showClearButton: boolean;
        staticResults: boolean;
        disabled: boolean;
        multiple: boolean;
    };
    constructor(props: SearchProps);
    getAutocompleter(): import("./autocompleters").AutoCompleter;
    getFormattedOptions(options: unknown[], query: string): Option[];
    fetchOptions(previousOptions: unknown[], query: string | null): Promise<Option[]>;
    updateSelected(selected: Option[]): void;
    onChange(selected: Option[] | string): void;
    appendFreeTextSearch(options: Option[], query: string | null): Option[];
    render(): JSX.Element;
}
//# sourceMappingURL=search.d.ts.map