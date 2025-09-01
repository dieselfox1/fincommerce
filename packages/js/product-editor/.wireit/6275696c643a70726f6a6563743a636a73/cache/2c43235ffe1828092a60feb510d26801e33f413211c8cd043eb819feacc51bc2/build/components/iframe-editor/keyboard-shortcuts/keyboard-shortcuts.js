"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardShortcuts = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const keyboard_shortcuts_1 = require("@wordpress/keyboard-shortcuts");
const interface_1 = require("@wordpress/interface");
/**
 * Internal dependencies
 */
const context_1 = require("../context");
const constants_1 = require("../constants");
const KeyboardShortcuts = () => {
    const { isDocumentOverviewOpened: isListViewOpened, redo, setIsDocumentOverviewOpened: setIsListViewOpened, undo, } = (0, element_1.useContext)(context_1.EditorContext);
    const { isSettingsSidebarOpen } = (0, data_1.useSelect)((select) => {
        const { getActiveComplementaryArea } = select(interface_1.store);
        return {
            isSettingsSidebarOpen: getActiveComplementaryArea(constants_1.SIDEBAR_COMPLEMENTARY_AREA_SCOPE) === constants_1.SETTINGS_SIDEBAR_IDENTIFIER,
        };
    }, []);
    const { disableComplementaryArea, enableComplementaryArea } = (0, data_1.useDispatch)(interface_1.store);
    (0, keyboard_shortcuts_1.useShortcut)('fincommerce/product-editor/modal-block-editor/undo', (event) => {
        undo();
        event.preventDefault();
    });
    (0, keyboard_shortcuts_1.useShortcut)('fincommerce/product-editor/modal-block-editor/redo', (event) => {
        redo();
        event.preventDefault();
    });
    (0, keyboard_shortcuts_1.useShortcut)('fincommerce/product-editor/modal-block-editor/toggle-list-view', (event) => {
        setIsListViewOpened(!isListViewOpened);
        event.preventDefault();
    });
    (0, keyboard_shortcuts_1.useShortcut)('fincommerce/product-editor/modal-block-editor/toggle-sidebar', (event) => {
        if (isSettingsSidebarOpen) {
            disableComplementaryArea(constants_1.SIDEBAR_COMPLEMENTARY_AREA_SCOPE);
        }
        else {
            enableComplementaryArea(constants_1.SIDEBAR_COMPLEMENTARY_AREA_SCOPE, constants_1.SETTINGS_SIDEBAR_IDENTIFIER);
        }
        event.preventDefault();
    });
    return null;
};
exports.KeyboardShortcuts = KeyboardShortcuts;
