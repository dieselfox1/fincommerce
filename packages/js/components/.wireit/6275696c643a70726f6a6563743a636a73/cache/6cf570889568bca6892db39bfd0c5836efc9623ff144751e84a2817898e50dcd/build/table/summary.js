"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableSummaryPlaceholder = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * A component to display summarized table data - the list of data passed in on a single line.
 */
const TableSummary = ({ data }) => {
    return ((0, element_1.createElement)("ul", { className: "fincommerce-table__summary", role: "complementary" }, data.map(({ label, value }, i) => ((0, element_1.createElement)("li", { className: "fincommerce-table__summary-item", key: i },
        (0, element_1.createElement)("span", { className: "fincommerce-table__summary-value" }, value),
        (0, element_1.createElement)("span", { className: "fincommerce-table__summary-label" }, label))))));
};
exports.default = TableSummary;
/**
 * A component to display a placeholder box for `TableSummary`. There is no prop for this component.
 *
 * @return {Object} -
 */
const TableSummaryPlaceholder = () => {
    return ((0, element_1.createElement)("ul", { className: "fincommerce-table__summary is-loading", role: "complementary" },
        (0, element_1.createElement)("li", { className: "fincommerce-table__summary-item" },
            (0, element_1.createElement)("span", { className: "is-placeholder" }))));
};
exports.TableSummaryPlaceholder = TableSummaryPlaceholder;
