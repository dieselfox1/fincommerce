"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
const components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
const ellipsis_menu_1 = __importDefault(require("../ellipsis-menu"));
const menu_item_1 = __importDefault(require("../ellipsis-menu/menu-item"));
const menu_title_1 = __importDefault(require("../ellipsis-menu/menu-title"));
const pagination_1 = require("../pagination");
const table_1 = __importDefault(require("./table"));
const placeholder_1 = __importDefault(require("./placeholder"));
const summary_1 = __importStar(require("./summary"));
const defaultOnQueryChange = () => () => { };
const defaultOnColumnsChange = () => { };
/**
 * This is an accessible, sortable, and scrollable table for displaying tabular data (like revenue and other analytics data).
 * It accepts `headers` for column headers, and `rows` for the table content.
 * `rowHeader` can be used to define the index of the row header (or false if no header).
 *
 * `TableCard` serves as Card wrapper & contains a card header, `<Table />`, `<TableSummary />`, and `<Pagination />`.
 * This includes filtering and comparison functionality for report pages.
 */
const TableCard = ({ actions, className, hasSearch, tablePreface, headers = [], ids, isLoading = false, onQueryChange = defaultOnQueryChange, onColumnsChange = defaultOnColumnsChange, onSort, query = {}, rowHeader = 0, rows = [], rowsPerPage, showMenu = true, summary, title, totalRows, rowKey, emptyMessage = undefined, ...props }) => {
    // eslint-disable-next-line no-console
    const getShowCols = (_headers = []) => {
        return _headers
            .map(({ key, visible }) => {
            if (typeof visible === 'undefined' || visible) {
                return key;
            }
            return false;
        })
            .filter(Boolean);
    };
    const [showCols, setShowCols] = (0, element_1.useState)(getShowCols(headers));
    const onColumnToggle = (key) => {
        return () => {
            const hasKey = showCols.includes(key);
            if (hasKey) {
                // Handle hiding a sorted column
                if (query.orderby === key) {
                    const defaultSort = (0, lodash_1.find)(headers, {
                        defaultSort: true,
                    }) ||
                        (0, lodash_1.first)(headers) || { key: undefined };
                    onQueryChange('sort')(defaultSort.key, 'desc');
                }
                const newShowCols = (0, lodash_1.without)(showCols, key);
                onColumnsChange(newShowCols, key);
                setShowCols(newShowCols);
            }
            else {
                const newShowCols = [...showCols, key];
                onColumnsChange(newShowCols, key);
                setShowCols(newShowCols);
            }
        };
    };
    const onPageChange = (newPage, direction) => {
        if (props.onPageChange) {
            props.onPageChange(newPage, direction);
        }
        if (onQueryChange) {
            onQueryChange('paged')(newPage.toString(), direction);
        }
    };
    const allHeaders = headers;
    const visibleHeaders = headers.filter(({ key }) => showCols.includes(key));
    const visibleRows = rows.map((row) => {
        return headers
            .map(({ key }, i) => {
            return showCols.includes(key) && row[i];
        })
            .filter(Boolean);
    });
    const classes = (0, clsx_1.default)('fincommerce-table', className, {
        'has-actions': !!actions,
        'has-menu': showMenu,
        'has-search': hasSearch,
    });
    return ((0, element_1.createElement)(components_1.Card, { className: classes },
        (0, element_1.createElement)(components_1.CardHeader, null,
            (0, element_1.createElement)(components_1.__experimentalText, { size: 16, weight: 600, as: "h2", color: "#23282d" }, title),
            (0, element_1.createElement)("div", { className: "fincommerce-table__actions" }, actions),
            showMenu && ((0, element_1.createElement)(ellipsis_menu_1.default, { label: (0, i18n_1.__)('Choose which values to display', 'fincommerce'), placement: "bottom-end", renderContent: () => ((0, element_1.createElement)(element_1.Fragment, null,
                    (0, element_1.createElement)(menu_title_1.default, null, (0, i18n_1.__)('Columns:', 'fincommerce')),
                    allHeaders.map(({ key, label, required }) => {
                        if (required) {
                            return null;
                        }
                        return ((0, element_1.createElement)(menu_item_1.default, { checked: showCols.includes(key), isCheckbox: true, isClickable: true, key: key, onInvoke: key !== undefined
                                ? onColumnToggle(key)
                                : undefined }, label));
                    }))) }))),
        (0, element_1.createElement)(components_1.CardBody, { size: null },
            tablePreface && ((0, element_1.createElement)("div", { className: "fincommerce-table__preface" }, tablePreface)),
            isLoading ? ((0, element_1.createElement)(element_1.Fragment, null,
                (0, element_1.createElement)("span", { className: "screen-reader-text" }, (0, i18n_1.__)('Your requested data is loading', 'fincommerce')),
                (0, element_1.createElement)(placeholder_1.default, { numberOfRows: rowsPerPage, headers: visibleHeaders, rowHeader: rowHeader, caption: title, query: query }))) : ((0, element_1.createElement)(table_1.default, { rows: visibleRows, headers: visibleHeaders, rowHeader: rowHeader, caption: title, query: query, onSort: onSort ||
                    onQueryChange('sort'), rowKey: rowKey, emptyMessage: emptyMessage }))),
        (0, element_1.createElement)(components_1.CardFooter, { justify: "center" }, isLoading ? ((0, element_1.createElement)(summary_1.TableSummaryPlaceholder, null)) : ((0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(pagination_1.Pagination, { key: parseInt(query.paged, 10) || 1, page: parseInt(query.paged, 10) || 1, perPage: rowsPerPage, total: totalRows, onPageChange: onPageChange, onPerPageChange: (perPage) => onQueryChange('per_page')(perPage.toString()) }),
            summary && (0, element_1.createElement)(summary_1.default, { data: summary }))))));
};
exports.default = TableCard;
