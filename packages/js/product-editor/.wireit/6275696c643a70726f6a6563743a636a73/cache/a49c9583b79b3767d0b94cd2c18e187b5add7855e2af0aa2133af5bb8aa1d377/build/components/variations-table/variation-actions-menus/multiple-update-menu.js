"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleUpdateMenu = MultipleUpdateMenu;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const variation_actions_1 = require("./variation-actions");
function MultipleUpdateMenu({ selection, disabled, onChange, onDelete, }) {
    if (!selection) {
        return null;
    }
    return ((0, element_1.createElement)(components_1.Dropdown, { popoverProps: {
            placement: 'bottom-end',
        }, renderToggle: ({ isOpen, onToggle }) => ((0, element_1.createElement)(components_1.Button, { disabled: disabled, "aria-expanded": isOpen, icon: isOpen ? icons_1.chevronUp : icons_1.chevronDown, variant: "secondary", onClick: onToggle, className: "variations-actions-menu__toggle" },
            (0, element_1.createElement)("span", null, (0, i18n_1.__)('Quick update', 'fincommerce')))), renderContent: ({ onClose }) => ((0, element_1.createElement)(variation_actions_1.VariationActions, { selection: selection, onClose: onClose, onChange: onChange, onDelete: onDelete, supportsMultipleSelection: true })) }));
}
