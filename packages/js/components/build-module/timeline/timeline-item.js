/**
 * External dependencies
 */
import clsx from 'clsx';
import { format } from '@wordpress/date';
import PropTypes from 'prop-types';
import { createElement } from '@wordpress/element';
const TimelineItem = ({ item = {}, className = '', clockFormat }) => {
    const itemClassName = clsx('fincommerce-timeline-item', className);
    const itemTimeString = format(clockFormat, item.date);
    return (createElement("li", { className: itemClassName },
        createElement("div", { className: 'fincommerce-timeline-item__top-border' }),
        createElement("div", { className: 'fincommerce-timeline-item__title' },
            createElement("div", { className: 'fincommerce-timeline-item__headline' },
                item.icon,
                createElement("span", null, item.headline)),
            createElement("span", { className: 'fincommerce-timeline-item__timestamp' }, item.hideTimestamp || false ? null : itemTimeString)),
        createElement("div", { className: 'fincommerce-timeline-item__body' }, (item.body || []).map((bodyItem, index) => (createElement("span", { key: `timeline-item-body-${index}` }, bodyItem))))));
};
TimelineItem.propTypes = {
    /**
     * Additional CSS classes.
     */
    className: PropTypes.string,
    /**
     * An array of list items.
     */
    item: PropTypes.shape({
        /**
         * Date for the timeline item.
         */
        date: PropTypes.instanceOf(Date).isRequired,
        /**
         * Icon for the Timeline item.
         */
        icon: PropTypes.element.isRequired,
        /**
         * Headline displayed for the list item.
         */
        headline: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
            .isRequired,
        /**
         * Body displayed for the list item.
         */
        body: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.string])),
        /**
         * Allows users to toggle the timestamp on or off.
         */
        hideTimestamp: PropTypes.bool,
        /**
         * The PHP clock format string used to format times, see php.net/date.
         */
        clockFormat: PropTypes.string,
    }),
};
export default TimelineItem;
