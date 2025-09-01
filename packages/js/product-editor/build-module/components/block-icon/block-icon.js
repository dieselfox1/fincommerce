/**
 * External dependencies
 */
import { BlockIcon as BaseBlockIcon } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { createElement, RawHTML } from '@wordpress/element';
export function BlockIcon({ clientId }) {
    const icon = useSelect((select) => {
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
            const iconComponent = (createElement(RawHTML, { "aria-hidden": "true", ...iconProps }, src));
            return createElement(BaseBlockIcon, { icon: iconComponent, showColors: true });
        }
        if (/^https?:\/\/(.)+/.test(src)) {
            const iconImage = (createElement("img", { src: src, alt: "", "aria-hidden": "true", ...iconProps, height: 24, width: 24 }));
            return createElement(BaseBlockIcon, { icon: iconImage, showColors: true });
        }
    }
    return createElement(BaseBlockIcon, { icon: icon, showColors: true });
}
