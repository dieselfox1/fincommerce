/**
 * External dependencies
 */
import { useStoreCart } from '@fincommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import { CheckoutExpressPayment } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods';

const Block = ( { className }: { className?: string } ): JSX.Element | null => {
	const { cartNeedsPayment } = useStoreCart();
	if ( ! cartNeedsPayment ) {
		return null;
	}

	return (
		<div className={ className }>
			<CheckoutExpressPayment />
		</div>
	);
};

export default Block;
