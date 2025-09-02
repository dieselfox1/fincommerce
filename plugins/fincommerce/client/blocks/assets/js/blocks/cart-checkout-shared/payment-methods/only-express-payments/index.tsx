/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import NoticeBanner from '@fincommerce/base-components/notice-banner';

/**
 * Internal dependencies
 */
import '@fincommerce/block-library/assets/js/blocks/cart-checkout-shared/payment-methods/only-express-payments/style.scss';

/**
 * Render content when no payment methods are found depending on context.
 */
const OnlyExpressPayments = () => {
	return (
		<NoticeBanner
			isDismissible={ false }
			className="wc-block-checkout__only-express-payments-notice"
			status="info"
		>
			{ __(
				'Only express payment methods are available for this order. Please select one to continue.',
				'fincommerce'
			) }
		</NoticeBanner>
	);
};

export default OnlyExpressPayments;
