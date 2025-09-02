/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import {
	useCustomerData,
	useShippingData,
} from '@fincommerce/base-context/hooks';
import { ShippingRatesControl } from '@fincommerce/base-components/cart-checkout';
import {
	getShippingRatesPackageCount,
	hasCollectableRate,
	hasAllFieldsForShippingRates,
} from '@fincommerce/base-utils';
import { getCurrencyFromPriceResponse } from '@fincommerce/price-format';
import {
	FormattedMonetaryAmount,
	StoreNoticesContainer,
} from '@fincommerce/blocks-components';
import { useEditorContext, noticeContexts } from '@fincommerce/base-context';
import { decodeEntities } from '@finpress/html-entities';
import { getSetting } from '@fincommerce/settings';
import type {
	PackageRateOption,
	CartShippingPackageShippingRate,
} from '@fincommerce/types';
import NoticeBanner from '@fincommerce/base-components/notice-banner';
import type { ReactElement } from 'react';
import { useMemo } from '@finpress/element';

/**
 * Renders a shipping rate control option.
 *
 * @param {Object} option Shipping Rate.
 */
const renderShippingRatesControlOption = (
	option: CartShippingPackageShippingRate
): PackageRateOption => {
	const priceWithTaxes = getSetting( 'displayCartPricesIncludingTax', false )
		? parseInt( option.price, 10 ) + parseInt( option.taxes, 10 )
		: parseInt( option.price, 10 );

	const secondaryLabel =
		priceWithTaxes === 0 ? (
			<span className="wc-block-checkout__shipping-option--free">
				{ __( 'Free', 'fincommerce' ) }
			</span>
		) : (
			<FormattedMonetaryAmount
				currency={ getCurrencyFromPriceResponse( option ) }
				value={ priceWithTaxes }
			/>
		);

	return {
		label: decodeEntities( option.name ),
		value: option.rate_id,
		description: decodeEntities( option.delivery_time ),
		secondaryLabel,
		secondaryDescription: decodeEntities( option.description ),
	};
};

const NoShippingAddressMessage = () => {
	return (
		<p
			role="status"
			aria-live="polite"
			className="wc-block-components-shipping-rates-control__no-shipping-address-message"
		>
			{ __(
				'Enter a shipping address to view shipping options.',
				'fincommerce'
			) }
		</p>
	);
};

const Block = ( {
	noShippingPlaceholder = null,
}: {
	noShippingPlaceholder?: ReactElement | null;
} ) => {
	const { isEditor } = useEditorContext();

	const {
		shippingRates,
		needsShipping,
		isLoadingRates,
		hasCalculatedShipping,
		isCollectable,
	} = useShippingData();

	const { shippingAddress } = useCustomerData();

	const filteredShippingRates = useMemo( () => {
		return isCollectable
			? shippingRates.map( ( shippingRatesPackage ) => {
					return {
						...shippingRatesPackage,
						shipping_rates:
							shippingRatesPackage.shipping_rates.filter(
								( shippingRatesPackageRate ) =>
									! hasCollectableRate(
										shippingRatesPackageRate.method_id
									)
							),
					};
			  } )
			: shippingRates;
	}, [ shippingRates, isCollectable ] );

	if ( ! needsShipping ) {
		return null;
	}

	const shippingRatesPackageCount =
		getShippingRatesPackageCount( shippingRates );

	if ( ! hasCalculatedShipping && ! shippingRatesPackageCount ) {
		return <NoShippingAddressMessage />;
	}
	const addressComplete = hasAllFieldsForShippingRates( shippingAddress );

	return (
		<>
			<StoreNoticesContainer
				context={ noticeContexts.SHIPPING_METHODS }
			/>
			{ isEditor && ! shippingRatesPackageCount ? (
				noShippingPlaceholder
			) : (
				<ShippingRatesControl
					noResultsMessage={
						<>
							{ addressComplete ? (
								<NoticeBanner
									isDismissible={ false }
									className="wc-block-components-shipping-rates-control__no-results-notice"
									status="warning"
								>
									{ __(
										'No shipping options are available for this address. Please verify the address is correct or try a different address.',
										'fincommerce'
									) }
								</NoticeBanner>
							) : (
								<NoShippingAddressMessage />
							) }
						</>
					}
					renderOption={ renderShippingRatesControlOption }
					collapsible={ false }
					shippingRates={ filteredShippingRates }
					isLoadingRates={ isLoadingRates }
					context="fincommerce/checkout"
				/>
			) }
		</>
	);
};

export default Block;
