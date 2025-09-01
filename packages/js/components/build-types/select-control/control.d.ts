import { Component } from '@wordpress/element';
import { RefObject, ChangeEvent, FocusEvent, KeyboardEvent, InputHTMLAttributes } from 'react';
import { Selected, Option } from './types';
type Props = {
    /**
     * Bool to determine if tags should be rendered.
     */
    hasTags?: boolean;
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
     * ID of the main SelectControl instance.
     */
    instanceId?: number;
    /**
     * A label to use for the main input.
     */
    label?: string;
    /**
     * ID used for a11y in the listbox.
     */
    listboxId?: string;
    /**
     * Function called when the input is blurred.
     */
    onBlur?: () => void;
    /**
     * Function called when selected results change, passed result list.
     */
    onChange: (selected: Option[]) => void;
    /**
     * Function called when input field is changed or focused.
     */
    onSearch: (query: string) => void;
    /**
     * A placeholder for the search input.
     */
    placeholder?: string;
    /**
     * Search query entered by user.
     */
    query?: string | null;
    /**
     * An array of objects describing selected values. If the label of the selected
     * value is omitted, the Tag of that value will not be rendered inside the
     * search box.
     */
    selected?: Selected;
    /**
     * Show all options on focusing, even if a query exists.
     */
    showAllOnFocus?: boolean;
    /**
     * Control input autocomplete field, defaults: off.
     */
    autoComplete?: string;
    /**
     * Function to execute when the control should be expanded or collapsed.
     */
    setExpanded: (expanded: boolean) => void;
    /**
     * Function to execute when the search value changes.
     */
    updateSearchOptions: (query: string) => void;
    /**
     * Function to execute when keyboard navigation should decrement the selected index.
     */
    decrementSelectedIndex: () => void;
    /**
     * Function to execute when keyboard navigation should increment the selected index.
     */
    incrementSelectedIndex: () => void;
    /**
     * Multi-select mode allows multiple options to be selected.
     */
    multiple?: boolean;
    /**
     * Is the control currently focused.
     */
    isFocused?: boolean;
    /**
     * ID for accessibility purposes. aria-activedescendant will be set to this value.
     */
    activeId?: string;
    /**
     * Disable the control.
     */
    disabled?: boolean;
    /**
     * Is the control currently expanded. This is for accessibility purposes.
     */
    isExpanded?: boolean;
    /**
     * The type of input to use for the search field.
     */
    searchInputType?: InputHTMLAttributes<HTMLInputElement>['type'];
    /**
     * The aria label for the search input.
     */
    ariaLabel?: string;
    /**
     * Class name to be added to the input.
     */
    className?: string;
    /**
     * Show the clear button.
     */
    showClearButton?: boolean;
};
type State = {
    isActive: boolean;
};
/**
 * A search control to allow user input to filter the options.
 */
declare class Control extends Component<Props, State> {
    input: RefObject<HTMLInputElement>;
    constructor(props: Props);
    updateSearch(onSearch: (query: string) => void): (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus(onSearch: (query: string) => void): (event: FocusEvent<HTMLInputElement>) => void;
    onBlur(): void;
    onKeyDown(event: KeyboardEvent<HTMLInputElement>): void;
    renderButton(): JSX.Element | null;
    renderInput(): JSX.Element;
    getInputValue(): string;
    render(): JSX.Element;
}
export default Control;
//# sourceMappingURL=control.d.ts.map