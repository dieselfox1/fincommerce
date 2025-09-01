/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { SortSelect } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/product-list/product-sort-select/style.scss';
import { ProductSortSelectProps } from '@fincommerce/block-library/assets/js/base/components/product-list/types';

const ProductSortSelect = ( {
	onChange,
	value,
}: ProductSortSelectProps ): JSX.Element => {
	return (
		<SortSelect
			className="wc-block-product-sort-select wc-block-components-product-sort-select"
			onChange={ onChange }
			options={ [
				{
					key: 'menu_order',
					label: __( 'Default sorting', 'fincommerce' ),
				},
				{
					key: 'popularity',
					label: __( 'Popularity', 'fincommerce' ),
				},
				{
					key: 'rating',
					label: __( 'Average rating', 'fincommerce' ),
				},
				{
					key: 'date',
					label: __( 'Latest', 'fincommerce' ),
				},
				{
					key: 'price',
					label: __( 'Price: low to high', 'fincommerce' ),
				},
				{
					key: 'price-desc',
					label: __( 'Price: high to low', 'fincommerce' ),
				},
			] }
			screenReaderLabel={ __( 'Order products by', 'fincommerce' ) }
			value={ value }
		/>
	);
};

export default ProductSortSelect;
