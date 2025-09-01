/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { getSetting } from '@fincommerce/settings';
import { LOGIN_URL } from '@fincommerce/block-settings';
import { useSelect } from '@wordpress/data';
import { checkoutStore } from '@fincommerce/block-data';

const LOGIN_TO_CHECKOUT_URL = `${ LOGIN_URL }?redirect_to=${ encodeURIComponent(
	window.location.href
) }`;

const LoginPrompt = () => {
	const customerId = useSelect( ( select ) =>
		select( checkoutStore ).getCustomerId()
	);

	if ( ! getSetting( 'checkoutShowLoginReminder', true ) || customerId ) {
		return null;
	}

	return (
		<a
			className="wc-block-checkout__login-prompt"
			href={ LOGIN_TO_CHECKOUT_URL }
		>
			{ __( 'Log in', 'fincommerce' ) }
		</a>
	);
};

export default LoginPrompt;
