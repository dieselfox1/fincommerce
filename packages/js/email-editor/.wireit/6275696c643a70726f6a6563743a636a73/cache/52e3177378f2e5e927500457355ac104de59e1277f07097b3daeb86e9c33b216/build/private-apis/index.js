"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregisterEntityAction = exports.registerEntityAction = exports.BackButton = exports.ViewMoreMenuGroup = exports.FullscreenMode = exports.Editor = exports.useGlobalStylesOutputWithConfig = exports.StylesColorPanel = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const private_apis_1 = require("@wordpress/private-apis");
const editor_1 = require("@wordpress/editor");
// eslint-disable-next-line @fincommerce/dependency-group
const block_editor_1 = require("@wordpress/block-editor");
const { unlock } = (0, private_apis_1.__dangerousOptInToUnstableAPIsOnlyForCoreModules)('I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.', '@wordpress/edit-site' // The module name must be in the list of allowed, so for now I used the package name of the post editor
);
/**
 * We use the ColorPanel component from the block editor to render the color panel in the style settings sidebar.
 */
const { ColorPanel: StylesColorPanel } = unlock(block_editor_1.privateApis);
exports.StylesColorPanel = StylesColorPanel;
/**
 * The useGlobalStylesOutputWithConfig is used to generate the CSS for the email editor content from the style settings.
 */
const { useGlobalStylesOutputWithConfig } = unlock(block_editor_1.privateApis);
exports.useGlobalStylesOutputWithConfig = useGlobalStylesOutputWithConfig;
/**
 * The Editor is the main component for the email editor.
 */
const { Editor, FullscreenMode, ViewMoreMenuGroup, BackButton } = unlock(editor_1.privateApis);
exports.Editor = Editor;
exports.FullscreenMode = FullscreenMode;
exports.ViewMoreMenuGroup = ViewMoreMenuGroup;
exports.BackButton = BackButton;
/**
 * The registerEntityAction and unregisterEntityAction are used to register and unregister entity actions.
 * This is used in the move-to-trash.tsx file to modify the move to trash action.
 * Providing us with the ability to remove the default move to trash action and add a custom trash email post action.
 */
const { registerEntityAction, unregisterEntityAction } = unlock((0, data_1.dispatch)(editor_1.store));
exports.registerEntityAction = registerEntityAction;
exports.unregisterEntityAction = unregisterEntityAction;
