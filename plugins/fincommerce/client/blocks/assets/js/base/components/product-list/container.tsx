/**
 * External dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import type { HTMLElementEvent } from '@fincommerce/types';

/**
 * Internal dependencies
 */
import ProductList from '@fincommerce/block-library/assets/js/base/components/product-list/product-list';
import { ProductListContainerProps } from '@fincommerce/block-library/assets/js/base/components/product-list/types';

const ProductListContainer = ( {
	attributes,
}: ProductListContainerProps ): JSX.Element => {
	const [ currentPage, setPage ] = useState( 1 );
	const [ currentSort, setSort ] = useState( attributes.orderby );
	useEffect( () => {
		// if default sort is changed in editor
		setSort( attributes.orderby );
	}, [ attributes.orderby ] );
	const onPageChange = ( newPage: number ) => {
		setPage( newPage );
	};
	const onSortChange = ( event: HTMLElementEvent< HTMLSelectElement > ) => {
		const newSortValue = event?.target?.value;
		setSort( newSortValue );
		setPage( 1 );
	};

	return (
		<ProductList
			attributes={ attributes }
			currentPage={ currentPage }
			onPageChange={ onPageChange }
			onSortChange={ onSortChange }
			sortValue={ currentSort }
		/>
	);
};

export default ProductListContainer;
