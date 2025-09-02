/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import NoticeBanner from '@fincommerce/base-components/notice-banner';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/no-payment-methods/style.scss';

/**
 * Render content when no payment methods are found depending on context.
 */
const NoPaymentMethods = () => {
	return (
		<NoticeBanner
			isDismissible={ false }
			className="wc-block-checkout__no-payment-methods-notice"
			status="error"
		>
			{ __(
				'There are no payment methods available. Please contact us for help placing your order.',
				'fincommerce'
			) }
		</NoticeBanner>
	);
};

export default NoPaymentMethods;
