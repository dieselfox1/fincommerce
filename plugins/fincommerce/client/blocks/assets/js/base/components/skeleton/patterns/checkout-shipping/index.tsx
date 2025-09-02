/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';

/**
 * Internal dependencies
 */
import { Skeleton } from '@fincommerce/block-library/assets/js/base/components/skeleton';
import '@fincommerce/block-library/assets/js/base/components/skeleton/patterns/checkout-shipping/style.scss';

export const CheckoutShippingSkeleton = () => {
	return (
		<div
			className="wc-block-components-skeleton wc-block-components-skeleton--checkout-shipping"
			aria-live="polite"
			aria-label={ __( 'Loading shipping options…', 'fincommerce' ) }
		>
			<Skeleton height="22px" width="22px" borderRadius="100%" />
			<Skeleton height="22px" maxWidth="148px" />
			<Skeleton height="22px" width="50px" />
		</div>
	);
};
