/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	formatShippingAddress,
	hasShippingRate,
	hasAllFieldsForShippingRates,
} from '@fincommerce/base-utils';
import { useStoreCart } from '@fincommerce/base-context';
import {
	ShippingCalculatorPanel,
	ShippingCalculatorContext,
} from '@fincommerce/base-components/cart-checkout';
import { useSelect } from '@finpress/data';
import { checkoutStore } from '@fincommerce/block-data';
import { createInterpolateElement, useContext } from '@finpress/element';
import { getSetting } from '@fincommerce/settings';

/**
 * Internal dependencies
 */
import { getPickupLocation } from '@fincommerce/block-library/assets/js/base/components/cart-checkout/totals/shipping/utils';

export const ShippingAddress = (): JSX.Element => {
	const { shippingRates, shippingAddress } = useStoreCart();
	const prefersCollection = useSelect( ( select ) =>
		select( checkoutStore ).prefersCollection()
	);

	const hasRates = hasShippingRate( shippingRates );

	const { showCalculator } = useContext( ShippingCalculatorContext );

	const formattedAddress = prefersCollection
		? getPickupLocation( shippingRates )
		: formatShippingAddress( shippingAddress );

	const deliversToLabel = hasRates
		? // Translators: <address/> is the formatted shipping address.
		  __( 'Delivers to <address/>', 'fincommerce' )
		: // Translators: <address/> is the formatted shipping address.
		  __( 'No delivery options available for <address/>', 'fincommerce' );

	const addressComplete = hasAllFieldsForShippingRates( shippingAddress );

	const shippingCostRequiresAddress = getSetting< boolean >(
		'shippingCostRequiresAddress',
		false
	);

	const showEnterAddressMessage =
		shippingCostRequiresAddress && ! addressComplete;

	const addressLabel = prefersCollection
		? // Translators: <address/> is the pickup location.
		  __( 'Collection from <address/>', 'fincommerce' )
		: deliversToLabel;

	const title = (
		<p className="wc-block-components-totals-shipping-address-summary">
			{ !! formattedAddress && ! showEnterAddressMessage ? (
				createInterpolateElement( addressLabel, {
					address: <strong>{ formattedAddress }</strong>,
				} )
			) : (
				<>
					{ __(
						'Enter address to check delivery options',
						'fincommerce'
					) }
				</>
			) }
		</p>
	);

	return (
		<div className="wc-block-components-shipping-address">
			{ showCalculator && <ShippingCalculatorPanel title={ title } /> }
		</div>
	);
};

export default ShippingAddress;
