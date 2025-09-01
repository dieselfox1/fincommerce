/**
 * External dependencies
 */
import { registerPaymentMethod } from '@fincommerce/blocks-registry';
import { __ } from '@wordpress/i18n';
import { getPaymentMethodData, WC_ASSET_URL } from '@fincommerce/settings';
import { decodeEntities } from '@wordpress/html-entities';
import { sanitizeHTML } from '@fincommerce/utils';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PAYMENT_METHOD_NAME } from '@fincommerce/block-library/assets/js/extensions/payment-methods/paypal/constants';

const settings = getPaymentMethodData( 'paypal', {} );

/**
 * Content component
 */
const Content = () => {
	return <RawHTML>{ sanitizeHTML( settings.description || '' ) }</RawHTML>;
};

const paypalPaymentMethod = {
	name: PAYMENT_METHOD_NAME,
	label: (
		<img
			src={ `${ WC_ASSET_URL }/images/paypal.png` }
			alt={ decodeEntities(
				settings.title || __( 'PayPal', 'fincommerce' )
			) }
		/>
	),
	placeOrderButtonLabel: __( 'Proceed to PayPal', 'fincommerce' ),
	content: <Content />,
	edit: <Content />,
	canMakePayment: () => true,
	ariaLabel: decodeEntities(
		settings?.title || __( 'Payment via PayPal', 'fincommerce' )
	),
	supports: {
		features: settings.supports ?? [],
	},
};

registerPaymentMethod( paypalPaymentMethod );
