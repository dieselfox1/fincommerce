/**
 * External dependencies
 */
import { decodeEntities } from '@finpress/html-entities';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import { FormattedMonetaryAmount } from '@fincommerce/blocks-components';
import type { PackageRateOption } from '@fincommerce/types';
import { getSetting } from '@fincommerce/settings';
import { CartShippingPackageShippingRate } from '@fincommerce/types';
import { __ } from '@finpress/i18n';

/**
 * Default render function for package rate options.
 *
 * @param {Object} rate Rate data.
 */
export const renderPackageRateOption = (
	rate: CartShippingPackageShippingRate
): PackageRateOption => {
	const priceWithTaxes: number = getSetting(
		'displayCartPricesIncludingTax',
		false
	)
		? parseInt( rate.price, 10 ) + parseInt( rate.taxes, 10 )
		: parseInt( rate.price, 10 );

	let description = (
		<>
			{ Number.isFinite( priceWithTaxes ) && (
				<FormattedMonetaryAmount
					currency={ getCurrencyFromPriceResponse( rate ) }
					value={ priceWithTaxes }
				/>
			) }
			<span className="wc-block-components-shipping-rates-control__package__delivery_time">
				{ Number.isFinite( priceWithTaxes ) && rate.delivery_time
					? ' — '
					: null }
				{ decodeEntities( rate.delivery_time ) }
			</span>
		</>
	);

	if ( priceWithTaxes === 0 ) {
		description = (
			<span className="wc-block-components-shipping-rates-control__package__description--free">
				{ __( 'Free', 'fincommerce' ) }
				<span className="wc-block-components-shipping-rates-control__package__delivery_time">
					{ rate.delivery_time &&
						' — ' + decodeEntities( rate.delivery_time ) }
				</span>
			</span>
		);
	}

	return {
		label: decodeEntities( rate.name ),
		value: rate.rate_id,
		description,
	};
};

export default renderPackageRateOption;
