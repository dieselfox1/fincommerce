/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { CollapsibleContent } from '@fincommerce/components';
import { createElement } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
export function Edit({ attributes, }) {
    const blockProps = useWooBlockProps(attributes);
    const { toggleText, initialCollapsed, persistRender = true } = attributes;
    return (createElement("div", { ...blockProps },
        createElement(CollapsibleContent, { toggleText: toggleText, initialCollapsed: initialCollapsed, persistRender: persistRender },
            createElement(InnerBlocks, { templateLock: "all" }))));
}
