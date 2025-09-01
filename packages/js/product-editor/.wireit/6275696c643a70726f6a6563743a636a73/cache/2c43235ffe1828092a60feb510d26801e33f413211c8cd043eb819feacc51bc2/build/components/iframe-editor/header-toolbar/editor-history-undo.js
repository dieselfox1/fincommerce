"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const keycodes_1 = require("@wordpress/keycodes");
const icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
const context_1 = require("../context");
function EditorHistoryUndo(props, ref) {
    const { hasUndo, undo } = (0, element_1.useContext)(context_1.EditorContext);
    return ((0, element_1.createElement)(components_1.Button, { ...props, ref: ref, icon: !(0, i18n_1.isRTL)() ? icons_1.undo : icons_1.redo, 
        /* translators: button label text should, if possible, be under 16 characters. */
        label: (0, i18n_1.__)('Undo', 'fincommerce'), shortcut: keycodes_1.displayShortcut.primary('z'), "aria-disabled": !hasUndo, onClick: hasUndo ? undo : undefined, className: "editor-history__undo" }));
}
exports.default = (0, element_1.forwardRef)(EditorHistoryUndo);
