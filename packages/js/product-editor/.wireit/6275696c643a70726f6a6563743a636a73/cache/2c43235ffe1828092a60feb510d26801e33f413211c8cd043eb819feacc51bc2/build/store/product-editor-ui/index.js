"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wooProductEditorUiStore = void 0;
exports.default = registerProductEditorUiStore;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const actions_1 = __importDefault(require("./actions"));
const selectors_1 = __importDefault(require("./selectors"));
const reducer_1 = __importDefault(require("./reducer"));
/**
 * Types
 */
const store = 'woo/product-editor-ui';
exports.wooProductEditorUiStore = (0, data_1.createReduxStore)(store, {
    actions: actions_1.default,
    selectors: selectors_1.default,
    reducer: reducer_1.default,
});
function registerProductEditorUiStore() {
    (0, data_1.register)(exports.wooProductEditorUiStore);
}
