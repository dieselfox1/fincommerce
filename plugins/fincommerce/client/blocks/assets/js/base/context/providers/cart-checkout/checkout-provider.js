/**
 * External dependencies
 */
import { PluginArea } from '@wordpress/plugins';
import { CURRENT_USER_IS_ADMIN } from '@fincommerce/settings';
import BlockErrorBoundary from '@fincommerce/base-components/block-error-boundary';
/**
 * Internal dependencies
 */
import { PaymentEventsProvider } from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/payment-events';
import { ShippingDataProvider } from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/shipping';
import { CheckoutEventsProvider } from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/checkout-events';
import CheckoutProcessor from '@fincommerce/block-library/assets/js/base/context/providers/cart-checkout/checkout-processor';

/**
 * Checkout provider
 * This wraps the checkout and provides an api interface for the checkout to
 * children via various hooks.
 *
 * @param {Object} props               Incoming props for the provider.
 * @param {Object} props.children      The children being wrapped.
 *                                     component.
 * @param {string} [props.redirectUrl] Initialize what the checkout will
 *                                     redirect to after successful
 *                                     submit.
 */
export const CheckoutProvider = ( { children, redirectUrl } ) => {
	return (
		<CheckoutEventsProvider redirectUrl={ redirectUrl }>
			<ShippingDataProvider>
				<PaymentEventsProvider>
					{ children }
					{ /* If the current user is an admin, we let BlockErrorBoundary render
								the error, or we simply die silently. */ }
					<BlockErrorBoundary
						renderError={
							CURRENT_USER_IS_ADMIN ? null : () => null
						}
					>
						<PluginArea scope="fincommerce-checkout" />
					</BlockErrorBoundary>
					<CheckoutProcessor />
				</PaymentEventsProvider>
			</ShippingDataProvider>
		</CheckoutEventsProvider>
	);
};
