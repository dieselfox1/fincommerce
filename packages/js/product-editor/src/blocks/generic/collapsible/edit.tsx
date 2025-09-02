/**
 * External dependencies
 */
import { useWooBlockProps } from '@fincommerce/block-templates';
import { CollapsibleContent } from '@fincommerce/components';
import type { BlockAttributes } from '@finpress/blocks';
import { createElement } from '@finpress/element';
import { InnerBlocks } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import { ProductEditorBlockEditProps } from '../../../types';

export function Edit( {
	attributes,
}: ProductEditorBlockEditProps< BlockAttributes > ) {
	const blockProps = useWooBlockProps( attributes );
	const { toggleText, initialCollapsed, persistRender = true } = attributes;

	return (
		<div { ...blockProps }>
			<CollapsibleContent
				toggleText={ toggleText }
				initialCollapsed={ initialCollapsed }
				persistRender={ persistRender }
			>
				<InnerBlocks templateLock="all" />
			</CollapsibleContent>
		</div>
	);
}
