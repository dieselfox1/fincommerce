/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { chevronDown } from '@wordpress/icons';
import { Button, DropdownMenu, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export * from './types';
export function ButtonWithDropdownMenu({ dropdownButtonLabel = __('More options', 'fincommerce'), controls, defaultOpen = false, popoverProps: { placement = 'bottom-end', position = 'bottom left left', offset = 0, } = {
    placement: 'bottom-end',
    position: 'bottom left left',
    offset: 0,
}, className, renderMenu, onToggle, ...props }) {
    return (createElement(Flex, { className: `fincommerce-button-with-dropdown-menu${className?.length ? ' ' + className : ''}`, justify: "left", gap: 0, expanded: false, role: "group" },
        createElement(FlexItem, { role: "none" },
            createElement(Button, { ...props, className: "fincommerce-button-with-dropdown-menu__main-button" })),
        createElement(FlexItem, { role: "none" },
            createElement(DropdownMenu, { toggleProps: {
                    className: 'fincommerce-button-with-dropdown-menu__dropdown-button',
                    variant: props.variant,
                }, controls: controls, icon: chevronDown, label: dropdownButtonLabel, popoverProps: {
                    placement,
                    position,
                    offset,
                }, defaultOpen: defaultOpen, onToggle: onToggle }, renderMenu))));
}
