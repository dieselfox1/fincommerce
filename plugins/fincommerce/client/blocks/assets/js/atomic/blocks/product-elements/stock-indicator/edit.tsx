/**
 * External dependencies
 */
import EditProductLink from '@fincommerce/editor-components/edit-product-link';
import { useBlockProps } from '@finpress/block-editor';
import type { BlockEditProps } from '@finpress/blocks';
import { ProductQueryContext as Context } from '@fincommerce/blocks/product-query/types';
import { useEffect } from '@finpress/element';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/stock-indicator/block';
import type { BlockAttributes } from '@fincommerce/block-library/assets/js/atomic/blocks/product-elements/stock-indicator/types';

const Edit = ( {
	attributes,
	setAttributes,
	context,
}: BlockEditProps< BlockAttributes > & { context: Context } ): JSX.Element => {
	const { style, ...blockProps } = useBlockProps( {
		className: 'wc-block-components-product-stock-indicator',
	} );

	const blockAttrs = {
		...attributes,
		...context,
	};
	const isDescendentOfQueryLoop = Number.isFinite( context.queryId );

	useEffect(
		() => setAttributes( { isDescendentOfQueryLoop } ),
		[ setAttributes, isDescendentOfQueryLoop ]
	);

	return (
		<div
			{ ...blockProps }
			/**
			 * If block is a descendant of the All Products block, we don't
			 * want to apply style here because it will be applied inside
			 * Block using useColors, useTypography, and useSpacing hooks.
			 */
			style={ attributes.isDescendantOfAllProducts ? undefined : style }
		>
			<EditProductLink />
			<Block { ...blockAttrs } />
		</div>
	);
};

const StockIndicatorEdit: React.FC<
	BlockEditProps< BlockAttributes > & { context: Context }
> = ( props ) => {
	return <Edit { ...props } />;
};

export default StockIndicatorEdit;
