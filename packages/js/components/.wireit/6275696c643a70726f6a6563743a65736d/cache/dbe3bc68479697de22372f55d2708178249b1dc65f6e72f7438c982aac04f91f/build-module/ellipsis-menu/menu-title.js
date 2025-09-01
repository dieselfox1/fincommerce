/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * `MenuTitle` is another valid Menu child, but this does not have any accessibility attributes associated
 * (so this should not be used in place of the `EllipsisMenu` prop `label`).
 */
const MenuTitle = ({ children, }) => {
    return createElement("div", { className: "fincommerce-ellipsis-menu__title" }, children);
};
export default MenuTitle;
