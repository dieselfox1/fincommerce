"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockIcon = BlockIcon;
/**
 * External dependencies
 */
const block_editor_1 = require("@wordpress/block-editor");
const data_1 = require("@wordpress/data");
const element_1 = require("@wordpress/element");
function BlockIcon({ clientId }) {
    const icon = (0, data_1.useSelect)((select) => {
        // Try to get the icon from the block's attributes
        const { getBlockAttributes, getBlockName } = select('core/block-editor');
        // @ts-expect-error Selector is not typed
        const attributes = getBlockAttributes(clientId);
        if (attributes?.icon) {
            return attributes.icon;
        }
        // If there is no icon defined in attributes
        // Then try to get icon from block's metadata
        const { getBlockType } = select('core/blocks');
        // @ts-expect-error Selector is not typed
        const blockName = getBlockName(clientId);
        // @ts-expect-error Selector is not typed
        const block = getBlockType(blockName ?? undefined);
        return block?.icon;
    }, [clientId]);
    if (!icon) {
        return null;
    }
    if (typeof icon === 'object') {
        const { src, ...iconProps } = icon;
        if (/^<(.)+>$/.test(src)) {
            const iconComponent = ((0, element_1.createElement)(element_1.RawHTML, { "aria-hidden": "true", ...iconProps }, src));
            return (0, element_1.createElement)(block_editor_1.BlockIcon, { icon: iconComponent, showColors: true });
        }
        if (/^https?:\/\/(.)+/.test(src)) {
            const iconImage = ((0, element_1.createElement)("img", { src: src, alt: "", "aria-hidden": "true", ...iconProps, height: 24, width: 24 }));
            return (0, element_1.createElement)(block_editor_1.BlockIcon, { icon: iconImage, showColors: true });
        }
    }
    return (0, element_1.createElement)(block_editor_1.BlockIcon, { icon: icon, showColors: true });
}
