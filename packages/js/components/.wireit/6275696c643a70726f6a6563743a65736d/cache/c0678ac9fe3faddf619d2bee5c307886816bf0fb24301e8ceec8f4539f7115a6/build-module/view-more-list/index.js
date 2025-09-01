/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Tag from '../tag';
/**
 * This component displays a 'X more' button that displays a list of items on a popover when clicked.
 *
 * @param {Object} props
 * @param {Array}  props.items
 * @return {Object} -
 */
const ViewMoreList = ({ items = [] }) => {
    return (createElement(Tag, { className: "fincommerce-view-more-list", label: sprintf(
        /* translators: %d: number of items more to view */
        __('+%d more', 'fincommerce'), items.length - 1), popoverContents: createElement("ul", { className: "fincommerce-view-more-list__popover" }, items.map((item, i) => (createElement("li", { key: i, className: "fincommerce-view-more-list__popover__item" }, item)))) }));
};
ViewMoreList.propTypes = {
    /**
     * Items to list in the popover
     */
    items: PropTypes.arrayOf(PropTypes.node),
};
export default ViewMoreList;
