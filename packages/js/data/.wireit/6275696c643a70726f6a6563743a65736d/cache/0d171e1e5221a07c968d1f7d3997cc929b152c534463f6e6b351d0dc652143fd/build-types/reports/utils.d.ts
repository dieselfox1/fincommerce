import { select as WPSelect } from '@wordpress/data';
import { ReportItemsEndpoint, ReportStatEndpoint, ReportStatObject } from './types';
import type { ReportsSelect } from './';
type Filter = {
    param: string;
    filters: Array<Record<string, unknown>>;
};
type AdvancedFilters = {
    filters: {
        [key: string]: {
            input: {
                component: string;
            };
        };
    };
} | Record<string, never>;
type QueryOptions = {
    endpoint: ReportStatEndpoint;
    dataType: 'primary' | 'secondary';
    query: Record<string, string>;
    limitBy: string[];
    filters: Array<Filter>;
    advancedFilters: AdvancedFilters;
    defaultDateRange: string;
    tableQuery: Record<string, string>;
    fields: string[];
    selector: ReportsSelect;
    select: typeof WPSelect;
};
/**
 * Add timestamp to advanced filter parameters involving date. The api
 * expects a timestamp for these values similar to `before` and `after`.
 *
 * @param {Object} config       - advancedFilters config object.
 * @param {Object} activeFilter - an active filter.
 * @return {Object} - an active filter with timestamp added to date values.
 */
export declare function timeStampFilterDates(config: AdvancedFilters, activeFilter: ActiveFilter): ActiveFilter;
export declare function getQueryFromConfig(config: Filter, advancedFilters: QueryOptions['advancedFilters'], query: QueryOptions['query']): {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
    match: string;
} | {
    [x: number]: string;
};
/**
 * Add filters and advanced filters values to a query object.
 *
 * @param {Object} options                   arguments
 * @param {string} options.endpoint          Report API Endpoint
 * @param {Object} options.query             Query parameters in the url
 * @param {Array}  options.limitBy           Properties used to limit the results. It will be used in the API call to send the IDs.
 * @param {Array}  [options.filters]         config filters
 * @param {Object} [options.advancedFilters] config advanced filters
 * @return {Object} A query object with the values from filters and advanced fitlters applied.
 */
export declare function getFilterQuery(options: Omit<QueryOptions, 'endpoint'> & {
    endpoint: ReportItemsEndpoint | ReportStatEndpoint;
}): {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
    match: string;
} | {
    [x: number]: string;
};
type ActiveFilter = {
    key: string;
    rule: 'after' | 'before';
    value: string;
};
/**
 * Returns true if a report object is empty.
 *
 * @param {Object} report   Report to check
 * @param {string} endpoint Endpoint slug
 * @return {boolean}        True if report is data is empty.
 */
export declare function isReportDataEmpty(report: ReportStatObject, endpoint: ReportStatEndpoint): boolean;
/**
 * Constructs and returns a query associated with a Report data request.
 *
 * @param {Object} options                   arguments
 * @param {string} options.endpoint          Report API Endpoint
 * @param {string} options.dataType          'primary' or 'secondary'.
 * @param {Object} options.query             Query parameters in the url.
 * @param {Array}  [options.filters]         config filters
 * @param {Object} [options.advancedFilters] config advanced filters
 * @param {Array}  options.limitBy           Properties used to limit the results. It will be used in the API call to send the IDs.
 * @param {string} options.defaultDateRange  User specified default date range.
 * @return {Object} data request query parameters.
 */
export declare function getRequestQuery(options: QueryOptions): {
    fields: string[];
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
    match: string;
} | {
    fields: string[];
} | {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
    match: string;
    order: string;
    interval: string;
    per_page: number;
    after: string;
    before: string;
    segmentby: string;
    fields: string[];
} | {
    order: string;
    interval: string;
    per_page: number;
    after: string;
    before: string;
    segmentby: string;
    fields: string[];
};
/**
 * Returns summary number totals needed to render a report page.
 *
 * @param {Object} options                   arguments
 * @param {string} options.endpoint          Report API Endpoint
 * @param {Object} options.query             Query parameters in the url
 * @param {Object} options.select            Instance of @wordpress/select
 * @param {Array}  [options.filters]         config filters
 * @param {Object} [options.advancedFilters] config advanced filters
 * @param {Array}  options.limitBy           Properties used to limit the results. It will be used in the API call to send the IDs.
 * @param {string} options.defaultDateRange  User specified default date range.
 * @return {Object} Object containing summary number responses.
 */
