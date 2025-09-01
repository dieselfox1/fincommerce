"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentOverview = void 0;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const icons_1 = require("@wordpress/icons");
const keycodes_1 = require("@wordpress/keycodes");
const i18n_1 = require("@wordpress/i18n");
const context_1 = require("../../context");
exports.DocumentOverview = (0, element_1.forwardRef)(function ForwardedRefDocumentOverview(props, ref) {
    const { isDocumentOverviewOpened, setIsDocumentOverviewOpened } = (0, element_1.useContext)(context_1.EditorContext);
    function handleClick() {
        setIsDocumentOverviewOpened(!isDocumentOverviewOpened);
    }
    return ((0, element_1.createElement)(components_1.Button, { ...props, ref: ref, icon: icons_1.listView, isPressed: isDocumentOverviewOpened, 
        /* translators: button label text should, if possible, be under 16 characters. */
        label: (0, i18n_1.__)('Document overview', 'fincommerce'), shortcut: keycodes_1.displayShortcut.access('o'), onClick: handleClick, className: "document-overview" }));
});
