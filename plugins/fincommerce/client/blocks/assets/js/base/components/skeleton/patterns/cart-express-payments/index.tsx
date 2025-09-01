/**
 * Internal dependencies
 */
import { Skeleton } from '@fincommerce/block-library/assets/js/base/components/skeleton';
import '@fincommerce/block-library/assets/js/base/components/skeleton/patterns/cart-express-payments/style.scss';

export const CartExpressPaymentsSkeleton = () => {
	return (
		<div className="wc-block-components-skeleton wc-block-components-skeleton--cart-express-payments">
			<Skeleton height="48px" />
			<Skeleton height="48px" />
		</div>
	);
};
