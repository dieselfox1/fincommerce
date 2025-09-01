/**
 * External dependencies
 */
import { Button, Dropdown } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { chevronDown, chevronUp } from '@wordpress/icons';
import { VariationActions } from './variation-actions';
export function MultipleUpdateMenu({ selection, disabled, onChange, onDelete, }) {
    if (!selection) {
        return null;
    }
    return (createElement(Dropdown, { popoverProps: {
            placement: 'bottom-end',
        }, renderToggle: ({ isOpen, onToggle }) => (createElement(Button, { disabled: disabled, "aria-expanded": isOpen, icon: isOpen ? chevronUp : chevronDown, variant: "secondary", onClick: onToggle, className: "variations-actions-menu__toggle" },
            createElement("span", null, __('Quick update', 'fincommerce')))), renderContent: ({ onClose }) => (createElement(VariationActions, { selection: selection, onClose: onClose, onChange: onChange, onDelete: onDelete, supportsMultipleSelection: true })) }));
}
