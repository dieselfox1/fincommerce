/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { useWooBlockProps } from '@fincommerce/block-templates';

/**
 * Internal dependencies
 */
import { BlockFill } from '../../../components/block-slot-fill';
import { ProductEditorBlockEditProps } from '../../../types';
import { SectionDescriptionBlockAttributes } from './types';

export function SectionDescriptionBlockEdit( {
	attributes,
}: ProductEditorBlockEditProps< SectionDescriptionBlockAttributes > ) {
	const { content } = attributes;
	const blockProps = useWooBlockProps( attributes );

	return (
		<BlockFill
			{ ...blockProps }
			name="section-description"
			slotContainerBlockName="fincommerce/product-section"
		>
			<div>{ content }</div>
		</BlockFill>
	);
}
