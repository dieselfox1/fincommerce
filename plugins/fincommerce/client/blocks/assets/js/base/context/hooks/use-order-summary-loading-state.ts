/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { checkoutStore } from '@fincommerce/block-data';

/**
 * Internal dependencies
 */
import { useStoreCart } from '@fincommerce/block-library/assets/js/base/context/hooks/cart/use-store-cart';
import { useStoreCartCoupons } from '@fincommerce/block-library/assets/js/base/context/hooks/cart/use-store-cart-coupons';

/**
 * Custom hook that provides comprehensive loading states for Order Summary components.
 * This hook combines various loading states that can affect order totals and pricing.
 */
export const useOrderSummaryLoadingState = () => {
	const { cartIsLoading, isLoadingRates, hasPendingItemsOperations } =
		useStoreCart();
	const { isApplyingCoupon, isRemovingCoupon } = useStoreCartCoupons();

	const isCalculating = useSelect(
		( select ) => select( checkoutStore ).isCalculating(),
		[]
	);

	// Determine if any loading state is active
	const isLoading =
		cartIsLoading ||
		isLoadingRates ||
		isApplyingCoupon ||
		isRemovingCoupon ||
		isCalculating ||
		hasPendingItemsOperations;

	return {
		// Combined loading state - true if any operation is in progress
		isLoading,
	};
};
