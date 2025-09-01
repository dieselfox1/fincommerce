"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedItems = void 0;
/**
 * External dependencies
 */
const clsx_1 = __importDefault(require("clsx"));
const element_1 = require("@wordpress/element");
const html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
const tag_1 = __importDefault(require("../tag"));
const PrivateSelectedItems = ({ isReadOnly, items, getItemLabel, getItemValue, getSelectedItemProps, onRemove, onBlur, onSelectedItemsEnd, }, ref) => {
    const classes = (0, clsx_1.default)('fincommerce-experimental-select-control__selected-items', {
        'is-read-only': isReadOnly,
    });
    const lastRemoveButtonRef = (0, element_1.useRef)(null);
    (0, element_1.useImperativeHandle)(ref, () => {
        return () => lastRemoveButtonRef.current?.focus();
    }, []);
    if (isReadOnly) {
        return ((0, element_1.createElement)("div", { className: classes }, items
            .map((item) => {
            return (0, html_entities_1.decodeEntities)(getItemLabel(item));
        })
            .join(', ')));
    }
    const focusSibling = (event) => {
        const selectedItem = event.target.closest('.fincommerce-experimental-select-control__selected-item');
        const sibling = event.key === 'ArrowLeft' || event.key === 'Backspace'
            ? selectedItem?.previousSibling
            : selectedItem?.nextSibling;
        if (sibling) {
            sibling.querySelector('.fincommerce-tag__remove')?.focus();
            return true;
        }
        return false;
    };
    return ((0, element_1.createElement)("div", { className: classes }, items.map((item, index) => {
        return (
        // Disable reason: We prevent the default action to keep the input focused on click.
        // Keyboard users are unaffected by this change.
        /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        (0, element_1.createElement)("div", { key: `selected-item-${index}`, className: "fincommerce-experimental-select-control__selected-item", ...getSelectedItemProps({
                selectedItem: item,
                index,
            }), onMouseDown: (event) => {
                event.preventDefault();
            }, onClick: (event) => {
                event.preventDefault();
            }, onKeyDown: (event) => {
                if (event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight') {
                    const focused = focusSibling(event);
                    if (!focused &&
                        event.key === 'ArrowRight' &&
                        onSelectedItemsEnd) {
                        onSelectedItemsEnd();
                    }
                }
                else if (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown') {
                    event.preventDefault(); // prevent unwanted scroll
                }
                else if (event.key === 'Backspace') {
                    onRemove(item);
                    focusSibling(event);
                }
            }, onBlur: onBlur },
            (0, element_1.createElement)(tag_1.default, { id: getItemValue(item), remove: () => () => onRemove(item), label: getItemLabel(item), ref: index === items.length - 1
                    ? lastRemoveButtonRef
                    : undefined })));
    })));
};
exports.SelectedItems = (0, element_1.forwardRef)(PrivateSelectedItems);
