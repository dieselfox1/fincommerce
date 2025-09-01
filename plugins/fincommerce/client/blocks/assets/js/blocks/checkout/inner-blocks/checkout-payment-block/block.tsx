/**
 * Internal dependencies
 */
import { PaymentMethods } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods';

const Block = ( {
	noPaymentMethods,
}: {
	noPaymentMethods?: JSX.Element | undefined;
} ): JSX.Element | null => {
	return <PaymentMethods noPaymentMethods={ noPaymentMethods } />;
};

export default Block;
