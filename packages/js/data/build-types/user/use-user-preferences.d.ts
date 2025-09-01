/**
 * Internal dependencies
 */
import { UserPreferences } from './types';
/**
 * Custom react hook for retrieving thecurrent user's FinCommerce preferences.
 *
 * This is a wrapper around @wordpress/core-data's getCurrentUser() and saveUser().
 */
export declare const useUserPreferences: () => {
    updateUserPreferences: <T extends Record<string, unknown> = UserPreferences>(userPrefs: UserPreferences | T) => Promise<{
        error: Error;
        updatedUser: undefined;
    } | {
        error: unknown;
        updatedUser: never;
    } | {
        updatedUser: {
            fincommerce_meta: {
                activity_panel_inbox_last_read?: any;
                activity_panel_reviews_last_read?: any;
                android_app_banner_dismissed?: any;
                categories_report_columns?: any;
                coupons_report_columns?: any;
                customers_report_columns?: any;
                dashboard_chart_interval?: any;
                dashboard_chart_type?: any;
                dashboard_leaderboard_rows?: any;
                dashboard_sections?: any;
                homepage_layout?: any;
                homepage_stats?: any;
                orders_report_columns?: any;
                products_report_columns?: any;
                revenue_report_columns?: any;
                task_list_tracked_started_tasks?: any;
                taxes_report_columns?: any;
                variable_product_tour_shown?: any;
                variable_product_block_tour_shown?: any;
                variations_report_columns?: any;
                local_attributes_notice_dismissed_ids?: any;
                variable_items_without_price_notice_dismissed?: any;
                product_advice_card_dismissed?: any;
                launch_your_store_tour_hidden?: any;
                coming_soon_banner_dismissed?: any;
            };
            id: number;
            slug: string;
            username: string;
            name: string;
            first_name: string;
            last_name: string;
            email: string;
            url: string;
            description: string;
            link: string;
            locale: string;
            nickname: string;
            registered_date: string;
            roles: string[];
            password?: string | undefined;
            capabilities: import("@wordpress/core-data/build-types/entity-types/helpers").OmitNevers<Record<string, string>, {
                [x: string]: string;
            }>;
            extra_capabilities: import("@wordpress/core-data/build-types/entity-types/helpers").OmitNevers<Record<string, string>, {
                [x: string]: string;
            }>;
            avatar_urls: import("@wordpress/core-data/build-types/entity-types/helpers").AvatarUrls;
            meta: import("@wordpress/core-data/build-types/entity-types/helpers").OmitNevers<Record<string, string>, {
                [x: string]: string;
            }>;
            is_super_admin: boolean;
        };
        error?: undefined;
    }>;
    activity_panel_inbox_last_read?: string;
    activity_panel_reviews_last_read?: string;
    android_app_banner_dismissed?: string;
    categories_report_columns?: string;
    coupons_report_columns?: string;
    customers_report_columns?: string;
    dashboard_chart_interval?: string;
    dashboard_chart_type?: string;
    dashboard_leaderboard_rows?: string;
    dashboard_sections?: string;
    homepage_layout?: string;
    homepage_stats?: string;
    orders_report_columns?: string;
    products_report_columns?: string;
    revenue_report_columns?: string;
    task_list_tracked_started_tasks?: {
        [key: string]: number;
    };
    taxes_report_columns?: string;
    variable_product_tour_shown?: string;
    variable_product_block_tour_shown?: string;
    variations_report_columns?: string;
    local_attributes_notice_dismissed_ids?: number[];
    variable_items_without_price_notice_dismissed?: Record<number, string>;
    product_advice_card_dismissed?: {
        [key: string]: "yes" | "no";
    };
    launch_your_store_tour_hidden?: "yes" | "no" | "";
    coming_soon_banner_dismissed?: "yes" | "no" | "";
    isRequesting: boolean;
};
//# sourceMappingURL=use-user-preferences.d.ts.map