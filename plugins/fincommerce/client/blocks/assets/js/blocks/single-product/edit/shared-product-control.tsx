/**
 * External dependencies
 */
import ProductControl from '@fincommerce/editor-components/product-control';

/**
 * Internal dependencies
 */
import { Attributes } from '@fincommerce/block-library/assets/js/blocks/single-product/types';

interface SharedProductControlProps {
	attributes: Attributes;
	setAttributes: ( attributes: Attributes ) => void;
	onChange?: ( () => void ) | undefined;
}

const SharedProductControl = ( {
	attributes,
	setAttributes,
	onChange,
}: SharedProductControlProps ) => (
	<ProductControl
		selected={ attributes.productId || 0 }
		showVariations
		onChange={ ( value = [] ) => {
			const id = value[ 0 ] ? value[ 0 ].id : 0;
			setAttributes( {
				productId: id,
			} );
			if ( onChange ) {
				onChange();
			}
		} }
	/>
);

export default SharedProductControl;
