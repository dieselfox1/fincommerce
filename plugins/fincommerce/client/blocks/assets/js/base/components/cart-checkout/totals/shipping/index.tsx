/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { TotalsItem } from '@fincommerce/blocks-components';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import {
	hasSelectedShippingRate,
	getSelectedShippingRateNames,
} from '@fincommerce/base-utils';
import {
	useStoreCart,
	useOrderSummaryLoadingState,
} from '@fincommerce/base-context';

/**
 * Internal dependencies
 */
import { ShippingVia } from '@fincommerce/block-library/assets/js/base/components/cart-checkout/totals/shipping/shipping-via';
import { renderShippingTotalValue } from '@fincommerce/block-library/assets/js/base/components/cart-checkout/totals/shipping/utils';
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/totals/shipping/style.scss';

export interface TotalShippingProps {
	label?: string;
	placeholder?: React.ReactNode;
	collaterals?: React.ReactNode;
}

export const TotalsShipping = ( {
	label = __( 'Shipping', 'fincommerce' ),
	placeholder = null,
	collaterals = null,
}: TotalShippingProps ): JSX.Element | null => {
	const { cartTotals, shippingRates } = useStoreCart();
	const { isLoading } = useOrderSummaryLoadingState();
	const hasSelectedRates = hasSelectedShippingRate( shippingRates );
	const rateNames = getSelectedShippingRateNames( shippingRates );
	const hasMultipleRates = rateNames.length > 1;
	const rowLabel =
		! hasSelectedRates || hasMultipleRates ? label : rateNames[ 0 ];

	return (
		<div className="wc-block-components-totals-shipping">
			<TotalsItem
				label={ rowLabel }
				value={
					hasSelectedRates
						? renderShippingTotalValue( cartTotals )
						: placeholder
				}
				description={
					<>
						{ hasMultipleRates && <ShippingVia /> }
						{ collaterals && (
							<div className="wc-block-components-totals-shipping__collaterals">
								{ collaterals }
							</div>
						) }
					</>
				}
				currency={ getCurrencyFromPriceResponse( cartTotals ) }
				showSkeleton={ isLoading }
			/>
		</div>
	);
};

export default TotalsShipping;
