/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createElement, forwardRef, Fragment, useState, } from '@wordpress/element';
import clsx from 'clsx';
import { Button, Popover } from '@wordpress/components';
import { Icon, closeSmall } from '@wordpress/icons';
import { decodeEntities } from '@wordpress/html-entities';
import { useInstanceId } from '@wordpress/compose';
const Tag = forwardRef(({ id, label, popoverContents, remove, screenReaderLabel, className, }, removeButtonRef) => {
    const [isVisible, setIsVisible] = useState(false);
    const instanceId = useInstanceId(Tag).toString();
    const labelId = `fincommerce-tag__label-${instanceId}`;
    screenReaderLabel = screenReaderLabel || label;
    if (!label) {
        // A null label probably means something went wrong
        // @todo Maybe this should be a loading indicator?
        return null;
    }
    label = decodeEntities(label);
    const classes = clsx('fincommerce-tag', className, {
        'has-remove': !!remove,
    });
    const labelTextNode = (createElement(Fragment, null,
        createElement("span", { className: "screen-reader-text" }, screenReaderLabel),
        createElement("span", { "aria-hidden": "true" }, label)));
    return (createElement("span", { className: classes },
        popoverContents ? (createElement(Button, { className: "fincommerce-tag__text", id: labelId, onClick: () => setIsVisible(true) }, labelTextNode)) : (createElement("span", { className: "fincommerce-tag__text", id: labelId }, labelTextNode)),
        popoverContents && isVisible && (createElement(Popover, { onClose: () => setIsVisible(false) }, popoverContents)),
        remove && (createElement(Button, { className: "fincommerce-tag__remove", ref: removeButtonRef, onClick: remove(id), label: sprintf(
            // translators: %s is the name of the tag being removed.
            __('Remove %s', 'fincommerce'), label), "aria-describedby": labelId },
            createElement(Icon, { icon: closeSmall, size: 20, className: "clear-icon" })))));
});
export default Tag;
