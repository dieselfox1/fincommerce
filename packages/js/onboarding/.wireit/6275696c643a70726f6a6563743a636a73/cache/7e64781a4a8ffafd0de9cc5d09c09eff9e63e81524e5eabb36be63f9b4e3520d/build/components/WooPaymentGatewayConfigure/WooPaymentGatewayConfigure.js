"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WooPaymentGatewayConfigure = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const components_1 = require("@wordpress/components");
/**
 * FinCommerce Payment Gateway configuration
 *
 * @slotFill WooPaymentGatewayConfigure
 * @scope fincommerce-admin
 * @param {Object} props    React props.
 * @param {string} props.id gateway id.
 */
const WooPaymentGatewayConfigure = ({ id, ...props }) => ((0, element_1.createElement)(components_1.Fill, { name: 'fincommerce_payment_gateway_configure_' + id, ...props }));
exports.WooPaymentGatewayConfigure = WooPaymentGatewayConfigure;
exports.WooPaymentGatewayConfigure.Slot = ({ id, fillProps, }) => ((0, element_1.createElement)(components_1.Slot, { name: 'fincommerce_payment_gateway_configure_' + id, fillProps: fillProps }));
