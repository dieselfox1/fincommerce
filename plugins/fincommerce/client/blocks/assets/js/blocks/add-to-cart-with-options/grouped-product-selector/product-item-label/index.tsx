/**
 * External dependencies
 */
import { registerBlockType } from '@finpress/blocks';
import { heading } from '@finpress/icons';
import { useBlockProps } from '@finpress/block-editor';
import type { BlockConfiguration } from '@finpress/blocks';
import { useProductDataContext } from '@fincommerce/shared-context';
import { Spinner } from '@finpress/components';

/**
 * Internal dependencies
 */
import metadata from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/grouped-product-selector/product-item-label/block.json';

registerBlockType( metadata.name, {
	...metadata,
	edit: function Edit() {
		const blockProps = useBlockProps();
		const { isLoading, product } = useProductDataContext();

		if ( isLoading ) {
			return <Spinner />;
		}
		return (
			<div { ...blockProps }>
				<div className="wp-block-fincommerce-add-to-cart-with-options-grouped-product-item-label">
					{ product.name }
				</div>
			</div>
		);
	},
	icon: heading,
	save: () => null,
} as unknown as BlockConfiguration );
