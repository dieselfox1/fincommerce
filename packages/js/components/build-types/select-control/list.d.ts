import { RefObject } from 'react';
import { Component } from '@wordpress/element';
import { FixedSizeList } from 'react-window';
/**
 * Internal dependencies
 */
import { Option } from './types';
type Props = {
    /**
     * ID of the main SelectControl instance.
     */
    listboxId?: string;
    /**
     * ID used for a11y in the listbox.
     */
    instanceId: number;
    /**
     * Parent node to bind keyboard events to.
     */
    node: HTMLElement | null;
    /**
     * Function to execute when an option is selected.
     */
    onSelect: (option: Option) => void;
    /**
     * Array of options to display.
     */
    options: Array<Option>;
    /**
     * Integer for the currently selected item.
     */
    selectedIndex: number | null | undefined;
    /**
     * Bool to determine if the list should be positioned absolutely or statically.
     */
    staticList: boolean;
    /**
     * Function to execute when keyboard navigation should decrement the selected index.
     */
    decrementSelectedIndex: () => void;
    /**
     * Function to execute when keyboard navigation should increment the selected index.
     */
    incrementSelectedIndex: () => void;
    /**
     * Function to execute when the search value changes.
     */
    onSearch: (option: string | null) => void;
    /**
     * Function to execute when the list should be expanded or collapsed.
     */
    setExpanded: (expanded: boolean) => void;
    /**
     * Enable virtual scrolling for large lists of options.
     */
    virtualScroll?: boolean;
    /**
     * Height in pixels for each virtual item.
     */
    virtualItemHeight?: number;
    /**
     * Maximum height in pixels for the virtualized list.
     */
    virtualListHeight?: number;
};
/**
 * A list box that displays filtered options after search.
 */
declare class List extends Component<Props> {
    optionRefs: {
        [key: number]: RefObject<HTMLButtonElement>;
    };
    listbox: RefObject<HTMLDivElement>;
    listRef: RefObject<FixedSizeList>;
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    getOptionRef(index: number): RefObject<HTMLButtonElement>;
    select(option: Option): void;
    scrollToOption(index: number): void;
    handleKeyDown(event: KeyboardEvent): void;
    toggleKeyEvents(isListening: boolean): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default List;
//# sourceMappingURL=list.d.ts.map