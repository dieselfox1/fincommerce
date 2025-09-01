/**
 * External dependencies
 */
import clsx from 'clsx';
import { createElement, forwardRef, useImperativeHandle, useRef, } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */
import Tag from '../tag';
const PrivateSelectedItems = ({ isReadOnly, items, getItemLabel, getItemValue, getSelectedItemProps, onRemove, onBlur, onSelectedItemsEnd, }, ref) => {
    const classes = clsx('fincommerce-experimental-select-control__selected-items', {
        'is-read-only': isReadOnly,
    });
    const lastRemoveButtonRef = useRef(null);
    useImperativeHandle(ref, () => {
        return () => lastRemoveButtonRef.current?.focus();
    }, []);
    if (isReadOnly) {
        return (createElement("div", { className: classes }, items
            .map((item) => {
            return decodeEntities(getItemLabel(item));
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
    return (createElement("div", { className: classes }, items.map((item, index) => {
        return (
        // Disable reason: We prevent the default action to keep the input focused on click.
        // Keyboard users are unaffected by this change.
        /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        createElement("div", { key: `selected-item-${index}`, className: "fincommerce-experimental-select-control__selected-item", ...getSelectedItemProps({
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
            createElement(Tag, { id: getItemValue(item), remove: () => () => onRemove(item), label: getItemLabel(item), ref: index === items.length - 1
                    ? lastRemoveButtonRef
                    : undefined })));
    })));
};
export const SelectedItems = forwardRef(PrivateSelectedItems);
