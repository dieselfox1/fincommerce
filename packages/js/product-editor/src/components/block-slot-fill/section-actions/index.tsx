/**
 * External dependencies
 */
import { createElement } from '@finpress/element';

/**
 * Internal dependencies
 */
import { BlockFill } from '../block-fill';
import { BlockFillProps } from '../types';

export type SectionActionsProps = Omit<
	BlockFillProps,
	'name' | 'slotContainerBlockName'
> & {
	containerBlockName?: string | string[];
};

const DEFAULT_SECTION_BLOCKS = [
	'fincommerce/product-section',
	'fincommerce/product-subsection',
];

export function SectionActions( {
	containerBlockName = DEFAULT_SECTION_BLOCKS,
	...restProps
}: SectionActionsProps ) {
	return (
		<BlockFill
			{ ...restProps }
			name="section-actions"
			slotContainerBlockName={ containerBlockName }
		/>
	);
}