export declare function getSummaryNumbers<T extends ReportStatEndpoint>(options: QueryOptions): {
    isRequesting: boolean;
    isError: boolean;
    totals: {
        primary: null;
        secondary: null;
    };
} | {
    totals: {
        primary: {
            items_sold: number;
            net_revenue: number;
            orders_count: number;
            segments: Array<import("./types").Segment>;
        } | {
            items_sold: number;
            net_revenue: number;
            orders_count: number;
            segments: Array<import("./types").Segment>;
        } | {
            total_sales: number;
            net_revenue: number;
            coupons: number;
            coupons_count: number;
            shipping: number;
            taxes: number;
            refunds: number;
            orders_count: number;
            num_items_sold: number;
            products: number;
            gross_sales: number;
            segments: Array<import("./types").Segment>;
        } | {
            download_count: number;
        } | {
            total_tax: number;
            order_tax: number;
            shipping_tax: number;
            orders_count: number;
            tax_codes: number;
            segments: Array<import("./types").Segment>;
        } | {
            amount: number;
            coupons_count: number;
            orders_count: number;
            segments: Array<import("./types").Segment>;
        } | {
            customers_count: number;
            avg_orders_count: number;
            avg_total_spend: number;
            avg_avg_order_value: number;
        };
        secondary: {
            items_sold: number;
            net_revenue: number;
            orders_count: number;
            segments: Array<import("./types").Segment>;
        } | {
            items_sold: number;
            net_revenue: number;
            orders_count: number;
            segments: Array<import("./types").Segment>;
        } | {
            total_sales: number;
            net_revenue: number;
            coupons: number;
            coupons_count: number;
            shipping: number;
            taxes: number;
            refunds: number;
            orders_count: number;
            num_items_sold: number;
            products: number;
            gross_sales: number;
            segments: Array<import("./types").Segment>;
        } | {
            download_count: number;
        } | {
            total_tax: number;
            order_tax: number;
            shipping_tax: number;
            orders_count: number;
            tax_codes: number;
            segments: Array<import("./types").Segment>;
        } | {
            amount: number;
            coupons_count: number;
            orders_count: number;
            segments: Array<import("./types").Segment>;
        } | {
            customers_count: number;
            avg_orders_count: number;
            avg_total_spend: number;
            avg_avg_order_value: number;
        };
    };
    isRequesting: boolean;
    isError: boolean;
};
/**
 * Returns all of the data needed to render a chart with summary numbers on a report page.
 *
 * @param {Object} options                  arguments
 * @param {string} options.endpoint         Report API Endpoint
 * @param {string} options.dataType         'primary' or 'secondary'
 * @param {Object} options.query            Query parameters in the url
 * @param {Object} options.selector         Instance of @wordpress/select response
 * @param {Object} options.select           (Depreciated) Instance of @wordpress/select
 * @param {Array}  options.limitBy          Properties used to limit the results. It will be used in the API call to send the IDs.
 * @param {string} options.defaultDateRange User specified default date range.
 * @return {Object}  Object containing API request information (response, fetching, and error details)
 */
export declare function getReportChartData<T extends ReportStatEndpoint>(options: QueryOptions): {
    isEmpty: boolean;
    isError: boolean;
    isRequesting: boolean;
    data: {
        totals: any;
        intervals: any;
    };
};
/**
 * Returns a formatting function or string to be used by d3-format
 *
 * @param {string}   type         Type of number, 'currency', 'number', 'percent', 'average'
 * @param {Function} formatAmount format currency function
 * @return {string|Function}  returns a number format based on the type or an overriding formatting function
 */
export declare function getTooltipValueFormat(type: string, formatAmount: (amount: number) => string): "," | ((amount: number) => string) | ".0%" | ",.2r";
/**
 * Returns query needed for a request to populate a table.
 *
 * @param {Object} options                  arguments
 * @param {string} options.endpoint         Report API Endpoint
 * @param {Object} options.query            Query parameters in the url
 * @param {Object} options.tableQuery       Query parameters specific for that endpoint
 * @param {string} options.defaultDateRange User specified default date range.
 * @return {Object} Object    Table data response
 */
export declare function getReportTableQuery(options: Omit<QueryOptions, 'endpoint'> & {
    endpoint: ReportItemsEndpoint;
}): {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: PropertyKey): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: PropertyKey): boolean;
    match: string;
    orderby: string;
    order: string;
    after: string | undefined;
    before: string | undefined;
    page: string;
    per_page: string | number;
} | {
    orderby: string;
    order: string;
    after: string | undefined;
    before: string | undefined;
    page: string;
    per_page: string | number;
};
/**
 * Returns table data needed to render a report page.
 *
 * @param {Object} options                  arguments
 * @param {string} options.endpoint         Report API Endpoint
 * @param {Object} options.query            Query parameters in the url
 * @param {Object} options.selector         Instance of @wordpress/select response
 * @param {Object} options.select           (depreciated) Instance of @wordpress/select
 * @param {Object} options.tableQuery       Query parameters specific for that endpoint
 * @param {string} options.defaultDateRange User specified default date range.
 * @return {Object} Object    Table data response
 */
export declare function getReportTableData<T extends ReportItemsEndpoint>(options: Omit<QueryOptions, 'endpoint'> & {
    endpoint: ReportItemsEndpoint;
}): {
    isRequesting: boolean;
    query: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        match: string;
        orderby: string;
        order: string;
        after: string | undefined;
        before: string | undefined;
        page: string;
        per_page: string | number;
    } | {
        orderby: string;
        order: string;
        after: string | undefined;
        before: string | undefined;
        page: string;
        per_page: string | number;
    };
    isError: boolean;
    items: {
        data: never[];
        totalResults: number;
    };
} | {
    items: import("./types").ReportItemObjectInfer<T>;
    query: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        match: string;
        orderby: string;
        order: string;
        after: string | undefined;
        before: string | undefined;
        page: string;
        per_page: string | number;
    } | {
        orderby: string;
        order: string;
        after: string | undefined;
        before: string | undefined;
        page: string;
        per_page: string | number;
    };
    isRequesting: boolean;
    isError: boolean;
};
export {};
//# sourceMappingURL=utils.d.ts.map