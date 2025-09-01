import { TreeItemType } from '@fincommerce/components';
import { ProductTagNodeProps, TagFieldProps } from './types';
export declare function mapFromTagToTreeItem(val: ProductTagNodeProps): TreeItemType;
export declare function mapFromTreeItemToTag(val: TreeItemType): ProductTagNodeProps;
export declare function mapFromTagsToTreeItems(tags: ProductTagNodeProps[]): TreeItemType[];
export declare function mapFromTreeItemsToTags(tags: TreeItemType[]): ProductTagNodeProps[];
export declare const TagField: ({ id, isVisible, label, placeholder, value, onChange, }: TagFieldProps) => JSX.Element;
//# sourceMappingURL=tag-field.d.ts.map