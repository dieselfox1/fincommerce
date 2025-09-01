/**
 * External dependencies
 */
import { ReactElement, ReactNode } from 'react';
import { TabPanel } from '@wordpress/components';
export type ProductFillLocationType = {
    name: string;
    order?: number;
};
type TabPanelProps = React.ComponentProps<typeof TabPanel> & {
    order: number;
    name: string;
};
type FillProps = Record<string, unknown>;
type WooProductTabItemProps = {
    id: string;
    pluginId: string;
    tabProps: TabPanelProps | ((fillProps: FillProps) => TabPanelProps);
    templates?: Array<ProductFillLocationType>;
    children: ReactNode[];
};
type WooProductFieldSlotProps = {
    template: string;
    children: (tabs: TabPanelProps[], tabChildren: Record<string, ReactNode[]>) => ReactElement[] | null;
    fillProps: FillProps;
} & WooProductTabItemProps;
type WooProductTabItemComponent = React.FC<WooProductFieldSlotProps> & {
    Slot: React.FC<WooProductFieldSlotProps>;
};
export declare const WooProductTabItem: WooProductTabItemComponent;
export {};
//# sourceMappingURL=woo-product-tab-item.d.ts.map