/**
 * External dependencies
 */
import { getValidBlockAttributes } from '@fincommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/block';
import { ExpressPaymentContext } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment/express-payment-context';
import metadata from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-express-payment-block/block.json';
import { ExpressCheckoutAttributes } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/types';

const FrontendBlock = ( attributes: ExpressCheckoutAttributes ) => {
	const validAttributes = getValidBlockAttributes(
		metadata.attributes,
		attributes
	);

	const { showButtonStyles, buttonHeight, buttonBorderRadius } =
		validAttributes;

	return (
		<ExpressPaymentContext.Provider
			value={ { showButtonStyles, buttonHeight, buttonBorderRadius } }
		>
			<Block />
		</ExpressPaymentContext.Provider>
	);
};

export default FrontendBlock;
