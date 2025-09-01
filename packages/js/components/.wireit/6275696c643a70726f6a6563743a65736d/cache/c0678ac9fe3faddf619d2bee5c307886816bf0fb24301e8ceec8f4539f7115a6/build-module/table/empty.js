/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * `EmptyTable` displays a blank space with an optional message passed as a children node
 * with the purpose of replacing a table with no rows.
 * It mimics the same height a table would have according to the `numberOfRows` prop.
 */
const EmptyTable = ({ children, numberOfRows = 5 }) => {
    return (createElement("div", { className: "fincommerce-table is-empty", style: { '--number-of-rows': numberOfRows } }, children));
};
export default EmptyTable;
