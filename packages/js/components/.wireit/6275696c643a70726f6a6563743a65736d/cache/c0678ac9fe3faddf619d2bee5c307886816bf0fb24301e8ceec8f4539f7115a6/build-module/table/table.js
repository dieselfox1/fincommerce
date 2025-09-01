/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createElement, useRef, Fragment, useState, useEffect, } from '@wordpress/element';
import clsx from 'clsx';
import { Button } from '@wordpress/components';
import { find, get, noop } from 'lodash';
import { withInstanceId } from '@wordpress/compose';
import { Icon, chevronUp, chevronDown } from '@wordpress/icons';
import deprecated from '@wordpress/deprecated';
const ASC = 'asc';
const DESC = 'desc';
const getDisplay = (cell) => cell.display || null;
/**
 * A table component, without the Card wrapper. This is a basic table display, sortable, but no default filtering.
 *
 * Row data should be passed to the component as a list of arrays, where each array is a row in the table.
 * Headers are passed in separately as an array of objects with column-related properties. For example,
 * this data would render the following table.
 *
 * ```js
 * const headers = [ { label: 'Month' }, { label: 'Orders' }, { label: 'Revenue' } ];
 * const rows = [
 * 	[
 * 		{ display: 'January', value: 1 },
 * 		{ display: 10, value: 10 },
 * 		{ display: '$530.00', value: 530 },
 * 	],
 * 	[
 * 		{ display: 'February', value: 2 },
 * 		{ display: 13, value: 13 },
 * 		{ display: '$675.00', value: 675 },
 * 	],
 * 	[
 * 		{ display: 'March', value: 3 },
 * 		{ display: 9, value: 9 },
 * 		{ display: '$460.00', value: 460 },
 * 	],
 * ]
 * ```
 *
 * |   Month  | Orders | Revenue |
 * | ---------|--------|---------|
 * | January  |     10 | $530.00 |
 * | February |     13 | $675.00 |
 * | March    |      9 | $460.00 |
 */
