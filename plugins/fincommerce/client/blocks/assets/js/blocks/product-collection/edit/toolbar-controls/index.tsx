/**
 * External dependencies
 */
import { BlockControls } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import CollectionChooserToolbar from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/toolbar-controls/collection-chooser-toolbar';
import type { ProductCollectionContentProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { getCollectionByName } from '@fincommerce/block-library/assets/js/blocks/product-collection/collections';

export default function ToolbarControls(
	props: ProductCollectionContentProps
) {
	const { openCollectionSelectionModal } = props;

	const collection = getCollectionByName( props.attributes.collection );
	const showCollectionChooserToolbar =
		collection?.scope?.includes( 'block' ) ||
		collection?.scope === undefined;

	return (
		<BlockControls>
			{ showCollectionChooserToolbar && (
				<CollectionChooserToolbar
					openCollectionSelectionModal={
						openCollectionSelectionModal
					}
				/>
			) }
		</BlockControls>
	);
}
