/**
 * Internal dependencies
 */
import { getItemLabelType } from './types';
export declare const defaultGetItemLabel: <ItemType>(item: ItemType | null) => string;
export declare const defaultGetItemValue: <ItemType>(item: ItemType | null) => string | number;
export declare const defaultGetFilteredItems: <ItemType>(allItems: ItemType[], inputValue: string, selectedItems: ItemType[], getItemLabel: getItemLabelType<ItemType>) => ItemType[];
//# sourceMappingURL=utils.d.ts.map