"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
const html_entities_1 = require("@wordpress/html-entities");
const compose_1 = require("@wordpress/compose");
const Tag = (0, element_1.forwardRef)(({ id, label, popoverContents, remove, screenReaderLabel, className, }, removeButtonRef) => {
    const [isVisible, setIsVisible] = (0, element_1.useState)(false);
    const instanceId = (0, compose_1.useInstanceId)(Tag).toString();
    const labelId = `fincommerce-tag__label-${instanceId}`;
    screenReaderLabel = screenReaderLabel || label;
    if (!label) {
        // A null label probably means something went wrong
        // @todo Maybe this should be a loading indicator?
        return null;
    }
    label = (0, html_entities_1.decodeEntities)(label);
    const classes = (0, clsx_1.default)('fincommerce-tag', className, {
        'has-remove': !!remove,
    });
    const labelTextNode = ((0, element_1.createElement)(element_1.Fragment, null,
        (0, element_1.createElement)("span", { className: "screen-reader-text" }, screenReaderLabel),
        (0, element_1.createElement)("span", { "aria-hidden": "true" }, label)));
    return ((0, element_1.createElement)("span", { className: classes },
        popoverContents ? ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-tag__text", id: labelId, onClick: () => setIsVisible(true) }, labelTextNode)) : ((0, element_1.createElement)("span", { className: "fincommerce-tag__text", id: labelId }, labelTextNode)),
        popoverContents && isVisible && ((0, element_1.createElement)(components_1.Popover, { onClose: () => setIsVisible(false) }, popoverContents)),
        remove && ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-tag__remove", ref: removeButtonRef, onClick: remove(id), label: (0, i18n_1.sprintf)(
            // translators: %s is the name of the tag being removed.
            (0, i18n_1.__)('Remove %s', 'fincommerce'), label), "aria-describedby": labelId },
            (0, element_1.createElement)(icons_1.Icon, { icon: icons_1.closeSmall, size: 20, className: "clear-icon" })))));
});
exports.default = Tag;
