/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { SelectControl } from '@finpress/components';

/**
 * Internal dependencies
 */
import type { ProductOrderbyControlProps } from '@fincommerce/block-library/assets/js/editor-components/product-orderby-control/types';

/**
 * A pre-configured SelectControl for product orderby settings.
 *
 * @param {Object}            props               Incoming props for the component.
 * @param {string}            props.value
 * @param {function(any):any} props.setAttributes Setter for block attributes.
 */
const ProductOrderbyControl = ( {
	value,
	setAttributes,
}: ProductOrderbyControlProps ) => {
	return (
		<SelectControl
			label={ __( 'Order products by', 'fincommerce' ) }
			value={ value }
			options={ [
				{
					label: __( 'Newness - newest first', 'fincommerce' ),
					value: 'date',
				},
				{
					label: __( 'Price - low to high', 'fincommerce' ),
					value: 'price_asc',
				},
				{
					label: __( 'Price - high to low', 'fincommerce' ),
					value: 'price_desc',
				},
				{
					label: __( 'Rating - highest first', 'fincommerce' ),
					value: 'rating',
				},
				{
					label: __( 'Sales - most first', 'fincommerce' ),
					value: 'popularity',
				},
				{
					label: __( 'Title - alphabetical', 'fincommerce' ),
					value: 'title',
				},
				{
					label: __( 'Menu Order', 'fincommerce' ),
					value: 'menu_order',
				},
			] }
			onChange={ ( orderby ) => setAttributes( { orderby } ) }
		/>
	);
};

export default ProductOrderbyControl;
