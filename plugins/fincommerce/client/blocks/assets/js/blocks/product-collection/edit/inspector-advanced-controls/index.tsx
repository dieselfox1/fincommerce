/**
 * External dependencies
 */
import { InspectorAdvancedControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import ForcePageReloadControl from '@fincommerce/block-library/assets/js/blocks/product-collection/edit/inspector-advanced-controls/force-page-reload-control';
import type { ProductCollectionContentProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';

export default function ProductCollectionAdvancedInspectorControls(
	props: ProductCollectionContentProps
) {
	const { clientId, attributes, setAttributes } = props;
	const { forcePageReload } = attributes;

	return (
		<InspectorAdvancedControls>
			<ForcePageReloadControl
				clientId={ clientId }
				forcePageReload={ forcePageReload }
				setAttributes={ setAttributes }
			/>
		</InspectorAdvancedControls>
	);
}
