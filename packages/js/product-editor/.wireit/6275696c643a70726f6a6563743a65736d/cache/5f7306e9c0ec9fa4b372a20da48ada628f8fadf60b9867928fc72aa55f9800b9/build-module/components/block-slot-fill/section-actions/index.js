/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { BlockFill } from '../block-fill';
const DEFAULT_SECTION_BLOCKS = [
    'fincommerce/product-section',
    'fincommerce/product-subsection',
];
export function SectionActions({ containerBlockName = DEFAULT_SECTION_BLOCKS, ...restProps }) {
    return (createElement(BlockFill, { ...restProps, name: "section-actions", slotContainerBlockName: containerBlockName }));
}
