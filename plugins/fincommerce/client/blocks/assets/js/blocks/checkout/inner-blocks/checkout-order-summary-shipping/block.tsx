/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TotalsShipping } from '@fincommerce/base-components/cart-checkout';
import { useStoreCart } from '@fincommerce/base-context';
import { TotalsWrapper } from '@fincommerce/blocks-checkout';
import { useSelect } from '@wordpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import {
	filterShippingRatesByPrefersCollection,
	hasAllFieldsForShippingRates,
	selectedRatesAreCollectable,
} from '@fincommerce/base-utils';

const Block = ( {
	className = '',
}: {
	className?: string;
} ): JSX.Element | null => {
	const { cartNeedsShipping, shippingRates, shippingAddress } =
		useStoreCart();
	const prefersCollection = useSelect( ( select ) =>
		select( checkoutStore ).prefersCollection()
	);

	if ( ! cartNeedsShipping ) {
		return null;
	}

	const hasSelectedCollectionOnly = selectedRatesAreCollectable(
		filterShippingRatesByPrefersCollection(
			shippingRates,
			prefersCollection ?? false
		)
	);

	const hasCompleteAddress = hasAllFieldsForShippingRates( shippingAddress );
	return (
		<TotalsWrapper className={ className }>
			<TotalsShipping
				label={
					hasSelectedCollectionOnly
						? __( 'Pickup', 'fincommerce' )
						: __( 'Delivery', 'fincommerce' )
				}
				placeholder={
					<span className="wc-block-components-shipping-placeholder__value">
						{ hasCompleteAddress
							? __(
									'No available delivery option',
									'fincommerce'
							  )
							: __(
									'Enter address to calculate',
									'fincommerce'
							  ) }
					</span>
				}
			/>
		</TotalsWrapper>
	);
};

export default Block;
