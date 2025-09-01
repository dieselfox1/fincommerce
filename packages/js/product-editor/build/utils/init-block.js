"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBlock = initBlock;
const deprecated_1 = __importDefault(require("@wordpress/deprecated"));
/**
 * Internal dependencies
 */
const register_product_editor_block_type_1 = require("./register-product-editor-block-type");
/**
 * Function to register an individual block.
 *
 * @param block The block to be registered.
 * @return The block, if it has been successfully registered; otherwise `undefined`.
 */
function initBlock(block) {
    (0, deprecated_1.default)('initBlock()', {
        alternative: 'registerProductEditorBlockType()',
    });
    if (!block) {
        return;
    }
    return (0, register_product_editor_block_type_1.registerProductEditorBlockType)(block);
}
