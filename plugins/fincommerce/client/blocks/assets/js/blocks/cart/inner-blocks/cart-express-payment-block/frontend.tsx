/**
 * External dependencies
 */
import { getValidBlockAttributes } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/block';
import { ExpressPaymentContext } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment/express-payment-context';
import metadata from '@fincommerce/block-library/assets/js/blocks/cart/inner-blocks/cart-express-payment-block/block.json';
import { ExpressCheckoutAttributes } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/types';

const FrontendBlock = ( attributes: ExpressCheckoutAttributes ) => {
	const validAttributes = getValidBlockAttributes(
		metadata.attributes,
		attributes
	);

	const { showButtonStyles, buttonHeight, buttonBorderRadius, className } =
		validAttributes;

	return (
		<ExpressPaymentContext.Provider
			value={ { showButtonStyles, buttonHeight, buttonBorderRadius } }
		>
			<Block className={ className } />
		</ExpressPaymentContext.Provider>
	);
};

export default FrontendBlock;
