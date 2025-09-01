/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { createElement, Fragment, useState } from '@wordpress/element';
import { find, first, without } from 'lodash';
import { Card, CardBody, CardFooter, CardHeader, __experimentalText as Text, } from '@wordpress/components';
/**
 * Internal dependencies
 */
import EllipsisMenu from '../ellipsis-menu';
import MenuItem from '../ellipsis-menu/menu-item';
import MenuTitle from '../ellipsis-menu/menu-title';
import { Pagination } from '../pagination';
import Table from './table';
import TablePlaceholder from './placeholder';
import TableSummary, { TableSummaryPlaceholder } from './summary';
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
    const [showCols, setShowCols] = useState(getShowCols(headers));
    const onColumnToggle = (key) => {
        return () => {
            const hasKey = showCols.includes(key);
            if (hasKey) {
                // Handle hiding a sorted column
                if (query.orderby === key) {
                    const defaultSort = find(headers, {
                        defaultSort: true,
                    }) ||
                        first(headers) || { key: undefined };
                    onQueryChange('sort')(defaultSort.key, 'desc');
                }
                const newShowCols = without(showCols, key);
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
    const classes = clsx('fincommerce-table', className, {
        'has-actions': !!actions,
        'has-menu': showMenu,
        'has-search': hasSearch,
    });
    return (createElement(Card, { className: classes },
        createElement(CardHeader, null,
            createElement(Text, { size: 16, weight: 600, as: "h2", color: "#23282d" }, title),
            createElement("div", { className: "fincommerce-table__actions" }, actions),
            showMenu && (createElement(EllipsisMenu, { label: __('Choose which values to display', 'fincommerce'), placement: "bottom-end", renderContent: () => (createElement(Fragment, null,
                    createElement(MenuTitle, null, __('Columns:', 'fincommerce')),
                    allHeaders.map(({ key, label, required }) => {
                        if (required) {
                            return null;
                        }
                        return (createElement(MenuItem, { checked: showCols.includes(key), isCheckbox: true, isClickable: true, key: key, onInvoke: key !== undefined
                                ? onColumnToggle(key)
                                : undefined }, label));
                    }))) }))),
        createElement(CardBody, { size: null },
            tablePreface && (createElement("div", { className: "fincommerce-table__preface" }, tablePreface)),
            isLoading ? (createElement(Fragment, null,
                createElement("span", { className: "screen-reader-text" }, __('Your requested data is loading', 'fincommerce')),
                createElement(TablePlaceholder, { numberOfRows: rowsPerPage, headers: visibleHeaders, rowHeader: rowHeader, caption: title, query: query }))) : (createElement(Table, { rows: visibleRows, headers: visibleHeaders, rowHeader: rowHeader, caption: title, query: query, onSort: onSort ||
                    onQueryChange('sort'), rowKey: rowKey, emptyMessage: emptyMessage }))),
        createElement(CardFooter, { justify: "center" }, isLoading ? (createElement(TableSummaryPlaceholder, null)) : (createElement(Fragment, null,
            createElement(Pagination, { key: parseInt(query.paged, 10) || 1, page: parseInt(query.paged, 10) || 1, perPage: rowsPerPage, total: totalRows, onPageChange: onPageChange, onPerPageChange: (perPage) => onQueryChange('per_page')(perPage.toString()) }),
            summary && createElement(TableSummary, { data: summary }))))));
};
export default TableCard;
