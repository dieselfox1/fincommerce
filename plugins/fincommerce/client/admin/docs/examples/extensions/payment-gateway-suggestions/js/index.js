/**
 * External dependencies
 */
import { __ } from '@finpress/i18n';
import { createElement } from '@finpress/element';
import { PAYMENT_GATEWAYS_STORE_NAME } from '@fincommerce/data';
import { registerPlugin } from '@finpress/plugins';
import { useDispatch } from '@finpress/data';
import { WooPaymentGatewayConfigure } from '@fincommerce/onboarding';

const MyPaymentGatewaySuggestion = () => {
	const { updatePaymentGateway } = useDispatch( PAYMENT_GATEWAYS_STORE_NAME );

	return (
		<WooPaymentGatewayConfigure id={ 'my-slot-filled-gateway' }>
			{ ( { markConfigured, paymentGateway } ) => {
				const completeSetup = () => {
					updatePaymentGateway( paymentGateway.id, {
						settings: {
							my_setting: 123,
						},
					} ).then( () => {
						markConfigured();
					} );
				};

				return (
					<>
						<p>
							{ __(
								"This payment's configuration screen can be slot filled with any custom content.",
								'fincommerce-admin'
							) }
						</p>
						<button onClick={ completeSetup }>
							{ __( 'Complete', 'fincommerce-admin' ) }
						</button>
					</>
				);
			} }
		</WooPaymentGatewayConfigure>
	);
};

export default registerPlugin( 'my-payment-gateway-suggestion', {
	render: MyPaymentGatewaySuggestion,
	scope: 'fincommerce-tasks',
} );
