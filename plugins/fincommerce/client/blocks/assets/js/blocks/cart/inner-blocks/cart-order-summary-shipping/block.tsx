/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TotalsShipping } from '@fincommerce/base-components/cart-checkout';
import { useStoreCart } from '@fincommerce/base-context';
import { TotalsWrapper } from '@fincommerce/blocks-checkout';
import { hasSelectedShippingRate } from '@fincommerce/base-utils';

const Block = ( { className }: { className: string } ) => {
	const { cartNeedsShipping, shippingRates } = useStoreCart();

	if ( ! cartNeedsShipping ) {
		return null;
	}

	const hasSelectedRates = hasSelectedShippingRate( shippingRates );

	if ( ! hasSelectedRates ) {
		return null;
	}

	return (
		<TotalsWrapper className={ className }>
			<TotalsShipping
				label={ __( 'Shipping', 'fincommerce' ) }
				placeholder={
					<span className="wc-block-components-shipping-placeholder__value">
						{ __( 'Calculated at checkout', 'fincommerce' ) }
					</span>
				}
			/>
		</TotalsWrapper>
	);
};

export default Block;
