"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const lodash_1 = require("lodash");
const compose_1 = require("@wordpress/compose");
const icons_1 = require("@wordpress/icons");
const deprecated_1 = __importDefault(require("@wordpress/deprecated"));
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
    const [tabIndex, setTabIndex] = (0, element_1.useState)(undefined);
    const [isScrollableRight, setIsScrollableRight] = (0, element_1.useState)(false);
    const [isScrollableLeft, setIsScrollableLeft] = (0, element_1.useState)(false);
    const container = (0, element_1.useRef)(null);
    if (classNames) {
        (0, deprecated_1.default)(`Table component's classNames prop`, {
            since: '11.1.0',
            version: '12.0.0',
            alternative: 'className',
            plugin: '@fincommerce/components',
        });
    }
    const classes = (0, clsx_1.default)('fincommerce-table__table', classNames, className, {
        'is-scrollable-right': isScrollableRight,
        'is-scrollable-left': isScrollableLeft,
    });
    const sortBy = (key) => {
        return () => {
            const currentKey = query.orderby ||
                (0, lodash_1.get)((0, lodash_1.find)(headers, { defaultSort: true }), 'key', false);
            const currentDir = query.order ||
                (0, lodash_1.get)((0, lodash_1.find)(headers, { key: currentKey }), 'defaultOrder', DESC);
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
        (0, lodash_1.get)((0, lodash_1.find)(headers, { defaultSort: true }), 'key', false);
    const sortDir = query.order ||
        (0, lodash_1.get)((0, lodash_1.find)(headers, { key: sortedBy }), 'defaultOrder', DESC);
    const hasData = !!rows.length;
    (0, element_1.useEffect)(() => {
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
    (0, element_1.useEffect)(updateTableShadow, [headers, rows, emptyMessage]);
    return ((0, element_1.createElement)("div", { className: classes, ref: container, tabIndex: tabIndex, "aria-hidden": ariaHidden, "aria-labelledby": `caption-${instanceId}`, role: "group", onScroll: updateTableShadow },
        (0, element_1.createElement)("table", null,
            (0, element_1.createElement)("caption", { id: `caption-${instanceId}`, className: "fincommerce-table__caption screen-reader-text" },
                caption,
                tabIndex === 0 && ((0, element_1.createElement)("small", null, (0, i18n_1.__)('(scroll to see more)', 'fincommerce')))),
            (0, element_1.createElement)("tbody", null,
                (0, element_1.createElement)("tr", null, headers.map((header, i) => {
                    const { cellClassName, isLeftAligned, isSortable, isNumeric, key, label, screenReaderLabel, } = header;
                    const labelId = `header-${instanceId}-${i}`;
                    const thProps = {
                        className: (0, clsx_1.default)('fincommerce-table__header', cellClassName, {
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
                        ? (0, i18n_1.sprintf)(
                        /* translators: %s: column label */
                        (0, i18n_1.__)('Sort by %s in ascending order', 'fincommerce'), screenReaderLabel || label)
                        : (0, i18n_1.sprintf)(
                        /* translators: %s: column label */
                        (0, i18n_1.__)('Sort by %s in descending order', 'fincommerce'), screenReaderLabel || label);
                    const textLabel = ((0, element_1.createElement)(element_1.Fragment, null,
                        (0, element_1.createElement)("span", { "aria-hidden": Boolean(screenReaderLabel) }, label),
                        screenReaderLabel && ((0, element_1.createElement)("span", { className: "screen-reader-text" }, screenReaderLabel))));
                    return ((0, element_1.createElement)("th", { role: "columnheader", scope: "col", key: header.key || i, ...thProps }, isSortable ? ((0, element_1.createElement)(element_1.Fragment, null,
                        (0, element_1.createElement)(components_1.Button, { "aria-describedby": labelId, onClick: hasData
                                ? sortBy(key)
                                : lodash_1.noop },
                            sortedBy === key &&
                                sortDir === ASC ? ((0, element_1.createElement)(icons_1.Icon, { icon: icons_1.chevronUp })) : ((0, element_1.createElement)(icons_1.Icon, { icon: icons_1.chevronDown })),
                            textLabel),
                        (0, element_1.createElement)("span", { className: "screen-reader-text", id: labelId }, iconLabel))) : (textLabel)));
                })),
                hasData ? (rows.map((row, i) => ((0, element_1.createElement)("tr", { key: getRowKey(row, i) }, row.map((cell, j) => {
                    const { cellClassName, isLeftAligned, isNumeric, } = headers[j];
                    const isHeader = rowHeader === j;
                    const Cell = isHeader ? 'th' : 'td';
                    const cellClasses = (0, clsx_1.default)('fincommerce-table__item', cellClassName, {
                        'is-left-aligned': isLeftAligned || !isNumeric,
                        'is-numeric': isNumeric,
                        'is-sorted': sortedBy === headers[j].key,
                    });
                    const cellKey = getRowKey(row, i).toString() + j;
                    return ((0, element_1.createElement)(Cell, { scope: isHeader ? 'row' : undefined, key: cellKey, className: cellClasses }, getDisplay(cell)));
                }))))) : ((0, element_1.createElement)("tr", null,
                    (0, element_1.createElement)("td", { className: "fincommerce-table__empty-item", colSpan: headers.length }, emptyMessage ??
                        (0, i18n_1.__)('No data to display', 'fincommerce'))))))));
};
exports.default = (0, compose_1.withInstanceId)(Table);
