"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigator = void 0;
/**
 * This is a temporary solution we can drop after we stop supporting WordPress 6.7.
 * Navigator was added in WordPress 6.8.
 */
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const Navigator = components_1.Navigator || components_1.__experimentalNavigatorProvider;
exports.Navigator = Navigator;
if (!components_1.Navigator) {
    Navigator.Screen = components_1.__experimentalNavigatorScreen;
    Navigator.BackButton = components_1.__experimentalNavigatorBackButton;
}
