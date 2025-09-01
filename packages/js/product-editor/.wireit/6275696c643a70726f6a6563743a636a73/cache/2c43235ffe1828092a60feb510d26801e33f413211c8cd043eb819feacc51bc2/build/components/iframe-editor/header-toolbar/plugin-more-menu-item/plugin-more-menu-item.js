"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMoreMenuItem = void 0;
/**
 * External dependencies
 */
const compose_1 = require("@wordpress/compose");
const components_1 = require("@wordpress/components");
const plugins_1 = require("@wordpress/plugins");
const action_item_1 = __importDefault(require("@wordpress/interface/build-module/components/action-item"));
/**
 * Internal dependencies
 */
const constants_1 = require("../../constants");
exports.PluginMoreMenuItem = (0, compose_1.compose)(
// @ts-expect-error The type defintion of withPluginContext is incorrect.
(0, plugins_1.withPluginContext)((context, ownProps) => {
    return {
        as: ownProps.as ?? components_1.MenuItem,
        icon: ownProps.icon || context.icon,
        name: constants_1.MORE_MENU_ACTION_ITEM_SLOT_NAME,
    };
}))(action_item_1.default);
