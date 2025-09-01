/**
 * External dependencies
 */
import { dispatch } from '@wordpress/data';
import { CartResponse, ExtensionCartUpdateArgs } from '@fincommerce/types';
import { processErrorResponse } from '@fincommerce/block-data';

/**
 * Internal dependencies
 */
import { STORE_KEY } from '@fincommerce/block-library/assets/js/data/cart/constants';

/**
 * When executed, this will call the cart/extensions endpoint.
 * The args contains a namespace, so if that extension has registered an update
 * callback, it will be executed server-side and the new cart will be returned.
 * The new cart is then received into the client-side store.
 */
export const extensionCartUpdate = (
	args: ExtensionCartUpdateArgs
): Promise< CartResponse > => {
	const { applyExtensionCartUpdate } = dispatch( STORE_KEY );
	return applyExtensionCartUpdate( args ).catch( ( error ) => {
		if ( error?.code === 'fincommerce_rest_cart_extensions_error' ) {
			processErrorResponse( error );
		}
		return Promise.reject( error );
	} );
};
