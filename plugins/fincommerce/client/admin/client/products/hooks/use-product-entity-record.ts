/**
 * External dependencies
 */
import { AUTO_DRAFT_NAME } from '@fincommerce/product-editor';
import { type Product } from '@fincommerce/data';
import { store as coreStore } from '@finpress/core-data';
import { dispatch } from '@finpress/data';
import { useEffect, useState } from '@finpress/element';

export function useProductEntityRecord(
	productId: string | undefined
): number | undefined {
	const [ id, setId ] = useState< number | undefined >( undefined );

	useEffect( () => {
		if ( productId ) {
			setId( Number.parseInt( productId, 10 ) );
			return;
		}

		const createProductPromise = dispatch( coreStore ).saveEntityRecord(
			'postType',
			'product',
			{
				title: AUTO_DRAFT_NAME,
				status: 'auto-draft',
			}
		) as never as Promise< Product >;

		createProductPromise
			.then( ( autoDraftProduct: Product ) =>
				setId( autoDraftProduct.id )
			)
			.catch( ( e ) => {
				setId( undefined );
				throw e;
			} );
	}, [ productId ] );

	return id;
}
