"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackButton = BackButton;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const icons_1 = require("@wordpress/icons");
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
function BackButton({ onClick }) {
    return ((0, element_1.createElement)(components_1.Button, { className: "fincommerce-iframe-editor__back-button", icon: icons_1.arrowLeft, onClick: onClick }, (0, i18n_1.__)('Back', 'fincommerce')));
}
