"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimePickerControl = exports.default24HourDateTimeFormat = exports.default12HourDateTimeFormat = exports.defaultDateFormat = void 0;
const date_1 = require("@wordpress/date");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const moment_1 = __importDefault(require("moment"));
const clsx_1 = __importDefault(require("clsx"));
const i18n_1 = require("@wordpress/i18n");
const compose_1 = require("@wordpress/compose");
const components_1 = require("@wordpress/components");
// PHP style formatting:
// https://wordpress.org/support/article/formatting-date-and-time/
exports.defaultDateFormat = 'm/d/Y';
exports.default12HourDateTimeFormat = 'm/d/Y h:i a';
exports.default24HourDateTimeFormat = 'm/d/Y H:i';
const MINUTE_IN_SECONDS = 60;
const HOUR_IN_MINUTES = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
/**
 * Map of PHP formats to Moment.js formats.
 *
 * Copied from @wordpress/date, since it's not exposed. If this is exposed upstream,
 * it should ideally be used from there.
 */
const formatMap = {
    // Day.
    d: 'DD',
    D: 'ddd',
    j: 'D',
    l: 'dddd',
    N: 'E',
    S(momentDate) {
        // Do - D.
        const num = momentDate.format('D');
        const withOrdinal = momentDate.format('Do');
        return withOrdinal.replace(num, '');
    },
    w: 'd',
    z(momentDate) {
        // DDD - 1.
        return (parseInt(momentDate.format('DDD'), 10) - 1).toString();
    },
    // Week.
    W: 'W',
    // Month.
    F: 'MMMM',
    m: 'MM',
    M: 'MMM',
    n: 'M',
    t(momentDate) {
        return momentDate.daysInMonth();
    },
    L(momentDate) {
        return momentDate.isLeapYear() ? '1' : '0';
    },
    o: 'GGGG',
    Y: 'YYYY',
    y: 'YY',
    // Time.
    a: 'a',
    A: 'A',
    B(momentDate) {
        const timezoned = (0, moment_1.default)(momentDate).utcOffset(60);
        const seconds = parseInt(timezoned.format('s'), 10), minutes = parseInt(timezoned.format('m'), 10), hours = parseInt(timezoned.format('H'), 10);
        return parseInt(((seconds +
            minutes * MINUTE_IN_SECONDS +
            hours * HOUR_IN_SECONDS) /
            86.4).toString(), 10);
    },
    g: 'h',
    G: 'H',
    h: 'hh',
    H: 'HH',
    i: 'mm',
    s: 'ss',
    u: 'SSSSSS',
    v: 'SSS',
    // Timezone.
    e: 'zz',
    I(momentDate) {
        return momentDate.isDST() ? '1' : '0';
    },
    O: 'ZZ',
    P: 'Z',
    T: 'z',
    Z(momentDate) {
        // Timezone offset in seconds.
        const offset = momentDate.format('Z');
        const sign = offset[0] === '-' ? -1 : 1;
        const parts = offset
            .substring(1)
            .split(':')
            .map((n) => parseInt(n, 10));
        return (sign *
            (parts[0] * HOUR_IN_MINUTES + parts[1]) *
            MINUTE_IN_SECONDS);
    },
    // Full date/time.
    c: 'YYYY-MM-DDTHH:mm:ssZ', // .toISOString.
    r(momentDate) {
        return momentDate
            .locale('en')
            .format('ddd, DD MMM YYYY HH:mm:ss ZZ');
    },
    U: 'X',
};
/**
 * A modified version of the `format` function from @wordpress/date.
 * This is needed to create a date object from the typed string and the date format,
 * that needs to be mapped from the PHP format to moment's format.
 */
