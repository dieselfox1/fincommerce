/**
 * External dependencies
 */
import { useBlockProps } from '@finpress/block-editor';
import type { BlockEditProps } from '@finpress/blocks';
import EditProductLink from '@fincommerce/editor-components/edit-product-link';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/editor.scss';
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/block';
import type { Attributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/sku/types';
import { useIsDescendentOfSingleProductTemplate } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/shared/use-is-descendent-of-single-product-template';

const Edit = ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< Attributes > & { context: Context } ): JSX.Element => {
	const { style, ...blockProps } = useBlockProps( {
		className:
			'wc-block-components-product-sku wp-block-fincommerce-product-sku',
	} );
	const blockAttrs = {
		...attributes,
		...context,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	let { isDescendentOfSingleProductTemplate } =
		useIsDescendentOfSingleProductTemplate();

	if ( isDescendentOfQueryLoop ) {
		isDescendentOfSingleProductTemplate = false;
	}

	return (
		<>
			<EditProductLink />
			<div
				{ ...blockProps }
				/**
				 * If block is a descendant of the All Products block, we don't
				 * want to apply style here because it will be applied inside
				 * Block using useColors, useTypography, and useSpacing hooks.
				 */
				style={
					attributes.isDescendantOfAllProducts ? undefined : style
				}
			>
				<Block
					{ ...blockAttrs }
					setAttributes={ setAttributes }
					isDescendentOfSingleProductTemplate={
						isDescendentOfSingleProductTemplate
					}
					isDescendantOfAllProducts={
						attributes.isDescendantOfAllProducts
					}
				/>
			</div>
		</>
	);
};

export default Edit;
