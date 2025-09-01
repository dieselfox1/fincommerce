import { getItemLabelType, getItemValueType, SelectedItemFocusHandle } from './types';
type SelectedItemsProps<ItemType> = {
    isReadOnly: boolean;
    items: ItemType[];
    getItemLabel: getItemLabelType<ItemType>;
    getItemValue: getItemValueType<ItemType>;
    getSelectedItemProps: ({ selectedItem: any, index: any }: {
        selectedItem: any;
        index: any;
    }) => {
        [key: string]: string;
    };
    onRemove: (item: ItemType) => void;
    onBlur?: (event: React.FocusEvent) => void;
    onSelectedItemsEnd?: () => void;
};
declare const PrivateSelectedItems: <ItemType>({ isReadOnly, items, getItemLabel, getItemValue, getSelectedItemProps, onRemove, onBlur, onSelectedItemsEnd, }: SelectedItemsProps<ItemType>, ref: React.ForwardedRef<SelectedItemFocusHandle>) => JSX.Element;
export declare const SelectedItems: <ItemType>(props: SelectedItemsProps<ItemType> & {
    ref?: React.ForwardedRef<SelectedItemFocusHandle>;
}) => ReturnType<typeof PrivateSelectedItems>;
export {};
//# sourceMappingURL=selected-items.d.ts.map