/**
 * External dependencies
 */
import { ReactNode } from 'react';
import { Slot } from '@wordpress/components';
import { ProductFillLocationType } from '../woo-product-tab-item';
type WooProductFieldItemProps = {
    id: string;
    sections: ProductFillLocationType[];
    pluginId: string;
    children: ReactNode;
};
type WooProductFieldSlotProps = {
    section: string;
};
export declare const WooProductFieldItem: {
    ({ children, sections, id, }: WooProductFieldItemProps): JSX.Element;
    Slot({ fillProps, section, }: WooProductFieldSlotProps & {
        fillProps?: React.ComponentProps<typeof Slot>["fillProps"];
    }): JSX.Element;
};
export {};
//# sourceMappingURL=woo-product-field-item.d.ts.map