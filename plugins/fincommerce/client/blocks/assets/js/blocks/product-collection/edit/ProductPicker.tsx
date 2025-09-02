/**
 * External dependencies
 */
import { __, sprintf } from '@finpress/i18n';
import { Icon, info } from '@finpress/icons';
import ProductControl from '@fincommerce/editor-components/product-control';
import type { SelectedOption } from '@fincommerce/block-hocs';
import { createInterpolateElement } from '@finpress/element';
import {
	Placeholder,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@finpress/components';
import { useBlockProps } from '@finpress/block-editor';

/**
 * Internal dependencies
 */
import type { ProductCollectionEditComponentProps } from '@fincommerce/block-library/assets/js/blocks/product-collection/types';
import { getCollectionByName } from '@fincommerce/block-library/assets/js/blocks/product-collection/collections';

const ProductPicker = (
	props: ProductCollectionEditComponentProps & {
		isDeletedProductReference: boolean;
	}
) => {
	const { attributes, isDeletedProductReference } = props;

	const blockProps = useBlockProps();

	const collection = getCollectionByName( attributes.collection );
	if ( ! collection ) {
		return null;
	}

	const infoText = isDeletedProductReference
		? __(
				'Previously selected product is no longer available.',
				'fincommerce'
		  )
		: createInterpolateElement(
				sprintf(
					/* translators: %s: collection title */
					__(
						'<strong>%s</strong> requires a product to be selected in order to display associated items.',
						'fincommerce'
					),
					collection.title
				),
				{ strong: <strong /> }
		  );

	return (
		<div { ...blockProps }>
			<Placeholder className="wc-blocks-product-collection__editor-product-picker">
				<HStack alignment="center">
					<Icon
						icon={ info }
						className="wc-blocks-product-collection__info-icon"
					/>
					<Text>{ infoText }</Text>
				</HStack>
				<ProductControl
					selected={
						attributes.query?.productReference as SelectedOption
					}
					onChange={ ( value = [] ) => {
						const isValidId = ( value[ 0 ]?.id ?? null ) !== null;
						if ( isValidId ) {
							props.setAttributes( {
								query: {
									...attributes.query,
									productReference: value[ 0 ].id,
								},
							} );
						}
					} }
					messages={ {
						search: __( 'Select a product', 'fincommerce' ),
					} }
				/>
			</Placeholder>
		</div>
	);
};

export default ProductPicker;
