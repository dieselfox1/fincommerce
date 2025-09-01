import { Item, TreeControlProps } from '../experimental-tree-control/types';
interface SelectTreeProps extends TreeControlProps {
    id: string;
    selected?: Item | Item[];
    treeRef?: React.ForwardedRef<HTMLOListElement>;
    isLoading?: boolean;
    disabled?: boolean;
    label: string | JSX.Element;
    help?: string | JSX.Element;
    onInputChange?: (value: string | undefined) => void;
    initialInputValue?: string | undefined;
    isClearingAllowed?: boolean;
    onClear?: () => void;
    placeholder?: string;
}
export declare const SelectTree: ({ items, treeRef: ref, isLoading, disabled, initialInputValue, onInputChange, shouldShowCreateButton, help, isClearingAllowed, onClear, ...props }: SelectTreeProps) => JSX.Element;
export {};
//# sourceMappingURL=select-tree.d.ts.map