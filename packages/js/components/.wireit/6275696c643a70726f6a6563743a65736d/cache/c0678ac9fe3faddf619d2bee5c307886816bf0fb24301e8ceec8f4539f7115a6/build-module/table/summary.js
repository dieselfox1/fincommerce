/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * A component to display summarized table data - the list of data passed in on a single line.
 */
const TableSummary = ({ data }) => {
    return (createElement("ul", { className: "fincommerce-table__summary", role: "complementary" }, data.map(({ label, value }, i) => (createElement("li", { className: "fincommerce-table__summary-item", key: i },
        createElement("span", { className: "fincommerce-table__summary-value" }, value),
        createElement("span", { className: "fincommerce-table__summary-label" }, label))))));
};
export default TableSummary;
/**
 * A component to display a placeholder box for `TableSummary`. There is no prop for this component.
 *
 * @return {Object} -
 */
export const TableSummaryPlaceholder = () => {
    return (createElement("ul", { className: "fincommerce-table__summary is-loading", role: "complementary" },
        createElement("li", { className: "fincommerce-table__summary-item" },
            createElement("span", { className: "is-placeholder" }))));
};
