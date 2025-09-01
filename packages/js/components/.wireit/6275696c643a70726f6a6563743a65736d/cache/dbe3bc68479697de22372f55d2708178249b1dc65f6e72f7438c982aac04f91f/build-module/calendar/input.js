/**
 * External dependencies
 */
import { Popover } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { Icon, calendar } from '@wordpress/icons';
import clsx from 'clsx';
import { uniqueId, noop } from 'lodash';
import PropTypes from 'prop-types';
const DateInput = ({ disabled = false, value, onChange, dateFormat, label, describedBy, error, onFocus = () => { }, onBlur = () => { }, onKeyDown = noop, errorPosition = 'bottom center', }) => {
    const classes = clsx('fincommerce-calendar__input', {
        'is-empty': value.length === 0,
        'is-error': error,
    });
    const id = uniqueId('_woo-dates-input');
    return (createElement("div", { className: classes },
        createElement("input", { type: "text", className: "fincommerce-calendar__input-text", value: value, onChange: onChange, "aria-label": label, id: id, "aria-describedby": `${id}-message`, placeholder: dateFormat.toLowerCase(), onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, disabled: disabled }),
        error && (createElement(Popover, { className: "fincommerce-calendar__input-error", focusOnMount: false, position: errorPosition }, error)),
        createElement(Icon, { icon: calendar, className: "calendar-icon" }),
        createElement("p", { className: "screen-reader-text", id: `${id}-message` }, error || describedBy)));
};
DateInput.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    dateFormat: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    describedBy: PropTypes.string.isRequired,
    error: PropTypes.string,
    errorPosition: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
};
export default DateInput;
