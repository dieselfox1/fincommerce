/**
 * External dependencies
 */
import { TotalsCoupon } from '@fincommerce/base-components/cart-checkout';
import { useStoreCartCoupons } from '@fincommerce/base-context/hooks';
import { getSetting } from '@fincommerce/settings';
import { TotalsWrapper } from '@fincommerce/blocks-components';

const Block = ( { className }: { className: string } ): JSX.Element | null => {
	const couponsEnabled = getSetting( 'couponsEnabled', true );

	const { applyCoupon, isApplyingCoupon } = useStoreCartCoupons( 'wc/cart' );

	if ( ! couponsEnabled ) {
		return null;
	}

	return (
		<TotalsWrapper className={ className }>
			<TotalsCoupon
				onSubmit={ applyCoupon }
				isLoading={ isApplyingCoupon }
				instanceId="coupon"
			/>
		</TotalsWrapper>
	);
};

export default Block;
