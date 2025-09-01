"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
require("core-js/features/object/assign");
require("core-js/features/array/from");
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const prop_types_1 = __importDefault(require("prop-types"));
const date_1 = require("@fincommerce/date");
/**
 * Internal dependencies
 */
const input_1 = __importDefault(require("./input"));
const section_1 = require("../section");
class DatePicker extends element_1.Component {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    handleFocus(isOpen, onToggle) {
        if (!isOpen) {
            onToggle();
        }
    }
    handleBlur(isOpen, onToggle, event) {
        if (!isOpen) {
            return;
        }
        const relatedTargetParent = event.relatedTarget?.closest('.components-dropdown');
        const currentTargetParent = event.currentTarget?.closest('.components-dropdown');
        if (!relatedTargetParent ||
            relatedTargetParent !== currentTargetParent) {
            onToggle();
        }
    }
    onDateChange(onToggle, dateString) {
        const { onUpdate, dateFormat } = this.props;
        const date = (0, moment_1.default)(dateString);
        onUpdate({
            date,
            text: dateString ? date.format(dateFormat) : '',
            error: null,
        });
        onToggle();
    }
    onInputChange(event) {
        const value = event.target.value;
        const { dateFormat } = this.props;
        const date = (0, date_1.toMoment)(dateFormat, value);
        const error = date ? null : date_1.dateValidationMessages.invalid;
        this.props.onUpdate({
            date,
            text: value,
            error: value.length > 0 ? error : null,
        });
    }
    render() {
        const { date, disabled, text, dateFormat, error, isInvalidDate, popoverProps = { inline: true }, } = this.props;
        if (!popoverProps.placement) {
            popoverProps.placement = 'bottom';
        }
        return ((0, element_1.createElement)(components_1.Dropdown, { focusOnMount: false, popoverProps: popoverProps, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(input_1.default, { disabled: disabled, value: text, onChange: this.onInputChange, onBlur: (0, lodash_1.partial)(this.handleBlur, isOpen, onToggle), dateFormat: dateFormat, label: (0, i18n_1.__)('Choose a date', 'fincommerce'), error: error, describedBy: (0, i18n_1.sprintf)(
                /* translators: %s: date format specification */
                (0, i18n_1.__)('Date input describing a selected date in format %s', 'fincommerce'), dateFormat), onFocus: (0, lodash_1.partial)(this.handleFocus, isOpen, onToggle), "aria-expanded": isOpen, focusOnMount: false, errorPosition: "top center" })), renderContent: ({ onToggle }) => ((0, element_1.createElement)(section_1.Section, { component: false },
                (0, element_1.createElement)(section_1.H, { className: "fincommerce-calendar__date-picker-title" }, (0, i18n_1.__)('select a date', 'fincommerce')),
                (0, element_1.createElement)("div", { className: "fincommerce-calendar__react-dates is-core-datepicker" },
                    (0, element_1.createElement)(components_1.DatePicker, { currentDate: date instanceof moment_1.default
                            ? date.toDate()
                            : date, onChange: (0, lodash_1.partial)(this.onDateChange, onToggle), 
                        // onMonthPreviewed is required to prevent a React error from happening.
                        onMonthPreviewed: lodash_1.noop, isInvalidDate: isInvalidDate })))) }));
    }
}
DatePicker.propTypes = {
    /**
     * A moment date object representing the selected date. `null` for no selection.
     */
    date: prop_types_1.default.object,
    /**
     * Whether the input is disabled.
     */
    disabled: prop_types_1.default.bool,
    /**
     * The date in human-readable format. Displayed in the text input.
     */
    text: prop_types_1.default.string,
    /**
     * A string error message, shown to the user.
     */
    error: prop_types_1.default.string,
    /**
     * A function called upon selection of a date or input change.
     */
    onUpdate: prop_types_1.default.func.isRequired,
    /**
     * The date format in moment.js-style tokens.
     */
    dateFormat: prop_types_1.default.string.isRequired,
    /**
     * A function to determine if a day on the calendar is not valid
     */
    isInvalidDate: prop_types_1.default.func,
};
exports.default = DatePicker;
