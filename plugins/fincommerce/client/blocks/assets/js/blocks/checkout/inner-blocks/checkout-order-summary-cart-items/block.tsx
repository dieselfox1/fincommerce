/**
 * External dependencies
 */
import { OrderSummary } from '@fincommerce/base-components/cart-checkout';
import { useStoreCart } from '@fincommerce/base-context/hooks';
import { TotalsWrapper } from '@fincommerce/blocks-components';

/**
 * Internal dependencies
 */
import { BlockAttributes } from '@fincommerce/block-library/assets/js/blocks/checkout/inner-blocks/checkout-order-summary-cart-items/edit';

const Block = ( {
	className = '',
	disableProductDescriptions = false,
}: BlockAttributes ): JSX.Element => {
	const { cartItems } = useStoreCart();

	return (
		<TotalsWrapper className={ className }>
			<OrderSummary
				cartItems={ cartItems }
				disableProductDescriptions={ disableProductDescriptions }
			/>
		</TotalsWrapper>
	);
};

export default Block;
