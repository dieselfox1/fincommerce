import { UseComboboxState, UseComboboxStateChangeOptions, GetInputPropsOptions } from 'downshift';
/**
 * Internal dependencies
 */
import { ChildrenType, DefaultItemType, getItemLabelType, getItemValueType } from './types';
export type SelectControlProps<ItemType> = {
    children?: ChildrenType<ItemType>;
    items: ItemType[];
    label: string | JSX.Element;
    getItemLabel?: getItemLabelType<ItemType>;
    getItemValue?: getItemValueType<ItemType>;
    getFilteredItems?: (allItems: ItemType[], inputValue: string, selectedItems: ItemType[], getItemLabel: getItemLabelType<ItemType>) => ItemType[];
    hasExternalTags?: boolean;
    multiple?: boolean;
    onInputChange?: (value: string | undefined, changes: Partial<Omit<UseComboboxState<ItemType>, 'inputValue'>>) => void;
    onRemove?: (item: ItemType) => void;
    onSelect?: (selected: ItemType) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onFocus?: (data: {
        inputValue: string;
    }) => void;
    onBlur?: (data: {
        inputValue: string;
    }) => void;
    stateReducer?: (state: UseComboboxState<ItemType | null>, actionAndChanges: UseComboboxStateChangeOptions<ItemType | null>) => Partial<UseComboboxState<ItemType | null>>;
    placeholder?: string;
    selected: ItemType | ItemType[] | null;
    className?: string;
    disabled?: boolean;
    inputProps?: GetInputPropsOptions;
    suffix?: JSX.Element | null;
    showToggleButton?: boolean;
    readOnlyWhenClosed?: boolean;
    /**
     * This is a feature already implemented in downshift@7.0.0 through the
     * reducer. In order for us to use it this prop is added temporarily until
     * current downshift version get updated.
     *
     * @see https://www.downshift-js.com/use-multiple-selection#usage-with-combobox
     * @default false
     */
    __experimentalOpenMenuOnFocus?: boolean;
};
export declare const selectControlStateChangeTypes: {
    InputKeyDownArrowDown: import("downshift").UseComboboxStateChangeTypes.InputKeyDownArrowDown;
    InputKeyDownArrowUp: import("downshift").UseComboboxStateChangeTypes.InputKeyDownArrowUp;
    InputKeyDownEscape: import("downshift").UseComboboxStateChangeTypes.InputKeyDownEscape;
    InputKeyDownHome: import("downshift").UseComboboxStateChangeTypes.InputKeyDownHome;
    InputKeyDownEnd: import("downshift").UseComboboxStateChangeTypes.InputKeyDownEnd;
    InputKeyDownEnter: import("downshift").UseComboboxStateChangeTypes.InputKeyDownEnter;
    InputChange: import("downshift").UseComboboxStateChangeTypes.InputChange;
    InputBlur: import("downshift").UseComboboxStateChangeTypes.InputBlur;
    MenuMouseLeave: import("downshift").UseComboboxStateChangeTypes.MenuMouseLeave;
    ItemMouseMove: import("downshift").UseComboboxStateChangeTypes.ItemMouseMove;
    ItemClick: import("downshift").UseComboboxStateChangeTypes.ItemClick;
    ToggleButtonClick: import("downshift").UseComboboxStateChangeTypes.ToggleButtonClick;
    FunctionToggleMenu: import("downshift").UseComboboxStateChangeTypes.FunctionToggleMenu;
    FunctionOpenMenu: import("downshift").UseComboboxStateChangeTypes.FunctionOpenMenu;
    FunctionCloseMenu: import("downshift").UseComboboxStateChangeTypes.FunctionCloseMenu;
    FunctionSetHighlightedIndex: import("downshift").UseComboboxStateChangeTypes.FunctionSetHighlightedIndex;
    FunctionSelectItem: import("downshift").UseComboboxStateChangeTypes.FunctionSelectItem;
    FunctionSetInputValue: import("downshift").UseComboboxStateChangeTypes.FunctionSetInputValue;
    FunctionReset: import("downshift").UseComboboxStateChangeTypes.FunctionReset;
    ControlledPropUpdatedSelectedItem: import("downshift").UseComboboxStateChangeTypes.ControlledPropUpdatedSelectedItem;
};
declare function SelectControl<ItemType = DefaultItemType>({ getItemLabel, getItemValue, hasExternalTags, children, multiple, items, label, getFilteredItems, onInputChange, onRemove, onSelect, onFocus, onBlur, onKeyDown, stateReducer, placeholder, selected, className, disabled, inputProps, suffix, showToggleButton, readOnlyWhenClosed, __experimentalOpenMenuOnFocus, }: SelectControlProps<ItemType>): JSX.Element;
export { SelectControl };
//# sourceMappingURL=select-control.d.ts.map