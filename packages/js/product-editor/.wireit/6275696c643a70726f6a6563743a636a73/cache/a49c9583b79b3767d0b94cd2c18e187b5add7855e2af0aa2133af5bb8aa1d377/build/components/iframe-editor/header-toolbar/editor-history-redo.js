"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const keycodes_1 = require("@wordpress/keycodes");
/**
 * Internal dependencies
 */
const context_1 = require("../context");
function EditorHistoryRedo(props, ref) {
    const shortcut = (0, keycodes_1.isAppleOS)()
        ? keycodes_1.displayShortcut.primaryShift('z')
        : keycodes_1.displayShortcut.primary('y');
    const { hasRedo, redo } = (0, element_1.useContext)(context_1.EditorContext);
    return ((0, element_1.createElement)(components_1.Button, { ...props, ref: ref, icon: !(0, i18n_1.isRTL)() ? icons_1.redo : icons_1.undo, 
        /* translators: button label text should, if possible, be under 16 characters. */
        label: (0, i18n_1.__)('Redo', 'fincommerce'), shortcut: shortcut, "aria-disabled": !hasRedo, onClick: hasRedo ? redo : undefined, className: "editor-history__redo" }));
}
exports.default = (0, element_1.forwardRef)(EditorHistoryRedo);
