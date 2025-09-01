/**
 * External dependencies
 */
import { Product } from '@fincommerce/data';
/**
 * Get the data for a tab click.
 *
 * @param {string}  tabId   Clicked tab.
 * @param {Product} product Current product.
 * @return {Object} The data for the event.
 */
export declare function getTabTracksData(tabId: string, product: Product): {
    product_tab: string;
    product_type: import("@fincommerce/data").ProductType;
    source: string;
} | {
    is_store_stock_management_enabled: boolean;
    product_tab: string;
    product_type: import("@fincommerce/data").ProductType;
    source: string;
};
//# sourceMappingURL=get-tab-tracks-data.d.ts.map