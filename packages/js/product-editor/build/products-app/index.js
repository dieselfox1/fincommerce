"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsApp = ProductsApp;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const router_1 = require("@wordpress/router");
const editor_1 = require("@wordpress/editor");
/**
 * Internal dependencies
 */
const lock_unlock_1 = require("../lock-unlock");
const router_2 = __importDefault(require("./router"));
const layout_1 = require("./layout");
const new_navigation_1 = require("./utilites/new-navigation");
const { RouterProvider } = (0, lock_unlock_1.unlock)(router_1.privateApis);
const { GlobalStylesProvider } = (0, lock_unlock_1.unlock)(editor_1.privateApis);
function ProductsLayout() {
    // This ensures the edited entity id and type are initialized properly.
    const [showNewNavigation] = (0, new_navigation_1.useNewNavigation)();
    if (showNewNavigation) {
        document.body.classList.add('is-fullscreen-mode');
    }
    else {
        document.body.classList.remove('is-fullscreen-mode');
    }
    const route = (0, router_2.default)();
    return (0, element_1.createElement)(layout_1.Layout, { route: route, showNewNavigation: showNewNavigation });
}
function ProductsApp() {
    return ((0, element_1.createElement)(new_navigation_1.NewNavigationProvider, null,
        (0, element_1.createElement)(GlobalStylesProvider, null,
            (0, element_1.createElement)(editor_1.UnsavedChangesWarning, null),
            (0, element_1.createElement)(RouterProvider, null,
                (0, element_1.createElement)(ProductsLayout, null)))));
}
