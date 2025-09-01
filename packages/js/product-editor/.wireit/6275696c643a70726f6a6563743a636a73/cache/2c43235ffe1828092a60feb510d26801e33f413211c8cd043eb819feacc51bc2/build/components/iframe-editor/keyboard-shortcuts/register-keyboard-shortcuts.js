"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterKeyboardShortcuts = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
const keycodes_1 = require("@wordpress/keycodes");
const RegisterKeyboardShortcuts = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore registerShortcut is not defined in the types
    const { registerShortcut } = (0, data_1.useDispatch)(keyboard_shortcuts_1.store);
    (0, element_1.useEffect)(() => {
        registerShortcut({
            name: 'fincommerce/product-editor/modal-block-editor/undo',
            category: 'global',
            description: (0, i18n_1.__)('Undo your last changes.', 'fincommerce'),
            keyCombination: {
                modifier: 'primary',
                character: 'z',
            },
        });
        registerShortcut({
            name: 'fincommerce/product-editor/modal-block-editor/redo',
            category: 'global',
            description: (0, i18n_1.__)('Redo your last undo.', 'fincommerce'),
            keyCombination: {
                modifier: 'primaryShift',
                character: 'z',
            },
            // Disable on Apple OS because it conflicts with the browser's
            // history shortcut. It's a fine alias for both Windows and Linux.
            // Since there's no conflict for Ctrl+Shift+Z on both Windows and
            // Linux, we keep it as the default for consistency.
            aliases: (0, keycodes_1.isAppleOS)()
                ? []
                : [
                    {
                        modifier: 'primary',
                        character: 'y',
                    },
                ],
        });
        registerShortcut({
            name: 'fincommerce/product-editor/modal-block-editor/toggle-list-view',
            category: 'global',
            description: (0, i18n_1.__)('Open the block list view.', 'fincommerce'),
            keyCombination: {
                modifier: 'access',
                character: 'o',
            },
        });
        registerShortcut({
            name: 'fincommerce/product-editor/modal-block-editor/toggle-sidebar',
            category: 'global',
            description: (0, i18n_1.__)('Show or hide the Settings sidebar.', 'fincommerce'),
            keyCombination: {
                modifier: 'primaryShift',
                character: ',',
            },
        });
    }, [registerShortcut]);
    return null;
};
exports.RegisterKeyboardShortcuts = RegisterKeyboardShortcuts;
