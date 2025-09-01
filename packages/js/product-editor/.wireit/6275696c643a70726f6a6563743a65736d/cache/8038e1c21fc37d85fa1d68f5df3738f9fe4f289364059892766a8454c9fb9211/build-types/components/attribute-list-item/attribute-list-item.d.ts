/**
 * External dependencies
 */
import { DragEventHandler } from 'react';
import { ProductProductAttribute } from '@fincommerce/data';
type AttributeListItemProps = {
    attribute: ProductProductAttribute;
    editLabel?: string;
    removeLabel?: string;
    onDragStart?: DragEventHandler<HTMLDivElement>;
    onDragEnd?: DragEventHandler<HTMLDivElement>;
    onEditClick?: (attribute: ProductProductAttribute) => void;
    onRemoveClick?: (attribute: ProductProductAttribute) => void;
};
export declare const AttributeListItem: ({ attribute, editLabel, removeLabel, onDragStart, onDragEnd, onEditClick, onRemoveClick, }: AttributeListItemProps) => JSX.Element;
export {};
//# sourceMappingURL=attribute-list-item.d.ts.map