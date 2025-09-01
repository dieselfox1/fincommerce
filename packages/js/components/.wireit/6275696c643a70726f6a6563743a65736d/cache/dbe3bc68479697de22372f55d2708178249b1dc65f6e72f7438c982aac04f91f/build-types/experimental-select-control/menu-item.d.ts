/**
 * External dependencies
 */
import { CSSProperties, ReactElement } from 'react';
/**
 * Internal dependencies
 */
import { getItemPropsType } from './types';
export type MenuItemProps<ItemType> = {
    index: number;
    isActive: boolean;
    item: ItemType;
    children: ReactElement | string;
    getItemProps: getItemPropsType<ItemType>;
    activeStyle?: CSSProperties;
    tooltipText?: string;
    className?: string;
};
export declare const MenuItem: <ItemType>({ children, getItemProps, index, isActive, activeStyle, item, tooltipText, className, }: MenuItemProps<ItemType>) => JSX.Element;
//# sourceMappingURL=menu-item.d.ts.map