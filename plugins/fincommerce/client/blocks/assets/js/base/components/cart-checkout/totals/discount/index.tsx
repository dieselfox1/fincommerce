/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import LoadingMask from '@fincommerce/base-components/loading-mask';
import { RemovableChip, TotalsItem } from '@fincommerce/blocks-components';
import { applyCheckoutFilter } from '@fincommerce/blocks-checkout';
import { getSetting } from '@fincommerce/settings';
import {
	CartResponseCouponItemWithLabel,
	CartTotalsItem,
	Currency,
	LooselyMustHave,
} from '@fincommerce/types';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/base/components/cart-checkout/totals/discount/style.scss';

export interface TotalsDiscountProps {
	cartCoupons: LooselyMustHave<
		CartResponseCouponItemWithLabel,
		'code' | 'label' | 'totals'
	>[];
	currency: Currency;
	isRemovingCoupon: boolean;
	removeCoupon: ( couponCode: string ) => void;
	values: LooselyMustHave<
		CartTotalsItem,
		'total_discount' | 'total_discount_tax'
	>;
	isLoading?: boolean;
}

const filteredCartCouponsFilterArg = {
	context: 'summary',
};

const TotalsDiscount = ( {
	cartCoupons = [],
	currency,
	isRemovingCoupon,
	removeCoupon,
	values,
	isLoading,
}: TotalsDiscountProps ): JSX.Element | null => {
	const {
		total_discount: totalDiscount,
		total_discount_tax: totalDiscountTax,
	} = values;
	const discountValue = parseInt( totalDiscount, 10 );

	const filteredCartCoupons = applyCheckoutFilter( {
		arg: filteredCartCouponsFilterArg,
		filterName: 'coupons',
		defaultValue: cartCoupons,
	} );

	if ( ! discountValue && filteredCartCoupons.length === 0 ) {
		return null;
	}

	const discountTaxValue = parseInt( totalDiscountTax, 10 );
	const discountTotalValue = getSetting(
		'displayCartPricesIncludingTax',
		false
	)
		? discountValue + discountTaxValue
		: discountValue;

	return (
		<TotalsItem
			className="wc-block-components-totals-discount"
			currency={ currency }
			description={
				filteredCartCoupons.length !== 0 && (
					<LoadingMask
						screenReaderLabel={ __(
							'Removing coupon…',
							'fincommerce'
						) }
						isLoading={ isRemovingCoupon }
						showSpinner={ false }
					>
						<ul className="wc-block-components-totals-discount__coupon-list">
							{ filteredCartCoupons.map( ( cartCoupon ) => {
								return (
									<RemovableChip
										key={ 'coupon-' + cartCoupon.code }
										className="wc-block-components-totals-discount__coupon-list-item"
										text={ cartCoupon.label }
										screenReaderText={ sprintf(
											/* translators: %s Coupon code. */
											__( 'Coupon: %s', 'fincommerce' ),
											cartCoupon.label
										) }
										disabled={ isRemovingCoupon }
										onRemove={ () => {
											removeCoupon( cartCoupon.code );
										} }
										radius="large"
										ariaLabel={ sprintf(
											/* translators: %s is a coupon code. */
											__(
												'Remove coupon "%s"',
												'fincommerce'
											),
											cartCoupon.label
										) }
									/>
								);
							} ) }
						</ul>
					</LoadingMask>
				)
			}
			label={
				!! discountTotalValue
					? __( 'Discount', 'fincommerce' )
					: __( 'Coupons', 'fincommerce' )
			}
			value={ discountTotalValue ? discountTotalValue * -1 : '-' }
			showSkeleton={ isLoading }
		/>
	);
};

export default TotalsDiscount;
