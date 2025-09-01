"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockSlot = BlockSlot;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const element_1 = require("@wordpress/element");
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const get_name_1 = require("./utils/get-name");
function BlockSlot({ name, ...props }) {
    const { clientId } = (0, block_editor_1.useBlockEditContext)();
    return (0, element_1.createElement)(components_1.Slot, { ...props, name: (0, get_name_1.getName)(name, clientId) });
}
