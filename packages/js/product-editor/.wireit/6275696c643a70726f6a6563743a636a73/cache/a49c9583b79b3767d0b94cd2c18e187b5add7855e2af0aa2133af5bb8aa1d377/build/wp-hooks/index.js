"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerProductEditorHooks;
/**
 * Internal dependencies
 */
const hide_inventory_advanced_collapsible_1 = __importDefault(require("./hide-inventory-advanced-collapsible"));
function registerProductEditorHooks() {
    (0, hide_inventory_advanced_collapsible_1.default)();
}
