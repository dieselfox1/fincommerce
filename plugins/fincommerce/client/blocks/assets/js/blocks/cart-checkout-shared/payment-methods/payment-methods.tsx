/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { Label } from '@fincommerce/blocks-components';
import { useSelect } from '@finpress/data';
import { paymentStore } from '@fincommerce/block-data';
import { CheckoutPaymentSkeleton } from '@fincommerce/base-components/skeleton/patterns/checkout-payment';
import { DelayedContentWithSkeleton } from '@fincommerce/base-components/delayed-content-with-skeleton';

/**
 * Internal dependencies
 */
import NoPaymentMethods from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/no-payment-methods';
import OnlyExpressPayments from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/only-express-payments';
import PaymentMethodOptions from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/payment-method-options';
import SavedPaymentMethodOptions from '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/saved-payment-method-options';
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/style.scss';

/**
 * PaymentMethods component.
 */
const PaymentMethods = ( {
	noPaymentMethods = <NoPaymentMethods />,
	onlyExpressPayments = <OnlyExpressPayments />,
}: {
	noPaymentMethods?: JSX.Element | undefined;
	onlyExpressPayments?: JSX.Element | undefined;
} ) => {
	const {
		paymentMethodsInitialized,
		expressPaymentMethodsInitialized,
		availablePaymentMethods,
		availableExpressPaymentMethods,
		savedPaymentMethods,
	} = useSelect( ( select ) => {
		const store = select( paymentStore );
		return {
			paymentMethodsInitialized: store.paymentMethodsInitialized(),
			expressPaymentMethodsInitialized:
				store.expressPaymentMethodsInitialized(),
			availablePaymentMethods: store.getAvailablePaymentMethods(),
			availableExpressPaymentMethods:
				store.getAvailableExpressPaymentMethods(),
			savedPaymentMethods: store.getSavedPaymentMethods(),
		};
	} );

	const hasAvailablePaymentMethods =
		Object.keys( availablePaymentMethods ).length > 0;
	const hasAvailableExpressPaymentMethods =
		Object.keys( availableExpressPaymentMethods ).length > 0;

	if ( paymentMethodsInitialized && expressPaymentMethodsInitialized ) {
		// No payment methods available at all
		if (
			! hasAvailablePaymentMethods &&
			! hasAvailableExpressPaymentMethods
		) {
			return noPaymentMethods;
		}

		// Only express payment methods available
		if (
			hasAvailableExpressPaymentMethods &&
			! hasAvailablePaymentMethods
		) {
			return onlyExpressPayments;
		}
	}

	return (
		<DelayedContentWithSkeleton
			isLoading={
				! paymentMethodsInitialized ||
				! expressPaymentMethodsInitialized
			}
			skeleton={ <CheckoutPaymentSkeleton /> }
		>
			<SavedPaymentMethodOptions />
			{ Object.keys( savedPaymentMethods ).length > 0 && (
				<Label
					label={ __( 'Use another payment method.', 'fincommerce' ) }
					screenReaderLabel={ __(
						'Other available payment methods',
						'fincommerce'
					) }
					wrapperElement="p"
					wrapperProps={ {
						className: [
							'wc-block-components-checkout-step__description wc-block-components-checkout-step__description-payments-aligned',
						],
					} }
				/>
			) }
			<PaymentMethodOptions />
		</DelayedContentWithSkeleton>
	);
};

export default PaymentMethods;
