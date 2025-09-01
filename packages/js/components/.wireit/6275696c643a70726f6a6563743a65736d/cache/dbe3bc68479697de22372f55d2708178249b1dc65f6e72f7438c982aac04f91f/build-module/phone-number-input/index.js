/**
 * External dependencies
 */
import { createElement, useState, useRef, useLayoutEffect, } from '@wordpress/element';
import { useSelect } from 'downshift';
import clsx from 'clsx';
/**
 * Internal dependencies
 */
import data from './data';
import { parseData, sanitizeInput, guessCountryKey, numberToE164, } from './utils';
import { defaultSelectedRender, defaultItemRender, defaultArrowRender, } from './defaults';
const { countries, countryCodes } = parseData(data);
/**
 * An international phone number input with a country code select and a phone textfield which supports numbers, spaces and hyphens. And returns the full number as it is, in E.164 format, and the selected country alpha2.
 */
const PhoneNumberInput = ({ value, onChange, id, className, selectedRender = defaultSelectedRender, itemRender = defaultItemRender, arrowRender = defaultArrowRender, }) => {
    const menuRef = useRef(null);
    const inputRef = useRef(null);
    const [menuWidth, setMenuWidth] = useState(0);
    const [countryKey, setCountryKey] = useState(guessCountryKey(value, countryCodes));
    useLayoutEffect(() => {
        if (menuRef.current) {
            setMenuWidth(menuRef.current.offsetWidth);
        }
    }, [menuRef, countryKey]);
    const phoneNumber = sanitizeInput(value)
        .replace(countries[countryKey].code, '')
        .trimStart();
    const handleChange = (code, number) => {
        // Return value, phone number in E.164 format, and country alpha2 code.
        number = `+${countries[code].code} ${number}`;
        onChange(number, numberToE164(number), code);
    };
    const handleSelect = (code) => {
        setCountryKey(code);
        handleChange(code, phoneNumber);
    };
    const handleInput = (event) => {
        handleChange(countryKey, sanitizeInput(event.target.value));
    };
    const handleKeyDown = (event) => {
        const pos = inputRef.current?.selectionStart || 0;
        const newValue = phoneNumber.slice(0, pos) + event.key + phoneNumber.slice(pos);
        if (/[- ]{2,}/.test(newValue)) {
            event.preventDefault();
        }
    };
    const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps, } = useSelect({
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
    return (createElement("div", { className: clsx(className, 'wcpay-component-phone-number-input') },
        createElement("button", { ...getToggleButtonProps({
                ref: menuRef,
                type: 'button',
                className: clsx('wcpay-component-phone-number-input__button'),
            }) },
            selectedRender(countries[countryKey]),
            createElement("span", { className: clsx('wcpay-component-phone-number-input__button-arrow', { invert: isOpen }) }, arrowRender())),
        createElement("input", { id: id, ref: inputRef, type: "text", value: phoneNumber, onKeyDown: handleKeyDown, onChange: handleInput, className: "wcpay-component-phone-number-input__input", style: { paddingLeft: `${menuWidth}px` } }),
        createElement("ul", { ...getMenuProps({
                'aria-hidden': !isOpen,
                className: 'wcpay-component-phone-number-input__menu',
            }) }, isOpen &&
            Object.keys(countries).map((key, index) => (
            // eslint-disable-next-line react/jsx-key
            createElement("li", { ...getItemProps({
                    key,
                    index,
                    item: key,
                    className: clsx('wcpay-component-phone-number-input__menu-item', { highlighted: highlightedIndex === index }),
                }) }, itemRender(countries[key])))))));
};
export default PhoneNumberInput;
