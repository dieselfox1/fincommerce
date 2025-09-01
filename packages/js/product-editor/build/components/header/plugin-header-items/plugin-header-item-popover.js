"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginHeaderItemPopover = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
const icons_1 = require("@wordpress/icons");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @fincommerce/dependency-group
const pinned_items_1 = __importDefault(require("@wordpress/interface/build-module/components/pinned-items"));
/**
 * Internal dependencies
 */
const constants_1 = require("../../../constants");
const PluginHeaderItemPopover = ({ children, label, icon, }) => {
    const [isVisible, setVisible] = (0, element_1.useState)(false);
    const childrenToRender = typeof children === 'function'
        ? children({ isVisible, setVisible })
        : children;
    return ((0, element_1.createElement)(pinned_items_1.default, { scope: constants_1.HEADER_PINNED_ITEMS_SCOPE },
        (0, element_1.createElement)(element_1.Fragment, null,
            (0, element_1.createElement)(components_1.Button, { variant: "tertiary", icon: icon ?? icons_1.plugins, label: label, onClick: () => setVisible(!isVisible) }),
            isVisible && ((0, element_1.createElement)(components_1.Popover, { focusOnMount: true, onFocusOutside: () => setVisible(false), onClose: () => setVisible(false) }, childrenToRender)))));
};
exports.PluginHeaderItemPopover = PluginHeaderItemPopover;