const Table = ({ instanceId, headers = [], rows = [], ariaHidden, caption, className, onSort = (f) => f, query = {}, rowHeader, rowKey, emptyMessage, ...props }) => {
    const { classNames } = props;
    const [tabIndex, setTabIndex] = useState(undefined);
    const [isScrollableRight, setIsScrollableRight] = useState(false);
    const [isScrollableLeft, setIsScrollableLeft] = useState(false);
    const container = useRef(null);
    if (classNames) {
        deprecated(`Table component's classNames prop`, {
            since: '11.1.0',
            version: '12.0.0',
            alternative: 'className',
            plugin: '@fincommerce/components',
        });
    }
    const classes = clsx('fincommerce-table__table', classNames, className, {
        'is-scrollable-right': isScrollableRight,
        'is-scrollable-left': isScrollableLeft,
    });
    const sortBy = (key) => {
        return () => {
            const currentKey = query.orderby ||
                get(find(headers, { defaultSort: true }), 'key', false);
            const currentDir = query.order ||
                get(find(headers, { key: currentKey }), 'defaultOrder', DESC);
            let dir = DESC;
            if (key === currentKey) {
                dir = DESC === currentDir ? ASC : DESC;
            }
            onSort(key, dir);
        };
    };
    const getRowKey = (row, index) => {
        if (rowKey && typeof rowKey === 'function') {
            return rowKey(row, index);
        }
        return index;
    };
    const updateTableShadow = () => {
        const table = container.current;
        if (!table) {
            return;
        }
        // Get current dimensions
        const scrollWidth = table.scrollWidth;
        const offsetWidth = table.offsetWidth;
        const scrollLeft = table.scrollLeft;
        // Check if the table is actually scrollable
        const isTableScrollable = scrollWidth > offsetWidth;
        // If table is not scrollable, remove all scroll indicators
        if (!isTableScrollable) {
            setIsScrollableRight(false);
            setIsScrollableLeft(false);
            // Reset scroll position when table is no longer scrollable
            if (scrollLeft !== 0) {
                table.scrollLeft = 0;
            }
            return;
        }
        // Calculate scroll states
        const scrolledToEnd = scrollWidth - scrollLeft <= offsetWidth;
        const scrolledToStart = scrollLeft === 0;
        // Update scroll indicators based on current state
        setIsScrollableRight(!scrolledToEnd);
        setIsScrollableLeft(!scrolledToStart);
    };
    const sortedBy = query.orderby ||
        get(find(headers, { defaultSort: true }), 'key', false);
    const sortDir = query.order ||
        get(find(headers, { key: sortedBy }), 'defaultOrder', DESC);
    const hasData = !!rows.length;
    useEffect(() => {
        const scrollWidth = container.current?.scrollWidth;
        const clientWidth = container.current?.clientWidth;
        if (scrollWidth === undefined || clientWidth === undefined) {
            return;
        }
        const scrollable = scrollWidth > clientWidth;
        setTabIndex(scrollable ? 0 : undefined);
        updateTableShadow();
        const handleResize = () => {
            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                updateTableShadow();
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(updateTableShadow, [headers, rows, emptyMessage]);
    return (createElement("div", { className: classes, ref: container, tabIndex: tabIndex, "aria-hidden": ariaHidden, "aria-labelledby": `caption-${instanceId}`, role: "group", onScroll: updateTableShadow },
        createElement("table", null,
            createElement("caption", { id: `caption-${instanceId}`, className: "fincommerce-table__caption screen-reader-text" },
                caption,
                tabIndex === 0 && (createElement("small", null, __('(scroll to see more)', 'fincommerce')))),
            createElement("tbody", null,
                createElement("tr", null, headers.map((header, i) => {
                    const { cellClassName, isLeftAligned, isSortable, isNumeric, key, label, screenReaderLabel, } = header;
                    const labelId = `header-${instanceId}-${i}`;
                    const thProps = {
                        className: clsx('fincommerce-table__header', cellClassName, {
                            'is-left-aligned': isLeftAligned || !isNumeric,
                            'is-sortable': isSortable,
                            'is-sorted': sortedBy === key,
                            'is-numeric': isNumeric,
                        }),
                    };
                    if (isSortable) {
                        thProps['aria-sort'] = 'none';
                        if (sortedBy === key) {
                            thProps['aria-sort'] =
                                sortDir === ASC
                                    ? 'ascending'
                                    : 'descending';
                        }
                    }
                    // We only sort by ascending if the col is already sorted descending
                    const iconLabel = sortedBy === key && sortDir !== ASC
                        ? sprintf(
                        /* translators: %s: column label */
                        __('Sort by %s in ascending order', 'fincommerce'), screenReaderLabel || label)
                        : sprintf(
                        /* translators: %s: column label */
                        __('Sort by %s in descending order', 'fincommerce'), screenReaderLabel || label);
                    const textLabel = (createElement(Fragment, null,
                        createElement("span", { "aria-hidden": Boolean(screenReaderLabel) }, label),
                        screenReaderLabel && (createElement("span", { className: "screen-reader-text" }, screenReaderLabel))));
                    return (createElement("th", { role: "columnheader", scope: "col", key: header.key || i, ...thProps }, isSortable ? (createElement(Fragment, null,
                        createElement(Button, { "aria-describedby": labelId, onClick: hasData
                                ? sortBy(key)
                                : noop },
                            sortedBy === key &&
                                sortDir === ASC ? (createElement(Icon, { icon: chevronUp })) : (createElement(Icon, { icon: chevronDown })),
                            textLabel),
                        createElement("span", { className: "screen-reader-text", id: labelId }, iconLabel))) : (textLabel)));
                })),
                hasData ? (rows.map((row, i) => (createElement("tr", { key: getRowKey(row, i) }, row.map((cell, j) => {
                    const { cellClassName, isLeftAligned, isNumeric, } = headers[j];
                    const isHeader = rowHeader === j;
                    const Cell = isHeader ? 'th' : 'td';
                    const cellClasses = clsx('fincommerce-table__item', cellClassName, {
                        'is-left-aligned': isLeftAligned || !isNumeric,
                        'is-numeric': isNumeric,
                        'is-sorted': sortedBy === headers[j].key,
                    });
                    const cellKey = getRowKey(row, i).toString() + j;
                    return (createElement(Cell, { scope: isHeader ? 'row' : undefined, key: cellKey, className: cellClasses }, getDisplay(cell)));
                }))))) : (createElement("tr", null,
                    createElement("td", { className: "fincommerce-table__empty-item", colSpan: headers.length }, emptyMessage ??
                        __('No data to display', 'fincommerce'))))))));
};
export default withInstanceId(Table);
