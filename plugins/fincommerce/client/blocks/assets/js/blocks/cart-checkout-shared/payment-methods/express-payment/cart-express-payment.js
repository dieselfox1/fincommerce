/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { noticeContexts, useStoreCart } from '@fincommerce/base-context';
import { StoreNoticesContainer } from '@fincommerce/blocks-components';
import { useSelect } from '@wordpress/data';
import { paymentStore } from '@fincommerce/block-data';
import { Skeleton } from '@fincommerce/base-components/skeleton';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import ExpressPaymentMethods from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment-methods';
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment/style.scss';
import { getExpressPaymentMethodsState } from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/express-payment/express-payment-methods-helpers';

const CartExpressPayment = () => {
	const {
		availableExpressPaymentMethods = {},
		expressPaymentMethodsInitialized,
		isExpressPaymentMethodActive,
		registeredExpressPaymentMethods = {},
	} = useSelect( ( select ) => {
		const payment = select( paymentStore );
		return {
			availableExpressPaymentMethods:
				payment.getAvailableExpressPaymentMethods(),
			expressPaymentMethodsInitialized:
				payment.expressPaymentMethodsInitialized(),
			isExpressPaymentMethodActive:
				payment.isExpressPaymentMethodActive(),
			registeredExpressPaymentMethods:
				payment.getRegisteredExpressPaymentMethods(),
		};
	}, [] );
	const { hasPendingItemsOperations } = useStoreCart();

	const {
		hasRegisteredExpressPaymentMethods,
		hasRegisteredNotInitializedExpressPaymentMethods,
		hasNoValidRegisteredExpressPaymentMethods,
		availableExpressPaymentsCount,
	} = getExpressPaymentMethodsState( {
		availableExpressPaymentMethods,
		expressPaymentMethodsInitialized,
		registeredExpressPaymentMethods,
	} );

	// We show the skeleton when
	// the express payment method is not active (because they trigger recalculations) and
	// cart items are being added, updated, or deleted, because it can result in different express payment methods
	// or when the express payment methods are not initialized
	const showSkeleton =
		! isExpressPaymentMethodActive &&
		( hasPendingItemsOperations ||
			hasRegisteredNotInitializedExpressPaymentMethods );

	if (
		! hasRegisteredExpressPaymentMethods ||
		hasNoValidRegisteredExpressPaymentMethods
	) {
		return null;
	}

	return (
		<>
			<div
				className={ clsx(
					'wc-block-components-express-payment',
					'wc-block-components-express-payment--cart',
					{
						'wc-block-components-express-payment--disabled':
							isExpressPaymentMethodActive,
					}
				) }
				aria-disabled={ isExpressPaymentMethodActive }
				aria-live="polite"
				{ ...( isExpressPaymentMethodActive && {
					'aria-busy': true,
					'aria-label': __(
						'Processing express checkout',
						'fincommerce'
					),
				} ) }
			>
				<div className="wc-block-components-express-payment__content">
					<StoreNoticesContainer
						context={ noticeContexts.EXPRESS_PAYMENTS }
					/>
					{ showSkeleton ? (
						<ul className="wc-block-components-express-payment__event-buttons">
							{ Array.from( {
								length: availableExpressPaymentsCount,
							} ).map( ( _, index ) => (
								<li key={ index }>
									<Skeleton
										height="48px"
										ariaMessage={ __(
											'Loading express payment method…',
											'fincommerce'
										) }
									/>
								</li>
							) ) }
						</ul>
					) : (
						<ExpressPaymentMethods />
					) }
				</div>
			</div>
			<div className="wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--cart">
				{ /* translators: Shown in the Cart block between the express payment methods and the Proceed to Checkout button */ }
				{ __( 'Or', 'fincommerce' ) }
			</div>
		</>
	);
};

export default CartExpressPayment;
