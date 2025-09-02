/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { useEffect } from '@finpress/element';
import { BlockEditProps } from '@finpress/blocks';

import { Disabled } from '@finpress/components';
import { ProductShortDescriptionSkeleton } from '@fincommerce/base-components/skeleton/patterns/product-short-description';
import { useProductDataContext } from '@fincommerce/shared-context';
import {
	BlockControls,
	InspectorControls,
	useBlockProps,
} from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import ToolbarProductTypeGroup from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/components/toolbar-type-product-selector-group';
import { DowngradeNotice } from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/components/downgrade-notice';
import { useProductTypeSelector } from '@fincommerce/block-library/assets/js/shared/stores/product-type-template-state';
import type { Attributes } from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/types';
import { AddToCartWithOptionsEditTemplatePart } from '@fincommerce/block-library/assets/js/blocks/add-to-cart-with-options/edit/edit-template-part';

const AddToCartOptionsEdit = ( props: BlockEditProps< Attributes > ) => {
	const { product } = useProductDataContext();

	const blockProps = useBlockProps();
	const blockClientId = blockProps?.id;

	const {
		current: currentProductType,
		registerListener,
		unregisterListener,
	} = useProductTypeSelector();

	useEffect( () => {
		registerListener( blockClientId );
		return () => {
			unregisterListener( blockClientId );
		};
	}, [ blockClientId, registerListener, unregisterListener ] );

	const productType =
		product.id === 0 ? currentProductType?.slug : product.type;
	const isCoreProductType =
		productType &&
		[ 'simple', 'variable', 'external', 'grouped' ].includes( productType );

	return (
		<>
			<InspectorControls>
				<DowngradeNotice blockClientId={ props?.clientId } />
			</InspectorControls>
			<BlockControls>
				<ToolbarProductTypeGroup />
			</BlockControls>
			{ isCoreProductType ? (
				<AddToCartWithOptionsEditTemplatePart
					productType={ productType }
				/>
			) : (
				<div { ...blockProps }>
					<div className="wp-block-fincommerce-add-to-cart-with-options__skeleton-wrapper">
						<ProductShortDescriptionSkeleton />
					</div>
					<Disabled>
						<button
							className={ `alt wp-element-button ${ productType }_add_to_cart_button` }
						>
							{ __( 'Add to cart', 'fincommerce' ) }
						</button>
					</Disabled>
				</div>
			) }
		</>
	);
};

export default AddToCartOptionsEdit;
