"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const table_1 = __importDefault(require("./table"));
/**
 * `TablePlaceholder` behaves like `Table` but displays placeholder boxes instead of data. This can be used while loading.
 */
const TablePlaceholder = ({ query, caption, headers, numberOfRows = 5, ...props }) => {
    const rows = (0, lodash_1.range)(numberOfRows).map(() => headers.map(() => ({
        display: (0, element_1.createElement)("span", { className: "is-placeholder" }),
    })));
    const tableProps = { query, caption, headers, numberOfRows, ...props };
    return ((0, element_1.createElement)(table_1.default, { ariaHidden: true, className: "is-loading", rows: rows, ...tableProps }));
};
exports.default = TablePlaceholder;
