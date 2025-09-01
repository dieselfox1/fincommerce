"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const downshift_1 = require("downshift");
const clsx_1 = __importDefault(require("clsx"));
/**
 * Internal dependencies
 */
const data_1 = __importDefault(require("./data"));
const utils_1 = require("./utils");
const defaults_1 = require("./defaults");
const { countries, countryCodes } = (0, utils_1.parseData)(data_1.default);
/**
 * An international phone number input with a country code select and a phone textfield which supports numbers, spaces and hyphens. And returns the full number as it is, in E.164 format, and the selected country alpha2.
 */
const PhoneNumberInput = ({ value, onChange, id, className, selectedRender = defaults_1.defaultSelectedRender, itemRender = defaults_1.defaultItemRender, arrowRender = defaults_1.defaultArrowRender, }) => {
    const menuRef = (0, element_1.useRef)(null);
    const inputRef = (0, element_1.useRef)(null);
    const [menuWidth, setMenuWidth] = (0, element_1.useState)(0);
    const [countryKey, setCountryKey] = (0, element_1.useState)((0, utils_1.guessCountryKey)(value, countryCodes));
    (0, element_1.useLayoutEffect)(() => {
        if (menuRef.current) {
            setMenuWidth(menuRef.current.offsetWidth);
        }
    }, [menuRef, countryKey]);
    const phoneNumber = (0, utils_1.sanitizeInput)(value)
        .replace(countries[countryKey].code, '')
        .trimStart();
    const handleChange = (code, number) => {
        // Return value, phone number in E.164 format, and country alpha2 code.
        number = `+${countries[code].code} ${number}`;
        onChange(number, (0, utils_1.numberToE164)(number), code);
    };
    const handleSelect = (code) => {
        setCountryKey(code);
        handleChange(code, phoneNumber);
    };
    const handleInput = (event) => {
        handleChange(countryKey, (0, utils_1.sanitizeInput)(event.target.value));
    };
    const handleKeyDown = (event) => {
        const pos = inputRef.current?.selectionStart || 0;
        const newValue = phoneNumber.slice(0, pos) + event.key + phoneNumber.slice(pos);
        if (/[- ]{2,}/.test(newValue)) {
            event.preventDefault();
        }
    };
    const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps, } = (0, downshift_1.useSelect)({
        id,
        items: Object.keys(countries),
        initialSelectedItem: countryKey,
        itemToString: (item) => countries[item || ''].name,
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem)
                handleSelect(selectedItem);
        },
        stateReducer: (state, { changes }) => {
            if (state.isOpen === true && changes.isOpen === false) {
                inputRef.current?.focus();
            }
            return changes;
        },
    });
    return ((0, element_1.createElement)("div", { className: (0, clsx_1.default)(className, 'wcpay-component-phone-number-input') },
        (0, element_1.createElement)("button", { ...getToggleButtonProps({
                ref: menuRef,
                type: 'button',
                className: (0, clsx_1.default)('wcpay-component-phone-number-input__button'),
            }) },
            selectedRender(countries[countryKey]),
            (0, element_1.createElement)("span", { className: (0, clsx_1.default)('wcpay-component-phone-number-input__button-arrow', { invert: isOpen }) }, arrowRender())),
        (0, element_1.createElement)("input", { id: id, ref: inputRef, type: "text", value: phoneNumber, onKeyDown: handleKeyDown, onChange: handleInput, className: "wcpay-component-phone-number-input__input", style: { paddingLeft: `${menuWidth}px` } }),
        (0, element_1.createElement)("ul", { ...getMenuProps({
                'aria-hidden': !isOpen,
                className: 'wcpay-component-phone-number-input__menu',
            }) }, isOpen &&
            Object.keys(countries).map((key, index) => (
            // eslint-disable-next-line react/jsx-key
            (0, element_1.createElement)("li", { ...getItemProps({
                    key,
                    index,
                    item: key,
                    className: (0, clsx_1.default)('wcpay-component-phone-number-input__menu-item', { highlighted: highlightedIndex === index }),
                }) }, itemRender(countries[key])))))));
};
exports.default = PhoneNumberInput;
