/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import clsx from 'clsx';
import { Button, Popover } from '@wordpress/components';
import { createElement, Fragment, useState } from '@wordpress/element';
import { Icon, help } from '@wordpress/icons';
import { useInstanceId } from '@wordpress/compose';
export const Tooltip = ({ children = createElement(Icon, { icon: help }), className = '', helperText = __('Help', 'fincommerce'), position = 'top center', text, }) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const uniqueIdentifier = useInstanceId(Tooltip, 'product_tooltip');
    return (createElement(Fragment, null,
        createElement("div", { className: clsx('fincommerce-tooltip', uniqueIdentifier) },
            createElement(Button, { className: clsx('fincommerce-tooltip__button', className), onKeyDown: (event) => {
                    if (event.key !== 'Enter') {
                        return;
                    }
                    setIsPopoverVisible(true);
                }, onClick: () => setIsPopoverVisible(!isPopoverVisible), label: helperText }, children),
            isPopoverVisible && (createElement(Popover, { focusOnMount: true, position: position, inline: true, className: "fincommerce-tooltip__text", onFocusOutside: (event) => {
                    if (event.currentTarget?.classList.contains(uniqueIdentifier)) {
                        return;
                    }
                    setIsPopoverVisible(false);
                }, onKeyDown: (event) => {
                    if (event.key !== 'Escape') {
                        return;
                    }
                    setIsPopoverVisible(false);
                } }, text)))));
};
