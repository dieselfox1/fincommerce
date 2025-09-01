"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlocksHelper = useBlocksHelper;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
function useBlocksHelper() {
    function getClosestParentTabId(clientId) {
        const [closestParentClientId] = 
        // @ts-expect-error Outdated type definition.
        (0, data_1.select)('core/block-editor').getBlockParentsByBlockName(clientId, 'fincommerce/product-tab', true);
        if (!closestParentClientId) {
            return null;
        }
        // @ts-expect-error Outdated type definition.
        const { attributes } = (0, data_1.select)('core/block-editor').getBlock(closestParentClientId);
        return attributes?.id;
    }
    function getClientIdByField(field) {
        const parentBlockElement = field.closest('[data-block]');
        return parentBlockElement?.dataset.block;
    }
    function getParentTabId(clientId) {
        if (clientId) {
            return getClosestParentTabId(clientId);
        }
        return null;
    }
    function getParentTabIdByBlockName(blockName) {
        const blockClientIds = 
        // @ts-expect-error Outdated type definition.
        (0, data_1.select)('core/block-editor').getBlocksByName(blockName);
        if (blockClientIds.length) {
            return getClosestParentTabId(blockClientIds[0]);
        }
        return null;
    }
    return {
        getClientIdByField,
        getParentTabId,
        getParentTabIdByBlockName,
    };
}