const createMomentDate = (dateFormat, date) => {
    let i, char;
    const newFormat = [];
    for (i = 0; i < dateFormat.length; i++) {
        char = dateFormat[i];
        // Is this an escape?
        if (char === '\\') {
            // Add next character, then move on.
            i++;
            newFormat.push('[' + dateFormat[i] + ']');
            continue;
        }
        if (char in formatMap) {
            const formatter = formatMap[char];
            if (typeof formatter !== 'string') {
                // If the format is a function, call it.
                newFormat.push('[' + formatter((0, moment_1.default)(date)) + ']');
            }
            else {
                // Otherwise, add as a formatting string.
                newFormat.push(formatter);
            }
        }
        else {
            newFormat.push('[' + char + ']');
        }
    }
    // Join with [] between to separate characters, and replace
    // unneeded separators with static text.
    return (0, moment_1.default)(date, newFormat.join('[]'));
};
exports.DateTimePickerControl = (0, element_1.forwardRef)(function ForwardedDateTimePickerControl({ currentDate, isDateOnlyPicker = false, is12HourPicker = true, timeForDateOnly = 'start-of-day', dateTimeFormat, disabled = false, onChange, onBlur, label, placeholder, help, className = '', onChangeDebounceWait = 500, popoverProps = {}, ...props }, ref) {
    const id = (0, compose_1.useInstanceId)(exports.DateTimePickerControl, 'inspector-date-time-picker-control', props.id);
    const inputControl = (0, element_1.useRef)();
    const displayFormat = (0, element_1.useMemo)(() => {
        if (dateTimeFormat) {
            return dateTimeFormat;
        }
        if (isDateOnlyPicker) {
            return exports.defaultDateFormat;
        }
        if (is12HourPicker) {
            return exports.default12HourDateTimeFormat;
        }
        return exports.default24HourDateTimeFormat;
    }, [dateTimeFormat, isDateOnlyPicker, is12HourPicker]);
    function parseAsISODateTime(dateString, assumeLocalTime = false) {
        return assumeLocalTime
            ? (0, moment_1.default)(dateString, moment_1.default.ISO_8601, true).utc()
            : moment_1.default.utc(dateString, moment_1.default.ISO_8601, true);
    }
    function parseAsLocalDateTime(dateString) {
        // parse input date string as local time;
        // be lenient of user input and try to match any format Moment can
        return dateTimeFormat && dateString
            ? createMomentDate(dateTimeFormat, dateString)
            : (0, moment_1.default)(dateString);
    }
    const maybeForceTime = (0, element_1.useCallback)((momentDate) => {
        if (!isDateOnlyPicker || !momentDate.isValid())
            return momentDate;
        // We want to set to the start/end of the local time, so
        // we need to put our Moment instance into "local" mode
        const updatedMomentDate = momentDate.clone().local();
        if (timeForDateOnly === 'start-of-day') {
            updatedMomentDate.startOf('day');
        }
        else if (timeForDateOnly === 'end-of-day') {
            updatedMomentDate.endOf('day');
        }
        return updatedMomentDate;
    }, [isDateOnlyPicker, timeForDateOnly]);
    function hasFocusLeftInputAndDropdownContent(event) {
        return !event.relatedTarget?.closest('.components-dropdown__content');
    }
    const formatDateTimeForDisplay = (0, element_1.useCallback)((dateTime) => {
        return dateTime.isValid()
            ? (0, date_1.format)(displayFormat, dateTime.local())
            : dateTime.creationData().input?.toString() || '';
    }, [displayFormat]);
    function formatDateTimeAsISO(dateTime) {
        return dateTime.isValid()
            ? dateTime.utc().toISOString()
            : dateTime.creationData().input?.toString() || '';
    }
    const currentDateTime = parseAsISODateTime(currentDate);
    const [inputString, setInputString] = (0, element_1.useState)(currentDateTime.isValid()
        ? formatDateTimeForDisplay(maybeForceTime(currentDateTime))
        : '');
    const inputStringDateTime = (0, element_1.useMemo)(() => {
        return maybeForceTime(parseAsLocalDateTime(inputString));
    }, [inputString, maybeForceTime]);
    // We keep a ref to the onChange prop so that we can be sure we are
    // always using the more up-to-date value, even if it changes
    // it while a debounced onChange handler is in progress
    const onChangeRef = (0, element_1.useRef)();
    (0, element_1.useEffect)(() => {
        onChangeRef.current = onChange;
    }, [onChange]);
    const setInputStringAndMaybeCallOnChange = (0, element_1.useCallback)((newInputString, isUserTypedInput) => {
        // InputControl doesn't fire an onChange if what the user has typed
        // matches the current value of the input field. To get around this,
        // we pull the value directly out of the input field. This fixes
        // the issue where the user ends up typing the same value. Unless they
        // are typing extra slow. Without this workaround, we miss the last
        // character typed.
        const lastTypedValue = inputControl.current?.value ?? '';
        const newDateTime = maybeForceTime(isUserTypedInput
            ? parseAsLocalDateTime(lastTypedValue)
            : parseAsISODateTime(newInputString, true));
        const isDateTimeSame = newDateTime.isSame(inputStringDateTime);
        if (isUserTypedInput) {
            setInputString(lastTypedValue);
        }
        else if (!isDateTimeSame) {
            setInputString(formatDateTimeForDisplay(newDateTime));
        }
        if (typeof onChangeRef.current === 'function' &&
            !isDateTimeSame) {
            onChangeRef.current(newDateTime.isValid()
                ? formatDateTimeAsISO(newDateTime)
                : lastTypedValue, newDateTime.isValid());
        }
    }, [formatDateTimeForDisplay, inputStringDateTime, maybeForceTime]);
    const debouncedSetInputStringAndMaybeCallOnChange = (0, compose_1.useDebounce)(setInputStringAndMaybeCallOnChange, onChangeDebounceWait);
    function focusInputControl() {
        if (inputControl.current) {
            inputControl.current.focus();
        }
    }
    const getUserInputOrUpdatedCurrentDate = (0, element_1.useCallback)(() => {
        if (currentDate !== undefined) {
            const newDateTime = maybeForceTime(parseAsISODateTime(currentDate, false));
            if (!newDateTime.isValid()) {
                // keep the invalid string, so the user can correct it
                return currentDate ?? '';
            }
            if (!newDateTime.isSame(inputStringDateTime)) {
                return formatDateTimeForDisplay(newDateTime);
            }
            // the new currentDate is the same date as the inputString,
            // so keep exactly what the user typed in
            return inputString;
        }
        // the component is uncontrolled (not using currentDate),
        // so just return the input string
        return inputString;
    }, [
        currentDate,
        formatDateTimeForDisplay,
        inputString,
        maybeForceTime,
    ]);
    // We keep a ref to the onBlur prop so that we can be sure we are
    // always using the more up-to-date value, otherwise, we get in
    // any infinite loop when calling onBlur
    const onBlurRef = (0, element_1.useRef)();
    (0, element_1.useEffect)(() => {
        onBlurRef.current = onBlur;
    }, [onBlur]);
    const callOnBlurIfDropdownIsNotOpening = (0, element_1.useCallback)((willOpen) => {
        if (!willOpen &&
            typeof onBlurRef.current === 'function' &&
            inputControl.current) {
            // in case the component is blurred before a debounced
            // change has been processed, immediately set the input string
            // to the current value of the input field, so that
            // it won't be set back to the pre-change value
            setInputStringAndMaybeCallOnChange(inputControl.current.value, true);
            onBlurRef.current();
        }
    }, []);
    return ((0, element_1.createElement)(components_1.Dropdown, { className: (0, clsx_1.default)('fincommerce-date-time-picker-control', className), focusOnMount: false, onToggle: callOnBlurIfDropdownIsNotOpening, renderToggle: ({ isOpen, onClose, onToggle }) => ((0, element_1.createElement)(components_1.BaseControl, { id: id, label: label, help: help },
            (0, element_1.createElement)(components_1.__experimentalInputControl, { ...props, id: id, ref: (element) => {
                    inputControl.current = element;
                    if (typeof ref === 'function') {
                        ref(element);
                    }
                }, disabled: disabled, value: getUserInputOrUpdatedCurrentDate(), onChange: (newValue) => debouncedSetInputStringAndMaybeCallOnChange(newValue ?? '', true), onBlur: (event) => {
                    if (hasFocusLeftInputAndDropdownContent(event)) {
                        // close the dropdown, which will also trigger
                        // the component's onBlur to be called
                        onClose();
                    }
                }, suffix: (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.calendar, className: "calendar-icon fincommerce-date-time-picker-control__input-control__suffix", onClick: focusInputControl, size: 16 }), placeholder: placeholder, "aria-describedby": (0, i18n_1.sprintf)(
                /* translators: A datetime format */
                (0, i18n_1.__)('Date input describing a selected date in format %s', 'fincommerce'), dateTimeFormat), onFocus: () => {
                    if (isOpen) {
                        return; // the dropdown is already open, do we don't need to do anything
                    }
                    onToggle(); // show the dropdown
                }, "aria-expanded": isOpen }))), popoverProps: {
            anchor: inputControl.current,
            className: 'fincommerce-date-time-picker-control__popover',
            placement: 'bottom-start',
            ...popoverProps,
        }, renderContent: () => {
            const Picker = isDateOnlyPicker
                ? components_1.DatePicker
                : components_1.DateTimePicker;
            return ((0, element_1.createElement)(Picker, { currentDate: inputStringDateTime.isValid()
                    ? formatDateTimeAsISO(inputStringDateTime)
                    : null, onChange: (newDateTimeISOString) => setInputStringAndMaybeCallOnChange(newDateTimeISOString, false), is12Hour: is12HourPicker }));
        } }));
});
