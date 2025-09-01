/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Entity } from '@fincommerce/block-library/assets/js/entities/types';
import { ProductEntityResponse } from '@fincommerce/block-library/assets/js/entities/product/types';

export const PRODUCT_ENTITY: Entity = {
	name: 'product',
	kind: 'root',
	baseURL: '/wc/v3/products',
	label: __( 'Product', 'fincommerce' ),
	plural: __( 'Products', 'fincommerce' ),
	key: 'id',
	supportsPagination: true,
	getTitle: ( record ) => {
		const recordData = record as ProductEntityResponse;
		return recordData.name;
	},
};
