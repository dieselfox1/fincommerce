/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';
/**
 * Internal dependencies
 */
import { BlockFill } from '../../../components/block-slot-fill';
export function SubsectionDescriptionBlockEdit({ attributes, }) {
    const { content } = attributes;
    const blockProps = useWooBlockProps(attributes);
    return (createElement(BlockFill, { ...blockProps, name: "section-description", slotContainerBlockName: "fincommerce/product-subsection" },
        createElement("div", null, content)));
}
