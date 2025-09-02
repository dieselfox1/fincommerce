/**
 * External dependencies
 */
import { store as coreStore } from '@finpress/core-data';
import { dispatch } from '@finpress/data';

/**
 * Internal dependencies
 */
import { PRODUCT_ENTITY } from '@fincommerce/block-library/assets/js/entities/product/constants';

const registered: string[] = [];

export const registerProductEntity = () => {
	if ( registered.includes( PRODUCT_ENTITY.name ) ) {
		return;
	}
	const { addEntities } = dispatch( coreStore );
	addEntities( [ PRODUCT_ENTITY ] );
	registered.push( PRODUCT_ENTITY.name );
};
