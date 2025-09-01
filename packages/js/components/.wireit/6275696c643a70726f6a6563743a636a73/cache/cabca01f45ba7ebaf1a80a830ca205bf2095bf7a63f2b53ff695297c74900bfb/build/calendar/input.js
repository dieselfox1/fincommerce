"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const clsx_1 = __importDefault(require("clsx"));
const lodash_1 = require("lodash");
const prop_types_1 = __importDefault(require("prop-types"));
const DateInput = ({ disabled = false, value, onChange, dateFormat, label, describedBy, error, onFocus = () => { }, onBlur = () => { }, onKeyDown = lodash_1.noop, errorPosition = 'bottom center', }) => {
    const classes = (0, clsx_1.default)('fincommerce-calendar__input', {
        'is-empty': value.length === 0,
        'is-error': error,
    });
    const id = (0, lodash_1.uniqueId)('_woo-dates-input');
    return ((0, element_1.createElement)("div", { className: classes },
        (0, element_1.createElement)("input", { type: "text", className: "fincommerce-calendar__input-text", value: value, onChange: onChange, "aria-label": label, id: id, "aria-describedby": `${id}-message`, placeholder: dateFormat.toLowerCase(), onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, disabled: disabled }),
        error && ((0, element_1.createElement)(components_1.Popover, { className: "fincommerce-calendar__input-error", focusOnMount: false, position: errorPosition }, error)),
        (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.calendar, className: "calendar-icon" }),
        (0, element_1.createElement)("p", { className: "screen-reader-text", id: `${id}-message` }, error || describedBy)));
};
DateInput.propTypes = {
    disabled: prop_types_1.default.bool,
    value: prop_types_1.default.string,
    onChange: prop_types_1.default.func.isRequired,
    dateFormat: prop_types_1.default.string.isRequired,
    label: prop_types_1.default.string.isRequired,
    describedBy: prop_types_1.default.string.isRequired,
    error: prop_types_1.default.string,
    errorPosition: prop_types_1.default.string,
    onFocus: prop_types_1.default.func,
    onBlur: prop_types_1.default.func,
    onKeyDown: prop_types_1.default.func,
};
exports.default = DateInput;
