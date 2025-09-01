/**
 * Internal dependencies
 */
import mustContain from '@fincommerce/block-library/packages/checkout/utils/validation/must-contain';

export const productPriceValidation = ( value: string ) =>
	mustContain( value, '<price/>' );
