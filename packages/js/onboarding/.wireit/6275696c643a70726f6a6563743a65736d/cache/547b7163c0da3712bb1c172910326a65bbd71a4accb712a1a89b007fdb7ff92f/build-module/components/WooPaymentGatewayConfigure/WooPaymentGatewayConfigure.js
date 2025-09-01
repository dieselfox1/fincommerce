/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { Slot, Fill } from '@wordpress/components';
/**
 * FinCommerce Payment Gateway configuration
 *
 * @slotFill WooPaymentGatewayConfigure
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id gateway id.
 */
export const WooPaymentGatewayConfigure = ({ id, ...props }) => (createElement(Fill, { name: 'fincommerce_payment_gateway_configure_' + id, ...props }));
WooPaymentGatewayConfigure.Slot = ({ id, fillProps, }) => (createElement(Slot, { name: 'fincommerce_payment_gateway_configure_' + id, fillProps: fillProps }));
