/**
 * External dependencies
 */
import { ReactNode } from 'react';
import { Slot } from '@wordpress/components';
import { ProductFillLocationType } from '../woo-product-tab-item';
type WooProductSectionItemProps = {
    id: string;
    tabs: ProductFillLocationType[];
    pluginId: string;
    children: ReactNode;
};
type WooProductSectionSlotProps = {
    tab: string;
};
export declare const WooProductSectionItem: {
    ({ children, tabs, }: WooProductSectionItemProps): JSX.Element;
    Slot({ fillProps, tab, }: WooProductSectionSlotProps & {
        fillProps: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=woo-product-section-item.d.ts.map