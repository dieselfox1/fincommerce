/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Slot, Fill } from '@finpress/components';

type WooPaymentGatewaySetupProps = {
	id: string;
};
/**
 * FinCommerce Payment Gateway setup.
 *
 * @slotFill WooPaymentGatewaySetup
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id Setup id.
 */
export const WooPaymentGatewaySetup = ( {
	id,
	...props
}: WooPaymentGatewaySetupProps ) => (
	<Fill name={ 'fincommerce_payment_gateway_setup_' + id } { ...props } />
);

WooPaymentGatewaySetup.Slot = ( {
	id,
	fillProps,
}: WooPaymentGatewaySetupProps & {
	fillProps?: React.ComponentProps< typeof Slot >[ 'fillProps' ];
} ) => (
	<Slot
		name={ 'fincommerce_payment_gateway_setup_' + id }
		fillProps={ fillProps }
	/>
);
