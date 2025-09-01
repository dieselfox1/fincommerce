/**
 * Internal dependencies
 */
import { shippingErrorCodes } from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/shipping/constants';

export const hasInvalidShippingAddress = ( errors ) => {
	return errors.some( ( error ) => {
		if (
			error.code &&
			Object.values( shippingErrorCodes ).includes( error.code )
		) {
			return true;
		}
		return false;
	} );
};
