/**
 * Internal dependencies
 */
import { CheckedStatus, Item, TreeItemProps } from '../types';
export declare function useSelection({ item, multiple, shouldNotRecursivelySelect, selected, level, index, onSelect, onRemove, }: Pick<TreeItemProps, 'item' | 'multiple' | 'selected' | 'level' | 'index' | 'onSelect' | 'onRemove' | 'shouldNotRecursivelySelect'>): {
    multiple: boolean | undefined;
    selected: Item | Item[] | undefined;
    checkedStatus: CheckedStatus;
    onSelectChild: (checked: boolean) => void;
    onSelectChildren: (value: Item | Item[]) => void;
    onRemoveChildren: (value: Item | Item[]) => void;
};
//# sourceMappingURL=use-selection.d.ts.map