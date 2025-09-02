/**
 * External dependencies
 */
import { createElement } from '@finpress/element';
import { Slot, Fill } from '@finpress/components';

type WooPaymentGatewayConfigureProps = {
	id: string;
};

/**
 * FinCommerce Payment Gateway configuration
 *
 * @slotFill WooPaymentGatewayConfigure
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id gateway id.
 */
export const WooPaymentGatewayConfigure = ( {
	id,
	...props
}: WooPaymentGatewayConfigureProps ) => (
	<Fill name={ 'fincommerce_payment_gateway_configure_' + id } { ...props } />
);

WooPaymentGatewayConfigure.Slot = ( {
	id,
	fillProps,
}: WooPaymentGatewayConfigureProps & {
	fillProps?: React.ComponentProps< typeof Slot >[ 'fillProps' ];
} ) => (
	<Slot
		name={ 'fincommerce_payment_gateway_configure_' + id }
		fillProps={ fillProps }
	/>
);
