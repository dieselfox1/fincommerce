"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockFill = BlockFill;
/**
 * External dependencies
 */
const components_1 = require("@wordpress/components");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
const block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
const get_name_1 = require("./utils/get-name");
function BlockFill({ name, slotContainerBlockName, ...props }) {
    const { clientId } = (0, block_editor_1.useBlockEditContext)();
    const closestAncestorClientId = (0, data_1.useSelect)((select) => {
        const { getBlockParentsByBlockName } = select('core/block-editor');
        // @ts-expect-error Selector is not typed
        const [closestParentClientId] = getBlockParentsByBlockName(clientId, slotContainerBlockName, true);
        return closestParentClientId;
    }, [clientId, slotContainerBlockName]);
    if (!closestAncestorClientId) {
        // eslint-disable-next-line no-console
        console.warn('No closest ancestor client ID found for block fill.');
        return null;
    }
    return ((0, element_1.createElement)(components_1.Fill, { ...props, name: (0, get_name_1.getName)(name, closestAncestorClientId) }));
}
